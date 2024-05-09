//@ts-check

// NAME: phraseToPlaylist
// AUTHOR: CharlieS1103, MalTeeez
// DESCRIPTION: Convert a phrase into a playlist with songs arraged to make that phrase.

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function phraseToPlaylist() {
    const { Platform, CosmosAsync } = Spicetify;
    if (!(Platform && CosmosAsync)) {
        setTimeout(phraseToPlaylist, 300)
        return
    }
    const CONVERT_ICON = `
<?xml version="1.0" ?><svg fill="var(--spice-text)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V7.75C4 8.99264 5.00736 10 6.25 10H15.75C16.9926 10 18 8.99264 18 7.75V5.25C18 4.00736 16.9926 3 15.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H15.75C16.1642 4.5 16.5 4.83579 16.5 5.25V7.75C16.5 8.16421 16.1642 8.5 15.75 8.5H6.25C5.83579 8.5 5.5 8.16421 5.5 7.75V5.25Z" fill="var(--spice-text)"/><path d="M8.7 16C8.3134 16 8 16.3358 8 16.75C8 17.1642 8.3134 17.5 8.7 17.5H13.3C13.6866 17.5 14 17.1642 14 16.75C14 16.3358 13.6866 16 13.3 16H8.7Z" fill="var(--spice-text)"/><path d="M17.3529 16.4453L17.2803 16.5294C17.0141 16.7957 16.5974 16.8199 16.3038 16.602L16.2197 16.5294L14.2197 14.5294C13.9534 14.2632 13.9292 13.8465 14.1471 13.5529L14.2197 13.4688L16.2197 11.4688C16.5126 11.1759 16.9874 11.1759 17.2803 11.4688C17.5466 11.735 17.5708 12.1517 17.3529 12.4453L17.2803 12.5294L16.5612 13.2503L18.0607 13.2498C18.7079 13.2498 19.2402 12.7579 19.3042 12.1276L19.3107 11.9998V9.74976C19.3107 9.33554 19.6464 8.99976 20.0607 8.99976C20.4404 8.99976 20.7542 9.28191 20.8038 9.64799L20.8107 9.74976V11.9998C20.8107 13.4623 19.669 14.6582 18.2282 14.7447L18.0607 14.7498L16.5622 14.7503L17.2803 15.4688C17.5466 15.735 17.5708 16.1517 17.3529 16.4453Z" fill="var(--spice-text)"/><path d="M18 19.25V17.2239L17.9874 17.2365C17.5816 17.6423 17.027 17.8069 16.5 17.7311V19.25C16.5 19.6642 16.1642 20 15.75 20H6.25C5.83579 20 5.5 19.6642 5.5 19.25V14.25C5.5 13.8358 5.83579 13.5 6.25 13.5H13.0725C13.1295 13.3082 13.2199 13.1241 13.3439 12.957L13.3659 12.9274L13.4866 12.7876L14.2742 12H6.25C5.00736 12 4 13.0074 4 14.25V19.25C4 20.4926 5.00736 21.5 6.25 21.5H15.75C16.9926 21.5 18 20.4926 18 19.25Z" fill="var(--spice-text)"/></svg>`

    new Spicetify.Topbar.Button(
        "Phrase2Playlist",
        CONVERT_ICON,
        displayPhraseInput,
        false
    );


})()
function displayPhraseInput(){
    Spicetify.PopupModal.display({
        title: "Input phrase",
        content: createTextArea(),
    });
    addCustomCssListeners();
}

var offset = "";
var offsetnum = 0;
function createTextArea(){
    const container = document.createElement("div");
    container.innerHTML = `
    <textarea id="playlist-phrase-box" cols="50" name="playlist-phrase-box" rows="4" placeholder="Input phrase here!"></textarea>
    <br><br>
    <span id="phrase-loading-indicator" name="phrase-loading-indicator" >0 / 0</span> &emsp;
    <button value="Submit" id="playlist-phrase-submit" style="float: right;">Submit Phrase</button>
    `;
    return container;
}

async function addCustomCssListeners() {
    console.log("[P2P]: Adding listeners");
    const textarea = document.querySelector("#playlist-phrase-box");

    const submit = document.querySelector("#playlist-phrase-submit");
    if (submit)
    submit.addEventListener("click", function (event) {
        // @ts-ignore
        generatePlaylist(textarea.value)
        event.preventDefault();
    }, false);
}

