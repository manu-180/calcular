import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import { euro } from "../lib/belasting";

// UWV rekent een maand als 21,75 werkdagen. Een jaar heeft gemiddeld 261 werkdagen (52,2 × 5), dus
// het WW-maandloon is ongeveer gelijk aan het gemiddelde brutomaandloon.
const WERKDAGEN_PER_MAAND = 21.75;

export default definirCalculadora({
  id: "nl.ww-uitkering-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "ww-uitkering-berekenen",
  estado: "publicado",
  requiere: {
    "nl.ww-percentages": "mapa",
    "nl.ww-maximumdagloon": "numero",
    "nl.ww-duur": "mapa",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Gemiddeld bruto maandloon in het laatste jaar (zonder vakantiegeld)", min: 0, porDefecto: 3500 },
    { id: "wekeneis", tipo: "si-no", etiqueta: "Je werkte in minstens 26 van de laatste 36 weken", porDefecto: true },
    { id: "jareneis", tipo: "si-no", etiqueta: "Je werkte in minstens 4 van de laatste 5 kalenderjaren (minstens 208 uur per jaar)", porDefecto: true },
    { id: "jarenVoor2016", tipo: "entero", etiqueta: "Kalenderjaren arbeidsverleden tot en met 2015", min: 0, max: 60, porDefecto: 0 },
    { id: "jarenVanaf2016", tipo: "entero", etiqueta: "Kalenderjaren arbeidsverleden vanaf 2016 (zonder het jaar waarin je werkloos wordt)", min: 0, max: 15, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.maandloon <= 0) throw new ErrorEntrada("Vul je bruto maandloon in.", "maandloon");
    const duurgrenzen = v["nl.ww-duur"];
    const observaciones: string[] = [];
    if (!entrada.wekeneis) {
      observaciones.push("Zonder de wekeneis heb je geen recht op een WW-uitkering. Twijfel je, kijk dan in Mijn UWV of vraag het UWV.");
    }
    const maximumMaandloon = v["nl.ww-maximumdagloon"] * WERKDAGEN_PER_MAAND;
    const wwMaandloon = Math.min(entrada.maandloon, maximumMaandloon);
    if (entrada.maandloon > maximumMaandloon) observaciones.push(`Je loon ligt boven het maximumdagloon. UWV rekent met maximaal ${euro(redondear(maximumMaandloon))} per maand.`);

    let duur = 0;
    if (entrada.wekeneis) {
      if (!entrada.jareneis) {
        duur = duurgrenzen.minimum;
      } else {
        const totaal = entrada.jarenVoor2016 + entrada.jarenVanaf2016;
        const extraVoor2016 = Math.max(0, entrada.jarenVoor2016 - 10);
        const extraVanaf2016 = Math.max(0, totaal - 10) - extraVoor2016;
        const berekend = Math.min(totaal, 10) + extraVoor2016 + extraVanaf2016 / 2;
        duur = Math.min(Math.max(berekend, duurgrenzen.minimum), duurgrenzen.maximum);
      }
    }
    const eerste = redondear(porcentaje(wwMaandloon, enMapa(v["nl.ww-percentages"], "eerste-twee-maanden")));
    const daarna = redondear(porcentaje(wwMaandloon, enMapa(v["nl.ww-percentages"], "daarna")));
    const totaal = duur === 0 ? 0 : redondear(eerste * Math.min(2, duur) + daarna * Math.max(0, duur - 2));
    if (duur > 0) observaciones.push("Dit is een schatting. UWV berekent je dagloon met je sv-loon en het precieze aantal werkdagen, en controleert je arbeidsverleden.");
    return {
      eerste: duur > 0 ? eerste : 0,
      daarna: duur > 2 ? daarna : 0,
      duur,
      totaal,
      wwMaandloon: redondear(wwMaandloon),
      observaciones,
    };
  },
  resultado: [
    { clave: "eerste", etiqueta: "WW per maand, eerste 2 maanden (bruto)", formato: "moneda", destacada: true },
    { clave: "daarna", etiqueta: "WW per maand vanaf de derde maand (bruto)", formato: "moneda" },
    { clave: "duur", etiqueta: "Duur van je WW-uitkering", formato: "meses", decimales: 1 },
    { clave: "totaal", etiqueta: "Totaal over de hele periode (bruto)", formato: "moneda" },
    { clave: "wwMaandloon", etiqueta: "WW-maandloon waarmee is gerekend", formato: "moneda" },
  ],
});
