import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-ariary-euro";

const BFM = "https://www.banky-foibe.mg/admin/wp-json/bfm/cours_devises";

export default definirCasos(calculadora, [
  {
    nombre: "100 euros au 27 octobre 2026",
    origen: { tipo: "recalculado", url: BFM, detalle: "Cours moyen BFM du 27/10/2026 : 5 047,26 Ar. 100 × 5 047,26 = 504 726." },
    fecha: "2026-10-27",
    entrada: { devise: "eur", sens: "vers-ariary", montant: 100 },
    esperado: { cours: 5047.26, ariary: 504726, date: "2026-10-27" },
  },
  {
    nombre: "1 000 000 Ar en dollars au 23 octobre 2026",
    origen: { tipo: "recalculado", url: BFM, detalle: "Cours moyen BFM du 23/10/2026 : 4 586,90 Ar. 1 000 000 / 4 586,90 = 218,01." },
    fecha: "2026-10-23",
    entrada: { devise: "usd", sens: "depuis-ariary", montant: 1000000 },
    esperado: { devise: 218.01, cours: 4586.9 },
  },
  {
    nombre: "Cours fixé pour tester la formule",
    origen: { tipo: "recalculado", detalle: "Avec 5 000 Ar pour un euro : 250 000 / 5 000 = 50." },
    fecha: "2026-10-27",
    entrada: { devise: "eur", sens: "depuis-ariary", montant: 250000 },
    valores: { "mg.eur": { fecha: "2026-10-27", valor: 5000 }, "mg.usd": { fecha: "2026-10-27", valor: 4500 } },
    esperado: { devise: 50 },
  },
]);
