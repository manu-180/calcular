import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.yle-vero",
  mercado: "fi",
  concepto: "propio",
  slug: "yle-vero",
  estado: "publicado",
  requiere: {
    "fi.yle-vero": "numero",
    "fi.yle-veron-tuloraja": "numero",
    "fi.yle-veron-enimmaismaara": "numero",
    "fi.tulonhankkimisvahennys": "numero",
  },
  campos: [
    { id: "palkka", tipo: "moneda", etiqueta: "Palkkatulot vuodessa", min: 0, porDefecto: 30000 },
    { id: "muut", tipo: "moneda", etiqueta: "Eläkkeet, etuudet ja pääomatulot vuodessa", min: 0, porDefecto: 0 },
    { id: "taysiIkainen", tipo: "si-no", etiqueta: "Täytät tänä vuonna vähintään 18 vuotta", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    const puhdas = e.palkka - Math.min(v["fi.tulonhankkimisvahennys"], e.palkka) + e.muut;
    const vero = e.taysiIkainen ? redondear(Math.min(v["fi.yle-veron-enimmaismaara"], (v["fi.yle-vero"] / 100) * Math.max(0, puhdas - v["fi.yle-veron-tuloraja"]))) : 0;
    return {
      vero,
      puhdas: redondear(puhdas),
      kuukaudessa: redondear(vero / 12),
      observaciones: e.taysiIkainen ? ["Laskuri vähentää palkasta vain tulonhankkimisvähennyksen. Jos sinulla on muita vähennyksiä, todellinen vero voi olla pienempi."] : ["Alle 18-vuotias ei maksa Yle-veroa."],
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Yle-vero vuodessa", formato: "moneda", destacada: true },
    { clave: "kuukaudessa", etiqueta: "Kuukautta kohden", formato: "moneda" },
    { clave: "puhdas", etiqueta: "Tulot, joista vero lasketaan", formato: "moneda" },
  ],
});
