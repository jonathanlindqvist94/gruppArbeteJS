// hämtar HTML fälten

const form = document.querySelector('.form');
const btnSearch = document.querySelector('.btn-search');
const lyrics = document.querySelector('.lyrics-area');
const error = document.querySelector('.error');
const artistName = document.querySelector('.artist-name');
const lyricsTitle = document.querySelector('.lyrics-title')


artistName.addEventListener('keydown', checkInputFields)
lyricsTitle.addEventListener('keydown', checkInputFields)
btnSearch.addEventListener('click', searchSong);




/* 
----------------------------------------------------------------
*/


// Felmeddelanden.

function errorMessage(text) {
    const errorMsg = document.createElement(`h3`);
    errorMsg.textContent = text;
    error.appendChild(errorMsg);
}

// Tömmer lyricsfälten.

function clearLyrics() {
    lyrics.querySelectorAll(`h3, textarea, h2`).forEach(n => n.remove());
}

// Kollar inputfälten.

function checkInputFields() {
    if(artistName.value === ``  || lyricsTitle.value === ``) {
        clearLyrics();
        errorMessage(`Please check if you have filled in both Artist and Title fields \u{1F600}`);
    }
    
    else {
        clearLyrics();
        btnSearch.removeAttribute(`disabled`);
    }
}


/* 
----------------------------------------------------------------
*/



// Söker efter låt och text.

function searchSong(event) {
    clearLyrics();
    event.preventDefault();
    const URL = `http://ianertson.com:3500/ ${artistName.value} / ${lyricsTitle.value}`;
    
    fetch(URL).then(function(response) {
        response.json().then(function(data) {
            const myLyrics = document.createElement(`textarea`);

            if (data.length>=1) {
                myLyrics.textContent = data[0].lyrics;

                const mySearch = document.createElement(`h2`);
                mySearch.textContent = `Lyrics for \u{266B} ${artistName.value} - ${lyricsTitle.value} \u{1F600} \u{266B}`;

                lyrics.appendChild(mySearch);
                lyrics.appendChild(myLyrics);
                artistName.value = ``;
                lyricsTitle.value = ``;
                btnSearch.setAttribute(`disabled`, 1)
            }
            else {
                errorMessage(`Cant found the lyrics for the required song! \u{1F622}`);
            }
        })
    })
}

