export class Tamagochi {
    // Le constructeur prend le nom en paramètre et initialise les autres propriétés
    constructor(name) {
      this.name = name; // Nom du Tamagochi
      this.age = 0;     // Âge initialisé à 0
      this.life = 100;  // Vie initialisée à 100
      this.energy = 100; // Énergie initialisée à 100
    }

     // Méthode pour afficher l'état actuel du Tamagochi
    getStatus() {
        return `Nom: ${this.name}, Âge: ${this.age}, Vie: ${this.life}, Énergie: ${this.energy}`;
    }
}