async function generatePlaylist(phrase){
    phrase = phrase.replace(/[^\w\s\-]|_/g, "").replace(/\s+/g, ' ')
    phrase = phrase.replace(/^\ |\ $/g, "").split(" "); //replace spaces at start and end of string so those don't become their own substrings
    const songArr = [],
          songMapCache = {};
    offset = "";
    for (var i = 0; i < phrase.length; i++) {
        var spanProgress = document.querySelector("#phrase-loading-indicator"),
            progressText = document.createTextNode('' + i + " / " + phrase.length),
            textarea = document.querySelector("#playlist-phrase-box"),
            currentText = "";
        if(spanProgress == null || progressText == null || textarea == null || currentText == null) {
            console.log("[P2P]: (Error)     Error while generating playlist, aborting.");
            return;
        }
        spanProgress.innerHTML = '';
        textarea.innerHTML = ''; // clear existing
        for (var o = 0; o < i+1; o++) {
            var prefix = o == i ? ">  " : "✓ ";
            currentText += prefix + phrase[o] + "\n";
        }
        textarea.scrollTop = textarea.scrollHeight; //scroll to bottom of now longer text box
        spanProgress.appendChild(progressText);
        // @ts-ignore
        textarea.value = currentText;
        if (phrase[i] in songMap || phrase[i].toUpperCase() in songMap) { //maybe one of the values in the song map (i.e. the alphabet) is only there in uppercase.
            phrase[i] in songMap ? songArr[i] = "spotify:track:" + songMap[phrase[i]] : songArr[i] = "spotify:track:" + songMap[phrase[i].toUpperCase()];
            //console.log("[P2P]: (Cache)     Found cached song for word:\t\t " + phrase[i] + ",\t with track:\t" + songMap[phrase[i]]);
        } else if (phrase[i] in songMapCache) {
            //console.log("[P2P]: (Cache)     Found repeating song for word:\t " + phrase[i] + ",\t with track:\t" + songMapCache[phrase[i]]);
            songArr[i] = "spotify:track:" + songMapCache[phrase[i]];
        } else {
            const songJson = await searchSong(phrase[i]);
            songArr[i] = "spotify:track:" + songJson;
            songMapCache[phrase[i]] = songJson;
        }
    }
    //console.log("song array: " + JSON.stringify(songArr));
    createPlaylist(songArr)
}

/**
 * @param {string} songToSearch
 * @param {string} jsonSong
 */
async function isSameSong(songToSearch, jsonSong) {
    return (songToSearch === jsonSong 
        || songToSearch === (jsonSong.charAt(0).toUpperCase() + jsonSong.slice(1)) 
        || songToSearch === jsonSong.toLowerCase() 
        || songToSearch === jsonSong.toUpperCase());
}

async function searchSong(songName) {
    let songFound = false;
    //NORMAL SEARCH - Better for english queries (TODO: maybe fix with user country (maybe toggleable)), very good with shorter songs, faster in general
    try {
        const songJSON = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=' + songName + '&type=track&market=US&limit=50&offset=51');
        for (var i = 0; i < songJSON.tracks.items.length; i++) {
            //console.log("JSON Comparison for " + songName + " === " + songJSON.tracks.items[i].name);
            if (await isSameSong(songName, songJSON.tracks.items[i].name)) {
                //console.log("[P2P]: (Search)    Found API song for word:\t\t\t " + songName + ",\twith track:\t" + songJSON.tracks.items[i].id);
                songFound = true;
                return songJSON.tracks.items[i].id;
            }
        }
    } catch (err) {
        //console.log("[P2P]: (API Error) Error while searching for word:\t\t\t " + songName + ",\tusing Error Track");
        return "ht4un5PoFxGjGFpERh7kkq0a"; //TRACK: "This Doesn't Work"
    }
    //FALLBACK SEARCH - Better for longer song names and more rare ones
    var offsetCounter = 0;
    while (!songFound && offsetCounter < 1000) {
        var fallbackSongJSON = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/search?q=' + songName + '&type=track&limit=50&offset='+offsetCounter)
        for (var i = 0; i < fallbackSongJSON.tracks.items.length; i++) {
            //console.log("(Fallback) JSON Comparison for " + songName + " === " + fallbackSongJSON.tracks.items[i].name);
            if (await isSameSong(songName, fallbackSongJSON.tracks.items[i].name) && !songFound) {
                //console.log("[P2P]: (Fallback)  Found API song for word:\t\t\t " + songName + ",\twith track:\t" + fallbackSongJSON.tracks.items[i].id);
                return fallbackSongJSON.tracks.items[i].id;
            }
        }
        offsetCounter += 50;
    }
    //console.log("[P2P]: (Not Found) Couldn't find track for word:\t\t\t " + songName + ",\tusing Not Found Track");
    return "1qcn9qzMCyBDnYy0dYN824"; //TRACK: "This Song Doesn't Exist Because I Don't Like Effort"
}

