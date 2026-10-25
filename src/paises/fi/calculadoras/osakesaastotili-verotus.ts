import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { paaomatuloveroLisasta } from "../lib/paaomatulo";

export default definirCalculadora({
  id: "fi.osakesaastotili-verotus",
  mercado: "fi",
  concepto: "propio",
  slug: "osakesaastotili-verotus",
  estado: "publicado",
  requiere: {
    "fi.paaomatulovero": "escala",
    "fi.osakesaastotilin-talletusraja": "numero",
  },
  campos: [
    { id: "talletukset", tipo: "moneda", etiqueta: "Tilille talletettu pääoma (aiempien pääomanostojen jälkeen)", min: 0, porDefecto: 10000 },
    { id: "arvo", tipo: "moneda", etiqueta: "Tilin arvo nyt", min: 0, porDefecto: 15000 },
    { id: "nosto", tipo: "moneda", etiqueta: "Paljonko nostat", min: 0, porDefecto: 1500 },
    { id: "muut", tipo: "moneda", etiqueta: "Muut pääomatulosi samana vuonna", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.arvo <= 0) throw new ErrorEntrada("Syötä tilin arvo, joka on suurempi kuin nolla.", "arvo");
    if (e.nosto > e.arvo) throw new ErrorEntrada("Et voi nostaa enempää kuin tilillä on varoja.", "nosto");
    const tuotto = Math.max(0, e.arvo - e.talletukset);
    const veronalainen = redondear((tuotto / e.arvo) * e.nosto);
    const paaoma = redondear(e.nosto - veronalainen);
    const jaljella = e.nosto >= e.arvo ? 0 : redondear(Math.max(0, e.talletukset - paaoma));
    return {
      vero: redondear(paaomatuloveroLisasta(v["fi.paaomatulovero"], e.muut, veronalainen)),
      veronalainen,
      paaoma,
      jaljella,
      talletusvara: redondear(Math.max(0, v["fi.osakesaastotilin-talletusraja"] - jaljella)),
      observaciones: ["Tilin sisällä tehdyt kaupat ja osingot eivät ole veronalaisia. Vero lasketaan vasta, kun nostat varoja tililtä."],
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Pääomatulovero nostosta", formato: "moneda", destacada: true },
    { clave: "veronalainen", etiqueta: "Nostosta veronalaista tuottoa", formato: "moneda" },
    { clave: "paaoma", etiqueta: "Nostosta verovapaata pääomaa", formato: "moneda" },
    { clave: "jaljella", etiqueta: "Talletettua pääomaa jäljellä noston jälkeen", formato: "moneda" },
    { clave: "talletusvara", etiqueta: "Voit vielä tallettaa", formato: "moneda" },
  ],
});
