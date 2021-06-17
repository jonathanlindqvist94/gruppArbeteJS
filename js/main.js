const form = document.querySelector('.form');
const btnSearch = document.querySelector('.btn-search');
const lyrics = document.querySelector('.lyrics-area');
const error = document.querySelector('.error');
const artistName = document.querySelector('.artist-name');
const lyricsTitle = document.querySelector('.lyrics-title')

btnSearch.addEventListener("click", checkInputFields);



// Skapar felmeddelanden

function errorMessage(text) {
    const errorMessage = document.createElement(`h3`);
    errorMessage.textContent = text;
    error.appendChild(errorMessage);
};


// Tömmer tidigare sökningarnas fält

function clearSearch() {
    lyrics.querySelectorAll(`h3, textarea, h2`).forEach(n => n.remove());
};

// kollar inputfälten

function checkInputFields(event) {
    clearSearch();

    if (artistName.value === `` || lyricsTitle.value === ``) {
        event.preventDefault();
        errorMessage(`Please check if you have filled in both Artist and Title fields \u{1F600}`);
    } 
    
    else {
        event.preventDefault();

        const URL = `http://ianertson.com:3500/ ${encodeURI(artistName.value)} / ${encodeURI(lyricsTitle.value)}`;
        // gamla apiet https://api.lyrics.ovh/v1/


        fetch(URL).then(function (response) {
            response.json().then(function (data) {
                const foundLyrics = document.createElement(`textarea`);
                foundLyrics.textContent = data[0].lyrics;

                const mySearch = document.createElement(`h2`);
                mySearch.textContent = `Lyrics for \u{266B} ${artistName.value} - ${lyricsTitle.value} \u{1F600} \u{266B}`

                lyrics.appendChild(mySearch);
                lyrics.appendChild(foundLyrics);
                artistName.value = ``;
                lyricsTitle.value = ``;
            });

        }).catch(function() {
            errorMessage(`Cant found the lyrics for the required song! \u{1F622}`);
        }); 
    };
};