async function createPlaylist(songArr){
    const randomName = await Spicetify.CosmosAsync.get('https://random-word-api.herokuapp.com/word?number=1')
    const user = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/me')
    const newplaylist = await Spicetify.CosmosAsync.post('https://api.spotify.com/v1/users/' + user.id + '/playlists', {
        name: randomName[0]
    });

    const playlisturi = newplaylist.uri.split(":")[2]
    while(songArr.length){
        const b = songArr.splice(0, 100)
        var status = "";
        try {
            status = await Spicetify.CosmosAsync.post('https://api.spotify.com/v1/playlists/' + playlisturi + '/tracks', {
                uris: b
            });
        } catch (err) {
            console.log("Playlist creation batch failed, unshifting. Error Status: " + status);
            songArr.splice(0, 0, ...b);
            //console.log("Unshifted Array: " + JSON.stringify(songArr));
        }
    }
    const span = document.querySelector("#phrase-loading-indicator")
    if(span){
    span.innerHTML = '';
    span.appendChild(document.createTextNode("Done! "));
    }
}

const songMap = {
    "that": "3mJCHAKdmZDINjCEEYMEkq",
    "THAT": "6hbfVquDat90Nv09n05ZnN",
    "That": "5XZTPT1jb4fEfmluLKmm4B",
    "you": "5Wdl4yFoXOX1xmA53udLyZ",
    "YOU": "6cVNYlO75XZ3UZnglTF6WI",
    "You": "6lbme14HiDWYmGiw1I2Dv6",
    "our": "5JTjuEFoIfQgP90nvOCWEj",
    "OUR": "5YhTy3qCTc2RELqbHKv94A",
    "Our": "4WLnE7W9K41HdRz1rHpz5T",
    "it": "6eG4JMN3f4WLgj1ElfuMUV",
    "for": "3beItkavCW1qXszPbFbijD",
    "is": "1epDL4xhczbpzkXIeGXZzb",
    "are": "0L6WRMANsYoX1mIe25zwbe",
    "i": "7wdzLe2Gsx1RGqbvYZHASz",
    "a": "6WH0LHM2vFBLpmU5RFdDh2",
    "the": "72FW5JjmSwgHNopNSLRocy",
    "have": "0DX4IC8aMjisNh7LHDyo6J",
    "he": "1bc28ebMDp7ym6rHfqFfj0",
    "we": "0BSI1Epu3YeVwXF1bvL8oH",
    "to": "4n3lfhTDOaFe9a1c4FPPSB",
    "and": "2YsrYsusAKqYD74ipCRxvz",
    "0": "3GzRIROhugr0XHjrOvyDRP",
    "1": "76nlq5gomu49Yn5dfmtv0C",
    "2": "62CprXvSWsKBvYu3Yba55A",
    "3": "6ECxq5Sh1ogq6oHDRUVmV2",
    "4": "6XvzSF3NDwOKP6RF0YmXEU",
    "5": "15UttZPJXWsb1fSLwNSfov",
    "6": "5os4iDInR4chqaCdXi895k",
    "7": "7zbFh74zImpQho3btxuANN",
    "8": "1lSnBlAErRss6asu9Y5HuA",
    "9": "3HGKzDBC6MfnJtcCRi7xB3",
    "A": "5uYalrRxXbbK7N8vYlXWFO",
    "B": "4oViUMnlTQhI9gJwEhUgv5",
    "C": "3Cv7jBCoHsV6ZnajqZk02J",
    "D": "6E1ejRJAfE8BC4T1Dc8DNo",
    "E": "1XBGTp6OqwYaYhemH3aMKT",
    "F": "6gpAgc7TPrcyJcjvjNVLFo",
    "G": "2ZUTVMR0zjB8ixh1ZhcbvL",
    "H": "7Eaoln7EVETUXJ1rotxHWo",
    "I": "0hJZZMFlSVmtQjOYGKnFng",
    "J": "4czA2rv6Hz8cgsiomaisAO",
    "K": "0SMxKocTYMTE8C4dktdlRX",
    "L": "6brTu7TkwXtFMjQgcxkMA4",
    "M": "1WWWfx7SyPJEbLCJKt2mpa",
    "N": "6cyYD58m4zLDzEWld7sxHC",
    "O": "77yuzxCS3csrgTPSW0pvyk",
    "P": "58xd48kdUNy6GtJ4j0qENM",
    "Q": "51CXAV2GNNL3deCtcXpCeu",
    "R": "0xHghnAskte2ZiCqA0YsPV",
    "S": "336eHf6SexQkX3MZDykFC7",
    "T": "4ghtfPjftCLrsqEeH83Q0x",
    "U": "1K8NZfZN8bh0ApIPYJplVB",
    "V": "4JnBvAHV8obYVyHVehuOiM",
    "W": "3hx0gIgOea9IsOpVjJejR1",
    "X": "62ssdaS7RIUmGROgns2TG1",
    "Y": "5yKZg1KWvtvWBmHIoU9tzs",
    "Z": "53CSKhZZKCvldFSyV2CMMX",
    "in": "2vec1SirAf9NVU5YFpYKWo",
    "as": "4Q72edajhMV46lHlQQ43Tp",
    "of": "0m8KR8qryLSgMUp88xYfiE",
    "It": "1HrOS7MY0qh7k7oF9UgvsJ",
    "by": "3HLSjmkYgx9jSlY6K7ide0",
    "on": "7HXs149WscOjEmnnfk0NSY",
    "so": "3lZgcpwEIunsw3xauzu62W",
    "be": "5GOZS9DCxvijXL2wLIddlH",
    "us": "0HBs0pHrnSP8DEAPM1JX5M",
    "no": "0V3K2DEX1fh7nmOLoN8Lla",
    "or": "0EQeU8sdVB1yGoY4LItykb",
    "an": "2yxqUsz8BNuhzj8JpdDpdW",
    "if": "0l8OTE4sFHWrjVUSUmcu2P",
    "my": "1AToLbGgM9GhCqc5CnmZ3R",
    "up": "06mEvkWtMBTiZkEzNehpxe",
    "Go": "6U6UC3Xg5ukTBQIy245bAo",
    "go": "7EpP2BHNXHPc7OWlpg8mxj",
    "In": "2vec1SirAf9NVU5YFpYKWo",
    "As": "13toFl1UwJPsRxDiD9jgtn",
    "Of": "313l4VILjTvipoamGptl5h",
    "By": "5C4sp6JprCFTO9ZQcg4qXs",
    "On": "167c1Blr84k9YpSCHLNh9m",
    "So": "7GlurUXL0ZsZYq1YMimC5u",
    "Be": "53OQwlz2w9TQDQXVAI5R0H",
    "Us": "5f4l3uDDTNNGEtWaXHOIB9",
    "No": "4HrI0DIPyvRF1cxUUAGQJc",
    "Or": "3OR1FPc6xWGlO13WP3LbvY",
    "An": "4jc4q9D2GhKxU8ID2hSVj1",
    "If": "40W8Mm9t3ZO1iNQlls35lL",
    "My": "0w5lktecJcEEjI9KBu0Dl9",
    "Up": "2wzNQYX6veNM0AJncAV75v",
    "Am": "5SkShE3Vc3iIDM9GOlboRd",
    "am": "5kYZKCHnBomMkRSu3Xij2V",
    "at": "23lpXblF7QUq7iRA5s4NRO",
    "At": "1AhAdO7zzrW4fQXXOoPyOG"
}
