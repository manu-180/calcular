import { definirCasos } from "@/motor/calculo";
import imposteAcquistoCasa from "./calcolo-imposte-acquisto-prima-casa";

export default definirCasos(imposteAcquistoCasa, [
  {
    nombre: "Prima casa da privato con prezzo-valore (esempio Agenzia delle Entrate)",
    origen: {
      tipo: "oficial",
      url: "https://www.agenziaentrate.gov.it/portale/l-acquisto-con-i-benefici-prima-casa",
      detalle: "Rendita 900 euro: 900 × 1,05 × 110 = 103.950; registro 2% = 2.079; più 50 di ipotecaria e 50 di catastale.",
    },
    fecha: "2026-10-14",
    entrada: { prezzo: 200000, venditore: "privato", primaCasa: true, rendita: 900 },
    esperado: { base: 103950, registro: 2079, ipotecaria: 50, catastale: 50, totale: 2179 },
  },
  {
    nombre: "Prima casa da privato senza prezzo-valore (esempio Agenzia delle Entrate)",
    origen: {
      tipo: "oficial",
      url: "https://www.agenziaentrate.gov.it/portale/l-acquisto-con-i-benefici-prima-casa",
      detalle: "Registro 2% su 200.000 euro = 4.000.",
    },
    fecha: "2026-10-14",
    entrada: { prezzo: 200000, venditore: "privato", primaCasa: true, rendita: null },
    esperado: { base: 200000, registro: 4000, totale: 4100 },
  },
  {
    nombre: "Seconda casa da privato con prezzo-valore (esempio Agenzia delle Entrate)",
    origen: {
      tipo: "oficial",
      url: "https://www.agenziaentrate.gov.it/portale/acquisto-di-una-casa-le-imposte",
      detalle: "Rendita 900 euro: 900 × 1,05 × 120 = 113.400; registro 9% = 10.206.",
    },
    fecha: "2026-10-14",
    entrada: { prezzo: 200000, venditore: "privato", primaCasa: false, rendita: 900 },
    esperado: { base: 113400, registro: 10206, totale: 10306 },
  },
  {
    nombre: "Prima casa da impresa con IVA",
    origen: { tipo: "recalculado", detalle: "IVA 4% di 250.000 = 10.000; registro, ipotecaria e catastale 200 ciascuna; totale 10.600." },
    fecha: "2026-10-14",
    entrada: { prezzo: 250000, venditore: "impresa", primaCasa: true, rendita: null },
    esperado: { iva: 10000, registro: 200, totale: 10600 },
  },
  {
    nombre: "Imposta di registro minima",
    origen: { tipo: "recalculado", detalle: "2% di 30.000 = 600, ma il minimo è 1.000." },
    fecha: "2026-10-14",
    entrada: { prezzo: 30000, venditore: "privato", primaCasa: true, rendita: null },
    esperado: { registro: 1000, totale: 1100 },
  },
]);
