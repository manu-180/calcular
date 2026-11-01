import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { KIRKOT, kirkollisvero, laskeVerot, REQ_VEROT, type Kirkko } from "../lib/verot";

export default definirCalculadora({
  id: "fi.kunnallisverolaskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "kunnallisverolaskuri",
  estado: "publicado",
  requiere: {
    ...REQ_VEROT,
    "fi.kunnallisvero": "mapa",
    "fi.kirkollisvero-evl": "mapa",
    "fi.kirkollisvero-ort": "mapa",
  },
  campos: [
    { id: "palkka", tipo: "moneda", etiqueta: "Palkka vuodessa (brutto)", min: 0, porDefecto: 40000 },
    { id: "kunta", tipo: "opcion-dato", dato: "fi.kunnallisvero", etiqueta: "Kotikunta", porDefecto: "helsinki" },
    { id: "vertailu", tipo: "opcion-dato", dato: "fi.kunnallisvero", etiqueta: "Vertailukunta", porDefecto: "tampere" },
    { id: "kirkko", tipo: "opcion", etiqueta: "Kirkon jäsenyys", opciones: KIRKOT, porDefecto: "ei" },
  ],
  calcular(e, v, { redondear }) {
    if (e.palkka <= 0) throw new ErrorEntrada("Syötä palkka, joka on suurempi kuin nolla.", "palkka");
    const laske = (kunta: string, kirkko: Kirkko) =>
      laskeVerot(
        { palkka: e.palkka, elake: 0, etuus: 0 },
        {
          ika: "18-64",
          lapset: 0,
          yksinhuoltaja: false,
          kunnallisvero: enMapa(v["fi.kunnallisvero"], kunta),
          kirkollisvero: kirkollisvero(kirkko, kunta, v["fi.kirkollisvero-evl"], v["fi.kirkollisvero-ort"]),
        },
        v,
        redondear,
      );
    const a = laske(e.kunta, e.kirkko);
    const b = laske(e.vertailu, e.kirkko);
    const observaciones = ["Laskelma koskee 18-64-vuotiasta palkansaajaa ilman muita tuloja ja vähennyksiä."];
    if (a.kunta < redondear((a.verotettava * enMapa(v["fi.kunnallisvero"], e.kunta)) / 100)) {
      observaciones.push("Osa työtulovähennyksestä tehtiin kunnallisverosta, koska valtion vero ei riittänyt siihen.");
    }
    return {
      kunnallisvero: a.kunta,
      prosentti: enMapa(v["fi.kunnallisvero"], e.kunta),
      kirkollisvero: a.kirkko,
      verotYhteensa: a.yhteensa,
      vertailuKunnallisvero: b.kunta,
      vertailuProsentti: enMapa(v["fi.kunnallisvero"], e.vertailu),
      vertailuVerot: b.yhteensa,
      erotus: redondear(b.yhteensa - a.yhteensa),
      observaciones,
    };
  },
  resultado: [
    { clave: "kunnallisvero", etiqueta: "Kunnallisvero vuodessa", formato: "moneda", destacada: true },
    { clave: "prosentti", etiqueta: "Kotikunnan tuloveroprosentti", formato: "porcentaje", decimales: 2 },
    { clave: "kirkollisvero", etiqueta: "Kirkollisvero vuodessa", formato: "moneda", ocultarSiCero: true },
    { clave: "verotYhteensa", etiqueta: "Kaikki verot vuodessa kotikunnassa", formato: "moneda" },
    { clave: "vertailuKunnallisvero", etiqueta: "Kunnallisvero vertailukunnassa", formato: "moneda" },
    { clave: "vertailuProsentti", etiqueta: "Vertailukunnan tuloveroprosentti", formato: "porcentaje", decimales: 2 },
    { clave: "vertailuVerot", etiqueta: "Kaikki verot vuodessa vertailukunnassa", formato: "moneda" },
    { clave: "erotus", etiqueta: "Vertailukunnassa maksaisit enemmän (miinus: vähemmän)", formato: "moneda" },
  ],
});
