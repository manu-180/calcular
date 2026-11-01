import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { izracunPlace, olajsavaOtroci, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.olajsava-za-otroke",
  mercado: "si",
  concepto: "propio",
  slug: "olajsava-za-otroke",
  estado: "publicado",
  requiere: { ...REQ_PLACA },
  campos: [
    { id: "otroci", tipo: "entero", etiqueta: "Število vzdrževanih otrok", min: 1, max: 15, porDefecto: 2 },
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto plača", min: 0, porDefecto: 2500 },
  ],
  calcular(e, v, { redondear }) {
    if (e.otroci < 1) throw new ErrorEntrada("Vnesite vsaj enega otroka.", "otroci");
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    const letna = redondear(olajsavaOtroci(e.otroci, v["si.olajsava-otroci"]));
    const brez = izracunPlace(e.bruto, { otroci: 0, do29: false, delez: 100 }, v, redondear);
    const z = izracunPlace(e.bruto, { otroci: e.otroci, do29: false, delez: 100 }, v, redondear);
    return { letna, mesecna: redondear(letna / 12), prihranek: redondear(brez.akontacija - z.akontacija), letniPrihranek: redondear((brez.akontacija - z.akontacija) * 12), neto: z.neto };
  },
  resultado: [
    { clave: "letna", etiqueta: "Letna olajšava za otroke", formato: "moneda", destacada: true },
    { clave: "mesecna", etiqueta: "Olajšava na mesec", formato: "moneda" },
    { clave: "prihranek", etiqueta: "Manj akontacije na mesec", formato: "moneda" },
    { clave: "letniPrihranek", etiqueta: "Manj dohodnine na leto", formato: "moneda" },
    { clave: "neto", etiqueta: "Neto plača z olajšavo", formato: "moneda" },
  ],
});
