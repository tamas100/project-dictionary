const $form = document.querySelector(".js-word-form");
const $container = document.querySelector(".js-word-description");
const $searchInput = document.querySelector("[name=word]");
const $errorSection = document.querySelector(".js-error");

function formSubmitted(event) {
    event.preventDefault();
    console.log('űrlap beküld')
    const value = $searchInput.value.trim();
    $container.innerHTML = '';
    if (value.length > 0) {
        $errorSection.innerHTML = '';

    } else {
        $errorSection.innerHTML =
            'Sikertelen keresés!'
    }
}

$form.addEventListener("submit", formSubmitted);





function feldolgoz(beolvasottAdat) {
    console.log('adat', beolvasottAdat);
}

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/queen')
    .then(adat => adat.json())
    .then(feldolgoz);