const spielfeld_class = "spielfeld";
const spielstand_class ="spielstand"
const feld_class = "feld"
const spieler_class = "spieler"
const gegner_class= "gegner"
const overlay_klasse ="overlay"
const overlay_text_klasse = "overlay-text"
const overlay_button_klasse = "overlay-button"
const sichtbar_klasse = "sichtbar"
const overlay = document.querySelector("." + overlay_klasse)
const overlayText = document.querySelector("." + overlay_text_klasse)
const overlayButton = document.querySelector("." + overlay_button_klasse)
const spielfeld = document.querySelector("." + spielfeld_class)
const spielstand = document.querySelector("." + spielstand_class)
const felder = document.querySelectorAll("." + feld_class)
const gegner = document.querySelector("." + gegner_class)
const spieler = document.querySelector("." + spieler_class)

const sieg_kombi = [
    [felder[0], felder[1], felder[2]],
    [felder[3], felder[4], felder[5]],
    [felder[6], felder[7], felder[8]],
    [felder[0], felder[3], felder[6]],
    [felder[1], felder[4], felder[7]],
    [felder[2], felder[5], felder[8]],
    [felder[0], felder[4], felder[8]],
    [felder[2], felder[4], felder[6]]
]



let aktuelleKlasse;
spielStarten();

function klickVerarbeitung(ereignis) {
    const feld = ereignis.target;
    if (spielsteinSetzen(feld)=== true) {
        zugBeenden()
    }
}

function spielsteinSetzen(feld) {
    if (
        feld.classList.contains(spieler_class) ||
        feld.classList.contains(gegner_class)
    ) {
        return false;
    }
    feld.classList.add(aktuelleKlasse);
    feld.disabled = true;
    return true;
}

function spielStarten() {
    for(const feld of felder){
        feld.addEventListener("click", klickVerarbeitung)
    }
    zugBeenden();
}

function zugBeenden() {

    if(siegPruefen()=== true) {
        spielBeenden(false)
        return;
    }
    if(aktuelleKlasse === spieler_class){
        aktuelleKlasse = gegner_class;
    } else if (aktuelleKlasse === gegner_class){
        aktuelleKlasse = spieler_class;
    } else {
       aktuelleKlasse = Math.random() <0.5 ? spieler_class : gegner_class;
    }

    spielstandAktualisieren()
}

function spielstandAktualisieren() {
    spielstand.classList.remove(spieler_class, gegner_class)
    if (aktuelleKlasse === spieler_class) {
        spielstand.innerText = "Du bist am Zug"
    } else { spielstand.innerText = "Der Gegner ist am Zug"}
    spielstand.classList.add(aktuelleKlasse)
}

function siegPruefen() {
    for (const kombination of sieg_kombi) {
      const gewonnen = kombination.every(function (feld){
          return  feld.classList.contains(aktuelleKlasse)
        })
        if (gewonnen === true){
            return true
        }
    }
    return false;
}

function spielBeenden() {
    if (aktuelleKlasse === spieler_class) {
        overlayText.innerText = "Du hast gewonnen!"
    } else {
        overlayText.innerText = "Der Gegner hat gewonnen!"
    }

    overlay.classList.add(sichtbar_klasse)
}
