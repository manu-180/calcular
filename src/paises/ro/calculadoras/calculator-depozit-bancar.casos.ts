import { definirCasos } from "@/motor/calculo";
import calculatorDepozitBancar from "./calculator-depozit-bancar";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorDepozitBancar, [
  {
    nombre: "10.000 lei pe 12 luni la 6 %",
    origen: { tipo: "recalculado", url: CF, detalle: "Dobândă brută 600; impozit 10 % = 60 (art. 97 alin. 2); net 540; final 10.540 lei." },
    fecha: "2026-10-24",
    entrada: { suma: 10000, dobanda: 6, termen: "12", luni: 12, capitalizare: true },
    esperado: { brut: 600, impozit: 60, net: 540, final: 10540 },
  },
  {
    nombre: "Depozit la 3 luni cu capitalizare, un an",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Trimestrial 1,5 %: 150 − 15; 152,03 − 15,20; 154,08 − 15,41; 156,16 − 15,62 (rotunjit la bani). Brut 612,27, impozit 61,23, net 551,04, final 10.551,04.",
    },
    fecha: "2026-10-24",
    entrada: { suma: 10000, dobanda: 6, termen: "3", luni: 12, capitalizare: true },
    esperado: { brut: 612.27, impozit: 61.23, net: 551.04, final: 10551.04 },
  },
  {
    nombre: "Fără capitalizare, doi ani la 12 luni",
    origen: { tipo: "recalculado", url: CF, detalle: "De două ori 600 brut și 60 impozit: net 1.080, final 11.080." },
    fecha: "2026-10-24",
    entrada: { suma: 10000, dobanda: 6, termen: "12", luni: 24, capitalizare: false },
    esperado: { net: 1080, final: 11080 },
  },
  {
    nombre: "Perioadă mai scurtă decât termenul",
    origen: { tipo: "recalculado", url: CF, detalle: "Două luni la un depozit de 3 luni nu încheie niciun termen." },
    fecha: "2026-10-24",
    entrada: { suma: 10000, dobanda: 6, termen: "3", luni: 2, capitalizare: true },
    esperaError: true,
  },
]);
