import { definirCasos } from "@/motor/calculo";
import lagfart from "./lagfart";

const LM = "https://www.lantmateriet.se/sv/fastighet-och-mark/kopa-aga-salja-eller-ge-bort/Stampelskatt-och-avgifter/";

export default definirCasos(lagfart, [
  {
    nombre: "Lantmäteriets exempel: köp från släkting för 1 000 kr",
    origen: { tipo: "oficial", url: LM, detalle: "Taxeringsvärde 288 750 kr är högre. 1,5 % av 288 000 kr = 4 320 kr. Expeditionsavgift 825 kr tillkommer." },
    fecha: "2026-10-24",
    entrada: { kopeskilling: 1000, taxeringsvarde: 288750, kopare: "privat", pantbrev: 0, antalPantbrev: 1 },
    esperado: { underlag: 288000, stampelskatt: 4320, lagfart: 5145, totalt: 5145 },
  },
  {
    nombre: "Villa för 4 000 000 kr med nya pantbrev på 1 000 000 kr",
    origen: { tipo: "recalculado", url: LM, detalle: "1,5 % av 4 000 000 = 60 000 + 825 = 60 825. Pantbrev 2 % av 1 000 000 = 20 000 + 375 = 20 375. Totalt 81 200 kr." },
    fecha: "2026-10-24",
    entrada: { kopeskilling: 4000000, taxeringsvarde: 2800000, kopare: "privat", pantbrev: 1000000, antalPantbrev: 1 },
    esperado: { lagfart: 60825, pantbrev: 20375, totalt: 81200 },
  },
  {
    nombre: "Aktiebolag köper för 2 500 000 kr",
    origen: { tipo: "recalculado", url: LM, detalle: "Juridisk person: 4,25 % av 2 500 000 = 106 250 + 825 = 107 075 kr." },
    fecha: "2026-10-24",
    entrada: { kopeskilling: 2500000, taxeringsvarde: 1500000, kopare: "juridisk", pantbrev: 0, antalPantbrev: 0 },
    esperado: { lagfart: 107075 },
  },
  {
    nombre: "Inga belopp",
    origen: { tipo: "recalculado", url: LM, detalle: "Utan köpeskilling eller taxeringsvärde finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { kopeskilling: 0, taxeringsvarde: 0, kopare: "privat", pantbrev: 0, antalPantbrev: 0 },
    esperaError: true,
  },
]);
