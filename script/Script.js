// Array con le emoji che useremo come immagini
var emoji = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Creo un array con le coppie (ogni emoji due volte)
var carte = emoji.concat(emoji);

// Variabili per tenere traccia del gioco
var primaCartaCliccata = null; // Prima carta che il giocatore clicca
var secondaCartaCliccata = null; // Seconda carta che il giocatore clicca
var numeroDiMosse = 0; // Contatore delle mosse fatte
var aspetta = false; // Variabile per evitare clic durante l'attesa

// Funzione per mescolare le carte in modo casuale
function mescola(array) {
    // Algoritmo di Fisher-Yates per mescolare l'array
    for (var i = array.length - 1; i > 0; i--) {
        // Scegli un indice casuale tra 0 e i
        var indiceCasuale = Math.floor(Math.random() * (i + 1));
        
        // Scambia gli elementi
        var temp = array[i];
        array[i] = array[indiceCasuale];
        array[indiceCasuale] = temp;
    }
    return array;
}

// Funzione per creare il gioco
function creaGioco() {
    // Trovo il contenitore del gioco e lo svuoto
    var contenitoreGioco = document.getElementById('game');
    contenitoreGioco.innerHTML = '';
    
    // Mescolo le carte
    carte = mescola(carte);
    
    // Creo un div per ogni carta
    for (var i = 0; i < carte.length; i++) {
        var carta = document.createElement('div');
        
        // Imposto lo stile della carta
        carta.innerHTML = '?'; // Mostra un punto interrogativo all'inizio
        carta.style.width = '80px';
        carta.style.height = '80px';
        carta.style.backgroundColor = 'blue';
        carta.style.color = 'white';
        carta.style.fontSize = '40px';
        carta.style.display = 'inline-block';
        carta.style.margin = '5px';
        carta.style.textAlign = 'center';
        carta.style.lineHeight = '80px';
        carta.style.cursor = 'pointer';
        
        // Salvo l'emoji nascosta e l'ID della carta
        carta.dataset.emoji = carte[i];
        carta.dataset.id = i;
        
        // Aggiungo l'evento click alla carta
        carta.onclick = function() {
            giraCarta(this);
        };
        
        // Aggiungo la carta al contenitore
        contenitoreGioco.appendChild(carta);
    }
}

// Funzione che viene chiamata quando clicco una carta
function giraCarta(carta) {
    // Se sto aspettando o la carta è già girata, non faccio niente
    if (aspetta || carta.innerHTML !== '?') {
        return;
    }
    
    // Mostro l'emoji della carta
    carta.innerHTML = carta.dataset.emoji;
    carta.style.backgroundColor = 'white';
    carta.style.color = 'black';
    
    // Se è la prima carta cliccata
    if (primaCartaCliccata === null) {
        primaCartaCliccata = carta;
    } 
    // Se è la seconda carta cliccata
    else {
        secondaCartaCliccata = carta;
        
        // Aumento il contatore delle mosse
        numeroDiMosse++;
        document.getElementById('mosse').innerHTML = numeroDiMosse;
        
        // Impedisco al giocatore di cliccare altre carte
        aspetta = true;
        
        // Controllo se le due carte sono uguali
        if (primaCartaCliccata.dataset.emoji === secondaCartaCliccata.dataset.emoji) {
            // Le carte sono uguali, le lascio scoperte
            primaCartaCliccata = null;
            secondaCartaCliccata = null;
            aspetta = false;
            
            // Controllo se ho finito il gioco
            controllaVittoria();
        } else {
            // Le carte sono diverse, le rigiro dopo 1 secondo
            setTimeout(function() {
                // Nascondo la prima carta
                primaCartaCliccata.innerHTML = '?';
                primaCartaCliccata.style.backgroundColor = 'blue';
                primaCartaCliccata.style.color = 'white';
                
                // Nascondo la seconda carta
                secondaCartaCliccata.innerHTML = '?';
                secondaCartaCliccata.style.backgroundColor = 'blue';
                secondaCartaCliccata.style.color = 'white';
                
                // Resetto le variabili per la prossima mossa
                primaCartaCliccata = null;
                secondaCartaCliccata = null;
                aspetta = false;
            }, 1000);
        }
    }
}

// Funzione per controllare se ho vinto
function controllaVittoria() {
    // Controllo se tutte le carte sono state scoperte
    var tutteGirate = true;
    var contenitoreGioco = document.getElementById('game');
    var tutteLeCarte = contenitoreGioco.children;
    
    // Controllo ogni carta
    for (var i = 0; i < tutteLeCarte.length; i++) {
        // Se trovo una carta ancora coperta, il gioco non è finito
        if (tutteLeCarte[i].innerHTML === '?') {
            tutteGirate = false;
            break;
        }
    }
    
    // Se tutte le carte sono scoperte, il giocatore ha vinto
    if (tutteGirate) {
        setTimeout(function() {
            alert('Hai vinto! Mosse: ' + numeroDiMosse);
        }, 500);
    }
}

// Funzione per ricominciare il gioco
function ricomincia() {
    // Resetto tutte le variabili del gioco
    primaCartaCliccata = null;
    secondaCartaCliccata = null;
    numeroDiMosse = 0;
    aspetta = false;
    
    // Resetto il contatore delle mosse
    document.getElementById('mosse').innerHTML = '0';
    
    // Ricreo il gioco
    creaGioco();
}

// Inizio il gioco quando carico la pagina
creaGioco();