class Tamagochi {
    name: string;
    age: number;
    life: number;
    energy: number;

    constructor(name: string) {
        this.name = name; // Nom du Tamagochi
        this.age = 0;     // Âge initialisé à 0
        this.life = 100;  // Vie initialisée à 100
        this.energy = 100; // Énergie initialisée à 100
    }

    // Méthode pour afficher l'état actuel du Tamagochi
    getStatus(): string {
        return `Nom: ${this.name}, Âge: ${this.age}, Vie: ${this.life}, Énergie: ${this.energy}`;
    }
}

type Logo = {
    screen: string;
    normal: string;
    angry: string;
    dead: string;
};

const logo: Logo = {
    screen: "\u{270B}",
    normal: "\u{1F638}",
    angry: "\u{1F63C}",
    dead: "\u{1F691}"
};

const screenLogo = document.getElementById('screen-logo') as HTMLElement;
const screenMessage = document.getElementById('screen-message') as HTMLElement;
const displayTam = document.getElementById('tam-infos') as HTMLElement;
const restart = document.getElementById('restart') as HTMLElement;
const tamagotchiChooseName = document.getElementById('name') as HTMLInputElement;
const form = document.getElementById('tam-form') as HTMLFormElement;

if (screenLogo) {
    screenLogo.textContent = logo.screen;
}

form.addEventListener('submit', function(event: Event) {
    event.preventDefault(); // Empêche la redirection
    form.style.display = 'none';
    if (displayTam) displayTam.style.display = 'flex';
    startTam(tamagotchiChooseName.value);
});

const foodTam = document.getElementById('food') as HTMLElement;
const sleepTam = document.getElementById('sleep') as HTMLElement;
const tamagotchiName = document.getElementById('tam-name') as HTMLElement;
const tamagotchiAge = document.getElementById('tam-age') as HTMLElement;
const tamagotchiLife = document.getElementById('tam-life') as HTMLElement;
const tamagotchiEnergy = document.getElementById('tam-energy') as HTMLElement;
const tamagotchiCurrentLife = document.getElementById('tam-life-current') as HTMLElement;
const tamagotchiCurrentEnergy = document.getElementById('tam-energy-current') as HTMLElement;

// Fonction utilitaire pour limiter une valeur entre min et max
function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

function startTam(name: string): void {
    const tamagotchi = new Tamagochi(name);

    if (screenLogo) {
        screenLogo.textContent = logo.normal;
    }
    if (tamagotchiName) {
        tamagotchiName.textContent = `Name : ${tamagotchi.name}`;
    }

    function updateUI(): void {
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
            if (displayTam) displayTam.style.display = "none";
            if (restart) restart.style.display = "flex";
        }
    }

    function growUp(): void {
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
            } else {
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

    function feed(): void {
        tamagotchi.life = clamp(tamagotchi.life + 10, 0, 100);
        tamagotchi.energy = clamp(tamagotchi.energy - 10, 0, 100);
        updateUI();
    }

    function sleep(): void {
        tamagotchi.energy = clamp(tamagotchi.energy + 50, 0, 100);
        updateUI();
    }

    if (foodTam) foodTam.addEventListener('click', feed);
    if (sleepTam) sleepTam.addEventListener('click', sleep);

    const intervalId = setInterval(growUp, 2000); // Toutes les 2 secondes
    updateUI();
}
