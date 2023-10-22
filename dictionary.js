// $-ral jelöljük  azokat a változóneveket, amelyekkel a js oldallal kapcsolatba lépünk.
const $form = document.querySelector(".js-word-form");
const $container = document.querySelector(".js-word-description");
const $searchInput = document.querySelector("[name=word]"); // Kiolvassuk az inputmező értékét
const $errorSection = document.querySelector(".js-error");
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"; // API URL minusz keresett szó

function renderData(response) {
    let html = '';
    // validálás
    if (Array.isArray(response) && response.length > 0) {

    } else {
        $errorSection.innerHTML = `<p>A keresett szó nem található!</p>`;
    }

    for (let item of response) {

        html +=
            `
            <section class="meaning">
                <h3>${item.word}</h3>
                <p>${item.meanings[0].definitions[0].definition}</p>
                <p>Synonym: ${item.meanings[0].synonyms[0]}</p>                
            </section >
        `
    }
    $container.innerHTML = html;

}

function formSubmitted(event) {
    event.preventDefault(); // Megakadályozzuk az oldal újratöltődését

    const value = $searchInput.value.trim(); // Létrehozzuk a változót, ami a food értékét tartalmazza, 
    // a trim()-mel kiegészítve, hogy a szóközök ne jelentsenek problémát.
    $searchInput.value = ''; // törli a keresőmezőt a keresés után
    $container.innerHTML = '';       // / Ennek a tartalmát minden kereséskor törölni kell! $errorField.innerHTML = ''

    if (value.length > 0) {         // Validáció
        $errorSection.innerHTML = ''; // Ennek a tartalmát minden kereséskor törölni kell! $errorField.innerHTML = ''

        fetch(apiUrl + value)
            .then(data => data.json())
            .then(renderData);

    } else {
        $errorSection.innerHTML =
            'Sikertelen keresés!'
    }
    console.log(value);
}

$form.addEventListener("submit", formSubmitted);