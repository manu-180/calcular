import { definirCasos } from "@/motor/calculo";
import calc from "./faedingarorlof";

export default definirCasos(calc, [
  {
    nombre: "1 milljón í laun",
    origen: { tipo: "recalculado", detalle: "80% = 800.000. Iðgjald 32.000, stofn 768.000, skattur 156.859 + 102.527 = 259.386, - 72.492 = 186.894. Útborgað 581.106." },
    fecha: "2026-06-15",
    entrada: { laun: 1000000, starf: "fullt", manudir: 6 },
    esperado: { greidsla: 800000, stadgreidsla: 186894, utborgad: 581106, samtals: 4800000 },
  },
  {
    nombre: "Hámark",
    origen: { tipo: "oficial", url: "https://island.is/umsokn-um-faedingarorlof/upphaedir-og-utreikningur", detalle: "Greiðsla er aldrei hærri en 900.000 kr. á mánuði frá 1. janúar 2026." },
    fecha: "2026-06-15",
    entrada: { laun: 1500000, starf: "fullt", manudir: 6 },
    esperado: { greidsla: 900000 },
  },
  {
    nombre: "Lágmark í fullu starfi",
    origen: { tipo: "oficial", url: "https://island.is/umsokn-um-faedingarorlof/upphaedir-og-utreikningur", detalle: "275.688 kr. í 50 til 100% starfi." },
    fecha: "2026-06-15",
    entrada: { laun: 200000, starf: "fullt", manudir: 6 },
    esperado: { greidsla: 275688 },
  },
  {
    nombre: "Lágmark í hlutastarfi",
    origen: { tipo: "oficial", url: "https://island.is/umsokn-um-faedingarorlof/upphaedir-og-utreikningur", detalle: "207.708 kr. í 25 til 49% starfi." },
    fecha: "2026-06-15",
    entrada: { laun: 200000, starf: "hluta", manudir: 6 },
    esperado: { greidsla: 207708 },
  },
]);
