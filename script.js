import { Tamagochi } from "/Tamagotchi.js";

const tamagotchi = new Tamagochi('Dobby');
const tamagotchiName = document.getElementById('tam-name')
const tamagotchiAge = document.getElementById('tam-age')

tamagotchiName.textContent = `Name : ${tamagotchi.name}`
tamagotchiAge.textContent = `Age : ${tamagotchi.age}`