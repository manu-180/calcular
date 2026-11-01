import { definirCasos } from "@/motor/calculo";
import calc from "./atvinnuleysisbaetur";

export default definirCasos(calc, [
  {
    nombre: "800.000 kr. laun",
    origen: { tipo: "recalculado", detalle: "70% af 800.000 = 560.000, undir hámarki 605.159." },
    fecha: "2026-06-15",
    entrada: { laun: 800000, rettur: "r100", born: 0 },
    esperado: { grunn: 383870, tekjutengdar: 560000, manadargreidsla: 560000 },
  },
  {
    nombre: "Hámark",
    origen: { tipo: "oficial", url: "https://island.is/redirects/www.vinnumalastofnun.is/atvinnuleitandi/fjarhaedir-og-greidslur-atvinnuleysisbota/fjarhaedir-atvinnuleysisbota", detalle: "Tekjutengdar bætur eru aldrei hærri en 605.159 kr." },
    fecha: "2026-06-15",
    entrada: { laun: 1500000, rettur: "r100", born: 1 },
    esperado: { tekjutengdar: 605159, barnavidbot: 15355, manadargreidsla: 620514 },
  },
  {
    nombre: "50% bótaréttur með tvö börn",
    origen: { tipo: "recalculado", detalle: "191.935 + 2 x 15.355 = 222.645." },
    fecha: "2026-06-15",
    entrada: { laun: 300000, rettur: "r50", born: 2 },
    esperado: { grunn: 191935, tekjutengdar: null, manadargreidsla: 222645 },
  },
]);
