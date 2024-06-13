"use strict";
/**
 * @author ririxi
 * @author CharlieS1103
 * @author MalTeeez
 */
const CONVERT_ICON = `<svg fill="currentColor" height="16" viewBox="0 0 24 24" width="16"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V7.75C4 8.99264 5.00736 10 6.25 10H15.75C16.9926 10 18 8.99264 18 7.75V5.25C18 4.00736 16.9926 3 15.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H15.75C16.1642 4.5 16.5 4.83579 16.5 5.25V7.75C16.5 8.16421 16.1642 8.5 15.75 8.5H6.25C5.83579 8.5 5.5 8.16421 5.5 7.75V5.25Z" fill="currentColor"/><path d="M8.7 16C8.3134 16 8 16.3358 8 16.75C8 17.1642 8.3134 17.5 8.7 17.5H13.3C13.6866 17.5 14 17.1642 14 16.75C14 16.3358 13.6866 16 13.3 16H8.7Z" fill="currentColor"/><path d="M17.3529 16.4453L17.2803 16.5294C17.0141 16.7957 16.5974 16.8199 16.3038 16.602L16.2197 16.5294L14.2197 14.5294C13.9534 14.2632 13.9292 13.8465 14.1471 13.5529L14.2197 13.4688L16.2197 11.4688C16.5126 11.1759 16.9874 11.1759 17.2803 11.4688C17.5466 11.735 17.5708 12.1517 17.3529 12.4453L17.2803 12.5294L16.5612 13.2503L18.0607 13.2498C18.7079 13.2498 19.2402 12.7579 19.3042 12.1276L19.3107 11.9998V9.74976C19.3107 9.33554 19.6464 8.99976 20.0607 8.99976C20.4404 8.99976 20.7542 9.28191 20.8038 9.64799L20.8107 9.74976V11.9998C20.8107 13.4623 19.669 14.6582 18.2282 14.7447L18.0607 14.7498L16.5622 14.7503L17.2803 15.4688C17.5466 15.735 17.5708 16.1517 17.3529 16.4453Z" fill="currentColor"/><path d="M18 19.25V17.2239L17.9874 17.2365C17.5816 17.6423 17.027 17.8069 16.5 17.7311V19.25C16.5 19.6642 16.1642 20 15.75 20H6.25C5.83579 20 5.5 19.6642 5.5 19.25V14.25C5.5 13.8358 5.83579 13.5 6.25 13.5H13.0725C13.1295 13.3082 13.2199 13.1241 13.3439 12.957L13.3659 12.9274L13.4866 12.7876L14.2742 12H6.25C5.00736 12 4 13.0074 4 14.25V19.25C4 20.4926 5.00736 21.5 6.25 21.5H15.75C16.9926 21.5 18 20.4926 18 19.25Z" fill="currentColor"/></svg>`;
const songMap = {
    that: "3mJCHAKdmZDINjCEEYMEkq",
    THAT: "6hbfVquDat90Nv09n05ZnN",
    That: "5XZTPT1jb4fEfmluLKmm4B",
    you: "5Wdl4yFoXOX1xmA53udLyZ",
    YOU: "6cVNYlO75XZ3UZnglTF6WI",
    You: "6lbme14HiDWYmGiw1I2Dv6",
    our: "5JTjuEFoIfQgP90nvOCWEj",
    OUR: "5YhTy3qCTc2RELqbHKv94A",
    Our: "4WLnE7W9K41HdRz1rHpz5T",
    it: "6eG4JMN3f4WLgj1ElfuMUV",
    for: "3beItkavCW1qXszPbFbijD",
    is: "1epDL4xhczbpzkXIeGXZzb",
    are: "0L6WRMANsYoX1mIe25zwbe",
    i: "7wdzLe2Gsx1RGqbvYZHASz",
    a: "6WH0LHM2vFBLpmU5RFdDh2",
    the: "72FW5JjmSwgHNopNSLRocy",
    have: "0DX4IC8aMjisNh7LHDyo6J",
    he: "1bc28ebMDp7ym6rHfqFfj0",
    we: "0BSI1Epu3YeVwXF1bvL8oH",
    to: "4n3lfhTDOaFe9a1c4FPPSB",
    and: "2YsrYsusAKqYD74ipCRxvz",
    0: "3GzRIROhugr0XHjrOvyDRP",
    1: "76nlq5gomu49Yn5dfmtv0C",
    2: "62CprXvSWsKBvYu3Yba55A",
    3: "6ECxq5Sh1ogq6oHDRUVmV2",
    4: "6XvzSF3NDwOKP6RF0YmXEU",
    5: "15UttZPJXWsb1fSLwNSfov",
    6: "5os4iDInR4chqaCdXi895k",
    7: "7zbFh74zImpQho3btxuANN",
    8: "1lSnBlAErRss6asu9Y5HuA",
    9: "3HGKzDBC6MfnJtcCRi7xB3",
    A: "5uYalrRxXbbK7N8vYlXWFO",
    B: "4oViUMnlTQhI9gJwEhUgv5",
    C: "3Cv7jBCoHsV6ZnajqZk02J",
    D: "6E1ejRJAfE8BC4T1Dc8DNo",
    E: "1XBGTp6OqwYaYhemH3aMKT",
    F: "6gpAgc7TPrcyJcjvjNVLFo",
    G: "2ZUTVMR0zjB8ixh1ZhcbvL",
    H: "7Eaoln7EVETUXJ1rotxHWo",
    I: "0hJZZMFlSVmtQjOYGKnFng",
    J: "4czA2rv6Hz8cgsiomaisAO",
    K: "0SMxKocTYMTE8C4dktdlRX",
    L: "6brTu7TkwXtFMjQgcxkMA4",
    M: "1WWWfx7SyPJEbLCJKt2mpa",
    N: "6cyYD58m4zLDzEWld7sxHC",
    O: "77yuzxCS3csrgTPSW0pvyk",
    P: "58xd48kdUNy6GtJ4j0qENM",
    Q: "51CXAV2GNNL3deCtcXpCeu",
    R: "0xHghnAskte2ZiCqA0YsPV",
    S: "336eHf6SexQkX3MZDykFC7",
    T: "4ghtfPjftCLrsqEeH83Q0x",
    U: "1K8NZfZN8bh0ApIPYJplVB",
    V: "4JnBvAHV8obYVyHVehuOiM",
    W: "3hx0gIgOea9IsOpVjJejR1",
    X: "62ssdaS7RIUmGROgns2TG1",
    Y: "5yKZg1KWvtvWBmHIoU9tzs",
    Z: "53CSKhZZKCvldFSyV2CMMX",
    in: "2vec1SirAf9NVU5YFpYKWo",
    as: "4Q72edajhMV46lHlQQ43Tp",
    of: "0m8KR8qryLSgMUp88xYfiE",
    It: "1HrOS7MY0qh7k7oF9UgvsJ",
    by: "3HLSjmkYgx9jSlY6K7ide0",
    on: "7HXs149WscOjEmnnfk0NSY",
    so: "3lZgcpwEIunsw3xauzu62W",
    be: "5GOZS9DCxvijXL2wLIddlH",
    us: "0HBs0pHrnSP8DEAPM1JX5M",
    no: "0V3K2DEX1fh7nmOLoN8Lla",
    or: "0EQeU8sdVB1yGoY4LItykb",
    an: "2yxqUsz8BNuhzj8JpdDpdW",
    if: "0l8OTE4sFHWrjVUSUmcu2P",
    my: "1AToLbGgM9GhCqc5CnmZ3R",
    up: "06mEvkWtMBTiZkEzNehpxe",
    Go: "6U6UC3Xg5ukTBQIy245bAo",
    go: "7EpP2BHNXHPc7OWlpg8mxj",
    In: "2vec1SirAf9NVU5YFpYKWo",
    As: "13toFl1UwJPsRxDiD9jgtn",
    Of: "313l4VILjTvipoamGptl5h",
    By: "5C4sp6JprCFTO9ZQcg4qXs",
    On: "167c1Blr84k9YpSCHLNh9m",
    So: "7GlurUXL0ZsZYq1YMimC5u",
    Be: "53OQwlz2w9TQDQXVAI5R0H",
    Us: "5f4l3uDDTNNGEtWaXHOIB9",
    No: "4HrI0DIPyvRF1cxUUAGQJc",
    Or: "3OR1FPc6xWGlO13WP3LbvY",
    An: "4jc4q9D2GhKxU8ID2hSVj1",
    If: "40W8Mm9t3ZO1iNQlls35lL",
    My: "0w5lktecJcEEjI9KBu0Dl9",
    Up: "2wzNQYX6veNM0AJncAV75v",
    Am: "5SkShE3Vc3iIDM9GOlboRd",
    am: "5kYZKCHnBomMkRSu3Xij2V",
    at: "23lpXblF7QUq7iRA5s4NRO",
    At: "1AhAdO7zzrW4fQXXOoPyOG",
};
(async function phraseToPlaylist() {
    // @ts-expect-error: Events are not defined in types
    await new Promise(res => Spicetify.Events.platformLoaded.on(res));
    // @ts-expect-error: Events are not defined in types
    await new Promise(res => Spicetify.Events.webpackLoaded.on(res));
    const { Platform, CosmosAsync, React, ReactDOM, ReactComponent } = Spicetify;
    const { ButtonPrimary } = ReactComponent;
    if (!CosmosAsync) {
        setTimeout(phraseToPlaylist, 100);
        return;
    }
    new Spicetify.Topbar.Button("Phrase2Playlist", CONVERT_ICON, displayPhraseInput, false);
    const PhraseToPlaylist = ({ onSubmit, loadingIndicator }) => {
        const [phrase, setPhrase] = React.useState("");
        const handleSubmit = (event) => {
            event.preventDefault();
            onSubmit(phrase);
        };
        return (React.createElement(React.Fragment, null,
            React.createElement("textarea", { style: { "border-radius": "5px", "background-color": "#D3D3D3", color: "black", "font-size": "14px" }, cols: 50, rows: 4, placeholder: "Input phrase here!", value: phrase, onChange: (e) => setPhrase(e.target.value) }),
            React.createElement("div", { style: { display: "flex", "flex-direction": "row", "justify-content": "space-between" } },
                React.createElement("span", { className: "phrase-loading-indicator" }, loadingIndicator),
                React.createElement(ButtonPrimary, { size: "sm", onClick: handleSubmit }, "Submit Phrase"))));
    };
    function displayPhraseInput() {
        const modalContent = document.createElement("div");
        document.body.appendChild(modalContent);
        const handleSubmit = async (phrase) => {
            generatePlaylist(phrase);
        };
        ReactDOM.render(React.createElement(PhraseToPlaylist, { onSubmit: handleSubmit, loadingIndicator: "0/0" }), modalContent);
        Spicetify.PopupModal.display({
            title: "Phrase2Playlist",
            content: modalContent,
        });
    }
    const songMapCache = {};
    async function generatePlaylist(phrase) {
        const cleanedPhrase = phrase.replace(/[^\w\s\-]|_/g, "").replace(/\s+/g, " ");
        const cleanedPhraseSplit = cleanedPhrase.replace(/^\s+|\s+$/g, "").split(" ");
        const songArr = [];
        let notFoundSongs = 0;
        for (let i = 0; i < cleanedPhraseSplit.length; i++) {
            updateLoadingIndicator(i, cleanedPhraseSplit.length);
            const songName = cleanedPhraseSplit[i];
            if (!songName)
                continue;
            const normalizedSongName = songName.toUpperCase();
            const songId = songMap[songName] || songMap[normalizedSongName] || songMapCache[songName];
            if (songId) {
                songArr[i] = `spotify:track:${songId}`;
            }
            else {
                const songJson = await searchSong(songName);
                if (songJson === "notfound") {
                    notFoundSongs++;
                    continue;
                }
                songArr[i] = `spotify:track:${songJson}`;
                songMapCache[songName] = songJson;
            }
        }
        createPlaylist(songArr, notFoundSongs);
    }
    function updateLoadingIndicator(current, total) {
        const spanProgress = document.querySelector(".phrase-loading-indicator");
        if (spanProgress)
            spanProgress.textContent = `${current}/${total}`;
    }
    async function searchSong(songName) {
        try {
            const songJSON = await CosmosAsync.get(`https://api.spotify.com/v1/search?q=${songName}&type=track&limit=15&offset=0`);
            for (const item of songJSON.tracks.items) {
                if (await isSameSong(songName, item.name))
                    return item.id;
            }
        }
        catch {
            console.log(`phrase2playlist: API Error while searching for word: ${songName}, using Error Track`);
            return "notfound";
        }
        return "notfound";
    }
    async function isSameSong(word, name) {
        const cleanedName = name
            .toUpperCase()
            .replace(/[^\w\s\-]|_/g, "")
            .replace(/\s+/g, " ");
        const cleanedWord = word
            .toUpperCase()
            .replace(/[^\w\s\-]|_/g, "")
            .replace(/\s+/g, " ");
        return cleanedName === cleanedWord;
    }
    async function createPlaylist(songArr, notfoundSongs) {
        const date = new Date();
        const locale = "en-GB";
        const newPlaylist = await CosmosAsync.post("https://api.spotify.com/v1/me/playlists", {
            name: `Phrase2Playlist - ${date.toLocaleString(locale).slice(0, 10)}`,
            public: false,
        });
        const playlistID = newPlaylist.uri;
        await Platform.PlaylistAPI.add(playlistID, songArr.filter(String), { before: 0 });
        Spicetify.showNotification(`Created new Phrase2Playlist playlist! ${notfoundSongs ? `(${notfoundSongs} songs not found)` : ""}`);
    }
})();
