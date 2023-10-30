// $-ral jelöljük  azokat a változóneveket, amelyekkel a js oldallal kapcsolatba lépünk.
const $form = document.querySelector(".js-word-form");
const $container = document.querySelector(".js-word-description");
const $searchInput = document.querySelector("[name=word]"); // Kiolvassuk az inputmező értékét
const $errorSection = document.querySelector(".js-error");
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // API URL minusz keresett szó

function renderDefinitions(definitions) {
    let html = ``;
    for (let def of definitions) {
        let example = '';
        if (typeof def.example === 'string') {
            example = `(e.g. ${def.example})`;
        }
        html += `        
            <li>
                <p>${def.definition} ${example}</p>
            </li>        
        `
    }

    return html;
}

function renderSynonyms(synonymList) {
    return (
        synonymList
            .map(text => `<a href="#" data-text="${text}">${text}</a>`) // kattinthatóak a szinonímák
            .join(", ")
    );
}

function renderMeaning(meaning) {
    let html = `
        <div class="card">
            <h3>${meaning.partOfSpeech}</h3>
            <ol class="def-list">${renderDefinitions(meaning.definitions)}</ol>        
        </div>
    `;

    if (Array.isArray(meaning.synonyms) && meaning.synonyms.length > 0) {
        // ha az első állítás igaz, akkor a másodikat is kiértékeljük
        html += `
            <p class="card">Synonims: ${renderSynonyms(meaning.synonyms)}</p>
        `
    }

    return html;
}

function renderWord(word) {
    let phonetic = '';
    if (typeof word.phonetic === 'string') {
        phonetic = word.phonetic;
    }
    let html = `<h2 class="card">${word.word} ${phonetic}</h2>`; // wordDefinitions[0]-ban vannak
    for (let meaning of word.meanings) {
        html += renderMeaning(meaning); // másik függvényben megoldjuk
    }

    return html;
}

function renderResponse(wordList) {
    let html = ``;
    // validálás, sikertelen keresésnél nem kapunk array-t, hanem csak egy object-et.
    if (Array.isArray(wordList) && wordList.length > 0) {
        for (let word of wordList) {
            html += `<div class="word-list-div">${renderWord(word)}</div>`;
        }
    } else {
        $errorSection.innerHTML = `<p>Sorry, we couldn't find the word!</p>`;
    }

    $container.innerHTML = html;
}

// function renderResponse(wordDefinitions) {
//     let html = ``;
//     // validálás, sikertelen keresésnél nem kapunk array-t, hanem csak egy object-et.
//     if (Array.isArray(wordDefinitions) && wordDefinitions.length > 0) {
//         // let definitions = wordDefinitions[0];  
//         html = renderWord(wordDefinitions[0]);
//     } else {
//         $errorSection.innerHTML = `<p>A keresett szó nem található!</p>`;
//     }

//     $container.innerHTML = html;
// }

function getApiUrl(word) {
    return apiUrl + word;
}

function fetchWord(word) {
    fetch(getApiUrl(word))
        .then(response => response.json())
        .then(renderResponse);
}

function formSubmitted(event) {
    event.preventDefault(); // Megakadályozzuk az oldal újratöltődését

    const word = $searchInput.value.trim(); // Létrehozzuk a változót, ami a food értékét tartalmazza, 
    // a trim()-mel kiegészítve, hogy a szóközök ne jelentsenek problémát.
    $searchInput.value = '';          // törli a keresőmezőt a keresés után
    $container.innerHTML = '';       // Ennek a tartalmát minden kereséskor törölni kell!

    if (word.length > 0) {         // Validáció
        $errorSection.innerHTML = ''; // Ennek a tartalmát minden kereséskor törölni kell!
        fetchWord(word)
    } else {
        $errorSection.innerHTML =
            'Sikertelen keresés!'
    }
}

function wordNavigation(event) {
    event.preventDefault(); // Megakadályozzuk az oldal újratöltődését    
    if (typeof event.target.dataset.text === 'string') {
        fetchWord(event.target.dataset.text);
    }
}

$form.addEventListener("submit", formSubmitted);
$container.addEventListener("click", wordNavigation); // kattinthatóak a szinonímák