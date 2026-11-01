import { definirCasos } from "@/motor/calculo";
import calculadora from "./avantages-en-nature";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Cadre logé avec voiture et téléphone",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 123 : logement 15 % de 400 000 = 60 000 ; téléphone 15 000 ; voiture 4 roues 30 000 ; total 105 000. Base 400 000 + 50 000 + 105 000 = 555 000 ; ITS 555 000 : 9 000 + 15 000 + 47 500 + 55 000 × 30 % (16 500) = 88 000 ; sans avantages (450 000) : 9 000 + 15 000 + 38 000 = 62 000 ; supplément 26 000.",
    },
    fecha: F,
    entrada: { base: 400000, autres: 50000, profil: "cadre", logement: true, electricite: false, eau: false, telephone: true, nourriture: false, vehicule: "4" },
    esperado: { total: 105000, logement: 60000, telephone: 15000, vehicule: 30000, baseImposable: 555000, supplement: 26000 },
  },
  {
    nombre: "Employé avec électricité, eau et moto",
    origen: { tipo: "recalculado", detalle: "Art. 123, colonne employés : 20 000 + 5 000 + 5 000 = 30 000." },
    fecha: F,
    entrada: { base: 150000, autres: 0, profil: "employe", logement: false, electricite: true, eau: true, telephone: false, nourriture: false, vehicule: "2" },
    esperado: { total: 30000, electricite: 20000, eau: 5000, vehicule: 5000 },
  },
]);
