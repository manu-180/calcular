import { definirCasos } from "@/motor/calculo";
import kurzovaKalkulacka from "./kurzova-kalkulacka";

const NBS = "https://nbs.sk/export/sk/exchange-rate/2026-10-30/csv";

export default definirCasos(kurzovaKalkulacka, [
  { nombre: "100 eur na doláre 30. 10. 2026", origen: { tipo: "oficial", url: NBS, detalle: "Kurz NBS 1,1172 USD za euro." }, fecha: "2026-10-30", entrada: { suma: 100, mena: "usd", smer: "zEur" }, esperado: { vysledok: 111.72, kurz: 1.1172 } },
  { nombre: "2 435,30 koruny na eurá", origen: { tipo: "oficial", url: NBS, detalle: "Kurz NBS 24,353 CZK za euro: 2 435,30 / 24,353 = 100." }, fecha: "2026-10-30", entrada: { suma: 2435.3, mena: "czk", smer: "naEur" }, esperado: { vysledok: 100 } },
]);
