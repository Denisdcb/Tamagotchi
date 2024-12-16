"use strict";
class Tamagochi {
    constructor(name) {
        this.name = name; // Nom du Tamagochi
        this.age = 0; // Âge initialisé à 0
        this.life = 100; // Vie initialisée à 100
        this.energy = 100; // Énergie initialisée à 100
    }
    // Méthode pour afficher l'état actuel du Tamagochi
    getStatus() {
        return `Nom: ${this.name}, Âge: ${this.age}, Vie: ${this.life}, Énergie: ${this.energy}`;
    }
}
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
if (screenLogo) {
    screenLogo.textContent = logo.screen;
}
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la redirection
    form.style.display = 'none';
    if (displayTam)
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
    if (screenLogo) {
        screenLogo.textContent = logo.normal;
    }
    if (tamagotchiName) {
        tamagotchiName.textContent = `Name : ${tamagotchi.name}`;
    }
    function updateUI() {
        if (tamagotchiLife) {
            tamagotchiLife.textContent = `Life : ${tamagotchi.life}`;
            if (tamagotchiCurrentLife) {
                tamagotchiCurrentLife.style.width = `${tamagotchi.life}%`;
            }
        }
        if (tamagotchiEnergy) {
            tamagotchiEnergy.textContent = `Energy : ${tamagotchi.energy}`;
            if (tamagotchiCurrentEnergy) {
                tamagotchiCurrentEnergy.style.width = `${tamagotchi.energy}%`;
            }
        }
        if (tamagotchiAge) {
            tamagotchiAge.textContent = `Age : ${tamagotchi.age}`;
        }
        if ((tamagotchi.life === 0 || tamagotchi.energy === 0) && screenLogo) {
            clearInterval(intervalId); // Arrêter l'intervalle
            screenLogo.textContent = logo.dead; // Logo "mort"
            if (screenMessage) {
                screenMessage.style.color = "red";
                screenMessage.textContent = "GAME OVERRR";
            }
            if (displayTam)
                displayTam.style.display = "none";
            if (restart)
                restart.style.display = "flex";
        }
    }
    function growUp() {
        tamagotchi.life = clamp(tamagotchi.life - 5, 0, 100);
        tamagotchi.energy = clamp(tamagotchi.energy - 5, 0, 100);
        tamagotchi.age += 1;
        if (screenLogo) {
            if (tamagotchi.life < 50 || tamagotchi.energy < 50) {
                if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                    screenLogo.textContent = logo.angry;
                    if (screenMessage) {
                        screenMessage.style.color = "orange";
                        screenMessage.textContent = "HELPPPPP";
                    }
                }
            }
            else {
                if (tamagotchi.life > 0 && tamagotchi.energy > 0) {
                    screenLogo.textContent = logo.normal;
                    if (screenMessage) {
                        screenMessage.style.color = "green";
                        screenMessage.textContent = "EVR'S FINE";
                    }
                }
            }
        }
        updateUI();
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
    if (foodTam)
        foodTam.addEventListener('click', feed);
    if (sleepTam)
        sleepTam.addEventListener('click', sleep);
    const intervalId = setInterval(growUp, 2000); // Toutes les 2 secondes
    updateUI();
}
