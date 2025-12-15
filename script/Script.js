// Lista delle carte. Uso dei placeholder colorati così non devi scaricare immagini.
// Ogni immagine è ripetuta due volte per fare le coppie.
var carteArray = [
    { nome: 'rosso', img: 'https://placehold.co/100x100/red/white?text=A' },
    { nome: 'rosso', img: 'https://placehold.co/100x100/red/white?text=A' },
    { nome: 'blu', img: 'https://placehold.co/100x100/blue/white?text=B' },
    { nome: 'blu', img: 'https://placehold.co/100x100/blue/white?text=B' },
    { nome: 'verde', img: 'https://placehold.co/100x100/green/white?text=C' },
    { nome: 'verde', img: 'https://placehold.co/100x100/green/white?text=C' },
    { nome: 'giallo', img: 'https://placehold.co/100x100/yellow/black?text=D' },
    { nome: 'giallo', img: 'https://placehold.co/100x100/yellow/black?text=D' },
    { nome: 'viola', img: 'https://placehold.co/100x100/purple/white?text=E' },
    { nome: 'viola', img: 'https://placehold.co/100x100/purple/white?text=E' },
    { nome: 'nero', img: 'https://placehold.co/100x100/black/white?text=F' },
    { nome: 'nero', img: 'https://placehold.co/100x100/black/white?text=F' }
];

// Mischio le carte in modo casuale
carteArray.sort(function() { 
    return 0.5 - Math.random(); 
});

var griglia = document.querySelector('#griglia');
var risultatoDisplay = document.querySelector('#risultato');
var carteScelte = [];
var carteScelteId = [];
var carteVinte = [];

// Funzione per creare il tabellone di gioco
function creaBoard() {
    for (var i = 0; i < carteArray.length; i++) {
        var carta = document.createElement('img');
        
        // All'inizio metto l'immagine di "copertura" (grigia)
        carta.setAttribute('src', 'https://placehold.co/100x100/gray/gray');
        
        // Do un ID alla carta per riconoscerla dopo
        carta.setAttribute('data-id', i);
        
        // Le stacco un po' una dall'altra dato che non ho CSS
        carta.style.margin = "5px"; 
        
        // Quando clicchi, succede qualcosa
        carta.addEventListener('click', giraCarta);
        
        griglia.appendChild(carta);
    }
}

// Funzione per controllare se hai trovato una coppia
function controllaCorrispondenza() {
    var carte = document.querySelectorAll('img');
    var primaOpzioneId = carteScelteId[0];
    var secondaOpzioneId = carteScelteId[1];

    if (carteScelte[0] === carteScelte[1]) {
        // Se sono uguali
        alert('Bravo! Hai trovato una coppia!');
        // Le rendo bianche o invisibili per far capire che sono prese
        carte[primaOpzioneId].setAttribute('src', 'https://placehold.co/100x100/white/white');
        carte[secondaOpzioneId].setAttribute('src', 'https://placehold.co/100x100/white/white');
        
        // Tolgo il click così non si possono più premere
        carte[primaOpzioneId].removeEventListener('click', giraCarta);
        carte[secondaOpzioneId].removeEventListener('click', giraCarta);
        
        carteVinte.push(carteScelte);
    } else {
        // Se hai sbagliato
        alert('Peccato, riprova.');
        // Le rigiro a faccia in giù (grigie)
        carte[primaOpzioneId].setAttribute('src', 'https://placehold.co/100x100/gray/gray');
        carte[secondaOpzioneId].setAttribute('src', 'https://placehold.co/100x100/gray/gray');
    }

    // Pulisco le variabili per il prossimo turno
    carteScelte = [];
    carteScelteId = [];
    
    // Aggiorno il punteggio
    risultatoDisplay.textContent = carteVinte.length;

    if (carteVinte.length === carteArray.length / 2) {
        risultatoDisplay.textContent = 'Hai vinto tutto!';
    }
}

// Funzione per girare la carta
function giraCarta() {
    var cartaId = this.getAttribute('data-id');
    
    // Cambio l'immagine da grigia a quella colorata
    carteScelte.push(carteArray[cartaId].nome);
    carteScelteId.push(cartaId);
    this.setAttribute('src', carteArray[cartaId].img);

    // Se ho scelto due carte, controllo se sono uguali dopo mezzo secondo
    if (carteScelte.length === 2) {
        setTimeout(controllaCorrispondenza, 500);
    }
}

// Faccio partire il gioco
creaBoard();