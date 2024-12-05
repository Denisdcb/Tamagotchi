import { Tamagochi } from "/Tamagotchi.js";

const logo = {
    screen: "\u{270B}",
    normal: "\u{1F638}",
    angry: "\u{1F63C}",
    dead: "\u{1F691}"
};

const screenLogo = document.getElementById('screen-logo');
const screenMessage = document.getElementById('screen-message');
const displayTam = document.getElementById('tam-infos');
const restart = document.getElementById('restart');
const tamagotchiChooseName = document.getElementById('name');
const form = document.getElementById('tam-form');

screenLogo.textContent = logo.screen;

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la redirection
    form.style.display = 'none';
    displayTam.style.display = 'flex';
    startTam(tamagotchiChooseName.value);
});

const foodTam = document.getElementById('food');
const sleepTam = document.getElementById('sleep');
const tamagotchiName = document.getElementById('tam-name');
const tamagotchiAge = document.getElementById('tam-age');
const tamagotchiLife = document.getElementById('tam-life');
const tamagotchiEnergy = document.getElementById('tam-energy');
const tamagotchiCurrentLife = document.getElementById('tam-life-current');
const tamagotchiCurrentEnergy = document.getElementById('tam-energy-current');

// Fonction utilitaire pour limiter une valeur entre min et max
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}

function startTam(name) {
    const tamagotchi = new Tamagochi(name);

    screenLogo.textContent = logo.normal;
    tamagotchiName.textContent = `Name : ${tamagotchi.name}`;

    function updateUI() {
        // Met à jour l'affichage des stats
        tamagotchiLife.textContent = `Life : ${tamagotchi.life}`;
        tamagotchiCurrentLife.style.width = `${tamagotchi.life}%`;

        tamagotchiEnergy.textContent = `Energy : ${tamagotchi.energy}`;
        tamagotchiCurrentEnergy.style.width = `${tamagotchi.energy}%`;

        tamagotchiAge.textContent = `Age : ${tamagotchi.age}`;

        // Vérification de la mort
        if (tamagotchi.life === 0 || tamagotchi.energy === 0) {
            clearInterval(intervalId); // Arrêter l'intervalle
            screenLogo.textContent = logo.dead; // Logo "mort"
            screenMessage.style.color = "red";
            screenMessage.textContent = "GAME OVERRR";
            displayTam.style.display = "none";
            restart.style.display = "flex";
        }
    }

    function growUp() {
        // Diminuer vie et énergie périodiquement
        tamagotchi.life = clamp(tamagotchi.life - 5, 0, 100);
        tamagotchi.energy = clamp(tamagotchi.energy - 5, 0, 100);
        tamagotchi.age += 1;

        // Vérification des états
        if (tamagotchi.life < 50 || tamagotchi.energy < 50) {
            // Si vie ou énergie < 50, on passe à l'état "angry"
            if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                screenLogo.textContent = logo.angry;
                screenMessage.style.color = "orange";
                screenMessage.textContent = "HELPPPPP"
            }
        } else {
            // Si la vie ou l'énergie est remontée au-dessus de 50, on repasse à l'état "normal"
            if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                screenLogo.textContent = logo.normal;
                screenMessage.style.color = "green";
                screenMessage.textContent = "EVR'S FINE"
            }
        }

        // Met à jour l'UI après chaque modification
        updateUI();

        // Si la vie ou l'énergie est à 0, on arrête l'intervalle
        if (tamagotchi.life === 0 || tamagotchi.energy === 0) {
            clearInterval(intervalId); // Arrêter l'intervalle
        }
    }

    function feed() {
        tamagotchi.life = clamp(tamagotchi.life + 10, 0, 100);
        tamagotchi.energy = clamp(tamagotchi.energy - 10, 0, 100);
        updateUI();
    }

    function sleep() {
        tamagotchi.energy = clamp(tamagotchi.energy + 50, 0, 100);
        updateUI();
    }

    // Ajouter des écouteurs pour les boutons
    foodTam.addEventListener('click', feed);
    sleepTam.addEventListener('click', sleep);

    // Démarrer l'intervalle
    const intervalId = setInterval(growUp, 2000); // Toutes les 2 secondes
    updateUI(); // Met à jour l'affichage immédiatement
}
