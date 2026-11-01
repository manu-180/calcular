import { definirCasos } from "@/motor/calculo";
import porezZaPreduzetnike from "./porez-za-preduzetnike";

const DOPRINOSI = "https://amrrs.gov.me/wp-content/uploads/2026/03/Zakon-o-doprinosima-za-obavezno-socijalno-osiguranje-1.pdf";

export default definirCasos(porezZaPreduzetnike, [
  {
    nombre: "Promet 20.000, dohodak 15.000",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "Osnovica 150 % x 1.206 = 1.809; 11 % = 198,99 mjesečno, 2.387,88 godišnje. Porez 9 % na 3.600 + 15 % na 3.000 = 774; prirez 100,62; ostaje 11.737,50." },
    fecha: "2026-10-31",
    entrada: { promet: 20000, dohodak: 15000, prirez: 13 },
    esperado: { osnovica: 1809, doprinosMjesecno: 198.99, doprinosi: 2387.88, porez: 774, prirez: 100.62, ostaje: 11737.5 },
  },
  {
    nombre: "Promet do 9.000: osnovica 60 odsto",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "60 % x 1.206 = 723,60; 11 % = 79,60; x 12 = 955,20. Dohodak ispod 8.400, bez poreza." },
    fecha: "2026-10-31",
    entrada: { promet: 9000, dohodak: 6000, prirez: 13 },
    esperado: { osnovica: 723.6, doprinosi: 955.2, porez: 0, ostaje: 5044.8 },
  },
  {
    nombre: "Promet 15.000: osnovica puni prosjek",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "100 % x 1.206; 11 % = 132,66; x 12 = 1.591,92." },
    fecha: "2026-10-31",
    entrada: { promet: 15000, dohodak: 9000, prirez: 0 },
    esperado: { osnovica: 1206, doprinosi: 1591.92, porez: 54 },
  },
  {
    nombre: "Dohodak veći od prometa je greška",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "Dohodak ne može preći promet." },
    fecha: "2026-10-31",
    entrada: { promet: 1000, dohodak: 2000, prirez: 13 },
    esperaError: true,
  },
]);
