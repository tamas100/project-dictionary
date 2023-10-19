function feldolgoz(beolvasottAdat) {
    console.log('adat', beolvasottAdat);
}

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/queen')
    .then(adat => adat.json())
    .then(feldolgoz);