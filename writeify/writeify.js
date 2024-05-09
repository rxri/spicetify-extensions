//@ts-check

// NAME: Song Notes
// AUTHOR: CharlieS1103
// DESCRIPTION: Create and edit notes for specific songs

/// <reference path="../../spicetify-cli/globals.d.ts" />

(async function SongNotes() {
  console.log('Song Notes extension loaded');

  const { CosmosAsync, Menu, PopupModal, Platform } = Spicetify;
  if (!(CosmosAsync && Menu && PopupModal)) {
    setTimeout(SongNotes, 10);
    console.log('Waiting for Spicetify objects to be available');
    return;
  }
  
// Make a sleep function

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* TODO: Fix this part
  Platform.History.listen(async ({ pathname }) => {
    if (pathname.includes("/playlist")) {
      await sleep(2500)
      insertTrackNotes(".main-trackList-trackListRow");
    }
  });
*/



 
  // Inject CSS
  const style = document.createElement("style");
  style.innerHTML = `
           
.song-notes-textarea {
    width: 100%;
    height: 200px;
    padding: 10px;
    font-size: 14px;
    background-color: var(--spice-main);
    resize: none;
    border: 1px var(--spice-misc);
    box-shadow: 0px 0px 20px 0px var(--spice-misc);
    color: var(--spice-subtext);
}
.song-notes-save {
  background-color: var(--spice-button);
  color: var(--spice-text);
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
.song-notes-save:hover {
  background-color: var(--spice-button-active);
}

.track-notes-column {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    grid-column: 4;
    font-size: 0.750rem;
    justify-self: end;
    width: 175%;
}
`;
  document.head.appendChild(style);


  // Open the popup modal with the song notes
  function openNotesModal(uris) {
    console.log('Open notes modal:', uris);
    const songUri = uris[0];
    const storedNotes = localStorage.getItem("songNotes");
    let notes = "";

    if (songUri && storedNotes) {
      const notesMap = JSON.parse(storedNotes);
      notes = notesMap[songUri] || "";
    }

    PopupModal.display({
      title: "Song Notes",
      content: createNotesModal(notes),
    });

    const saveButton = document.querySelector("#song-notes-save");
    if (!saveButton) return;
    saveButton.addEventListener("click", () => saveSongNotes(songUri), false);
  }

  // Create the popup modal to display the notes
  function createNotesModal(notes) {
    const container = document.createElement("div");
    container.innerHTML = `
      <textarea id="song-notes-textarea" name="song-notes-textarea" class="song-notes-textarea" rows="4" cols="30">${notes}</textarea>
      <br><br>
      <button value="Save" id="song-notes-save" class="song-notes-save">Save</button>
    `;
    return container;
  }

  // Save the notes for the given song URI to local storage
  function saveSongNotes(songUri) {
    console.log('Save song notes:', songUri);

    const textarea = document.querySelector("#song-notes-textarea") 
    
    if (!textarea) return;
    // @ts-ignore
    const notes = textarea.value;

    const storedNotes = localStorage.getItem("songNotes");
    const notesMap = storedNotes ? JSON.parse(storedNotes) : {};

    notesMap[songUri] = notes;
    localStorage.setItem("songNotes", JSON.stringify(notesMap));

    PopupModal.hide();
  }

  // Register the context menu item
  const cntxMenu = new Spicetify.ContextMenu.Item(
    "Add Note",
    openNotesModal,
    (uris) => uris.length === 1
  );

  cntxMenu.register();


  /* Function taken from https://github.com/L3-N0X/spicetify-dj-info*/
  function getTracklistTrackUri(tracklistElement) {
    let values = Object.values(tracklistElement)
    if (!values) return null

    return (
      values[0]?.pendingProps?.children[0]?.props?.children?.props?.uri ||
      values[0]?.pendingProps?.children[0]?.props?.children?.props?.children?.props?.uri ||
      values[0]?.pendingProps?.children[0]?.props?.children[0]?.props?.uri
    )
  }

  function getSongSnippets(uris) {
    const storedNotes = localStorage.getItem("songNotes");
    const mappedNotes= storedNotes ? JSON.parse(storedNotes) : {};
    if(!mappedNotes) return {};
    const snippetMap = {};
    
    uris.forEach((uri) => {
      console.log(uri)
      if (mappedNotes[uri]) {
        snippetMap[uri] = mappedNotes[uri].substring(0, 55) + "...";
      }
    });
    console.log(snippetMap)
    return snippetMap;
  }


  function insertTrackNotes(rowSelector) {
 
    const tracklist = document.getElementsByClassName("main-trackList-trackList main-trackList-indexable")[0];
    tracklist.ariaColCount = "6";
    const rows = document.querySelectorAll(rowSelector);
    if (!rows) return;
    // Get the uri for each track row using getTracklistTrackUri and store it in an array
    const uris = Array.from(rows, (row) => getTracklistTrackUri(row))
    const snippetMap = getSongSnippets(uris);

    const headerRow = document.getElementsByClassName("main-trackList-trackListHeaderRow main-trackList-trackListRowGrid")[0];
    if (!headerRow) return;
    const headerColumn = document.createElement("div");
    headerColumn.classList.add("main-trackList-rowSectionVariable");
    headerColumn.ariaColIndex = "6";
    headerColumn.innerHTML = "Notes";
    // Insert it before main-trackList-rowSectionEnd
    const endColumn = headerRow.querySelector(".main-trackList-rowSectionEnd");
    if (!endColumn) return;
    headerRow.insertBefore(headerColumn, endColumn);



    rows.forEach((row) => {
      const uri = getTracklistTrackUri(row);
      const notes = snippetMap[uri] || "";
      const column = document.createElement("div");
      column.classList.add("track-notes-column");
      column.ariaColIndex = "6";
      column.innerHTML = `${notes}`;
      const endColumn = row.querySelector(".main-trackList-rowSectionEnd");
      if (!endColumn) return;
      row.insertBefore(column, endColumn);
    });
  }



})();
