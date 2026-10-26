import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { parametryOsvc, REQUIERE_OSVC, rokOsvc } from "../lib/osvc";

export default definirCalculadora({
  id: "cz.pausalni-vydaje",
  mercado: "cz",
  concepto: "impuesto-renta",
  slug: "pausalni-vydaje",
  estado: "publicado",
  requiere: REQUIERE_OSVC,
  campos: [
    { id: "prijmy", tipo: "moneda", etiqueta: "Příjmy z podnikání za rok", min: 0, porDefecto: 1000000 },
    { id: "typ", tipo: "opcion-dato", dato: "cz.pausalni-vydaje", etiqueta: "Paušální výdaje", porDefecto: "zivnost" },
    {
      id: "cinnost",
      tipo: "opcion",
      etiqueta: "Podnikání je",
      opciones: [
        { valor: "hlavni", etiqueta: "Hlavní činnost" },
        { valor: "vedlejsi", etiqueta: "Vedlejší činnost (vedle zaměstnání, studia, důchodu)" },
      ],
      porDefecto: "hlavni",
    },
    { id: "mesice", tipo: "entero", etiqueta: "Počet měsíců podnikání v roce", min: 1, max: 12, porDefecto: 12 },
    { id: "deti", tipo: "entero", etiqueta: "Počet dětí, na které uplatňujete zvýhodnění", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.prijmy <= 0) throw new ErrorEntrada("Zadejte příjmy vyšší než nula.", "prijmy");
    const r = rokOsvc(e.prijmy, e.cinnost, e.mesice, e.deti, parametryOsvc(v, e.typ, e.cinnost));
    const observaciones: string[] = [];
    if (e.prijmy * (v["cz.pausalni-vydaje"][e.typ] ?? 0) / 100 > (v["cz.pausalni-vydaje-limit"][e.typ] ?? 0)) {
      observaciones.push("Paušální výdaje jsou omezené stropem, proto jsou nižší než procento z příjmů.");
    }
    if (e.cinnost === "vedlejsi" && !r.pojistenaVedlejsi) {
      observaciones.push("Základ daně z vedlejší činnosti nedosáhl rozhodné částky, proto se sociální pojištění neplatí.");
    }
    if (e.cinnost === "hlavni" && r.vzSocialni === v["cz.osvc-min-vz-socialni"].hlavni * e.mesice) {
      observaciones.push("Sociální pojištění vychází z minimálního vyměřovacího základu.");
    }
    observaciones.push("Výpočet předpokládá, že nemáte jiné zdanitelné příjmy a slevu na poplatníka uplatňujete v daňovém přiznání.");
    return {
      celkem: redondear(r.celkem),
      mesicne: redondear(r.celkem / 12),
      vydaje: redondear(r.vydaje),
      zakladDane: redondear(r.zakladDane),
      danPredSlevou: r.danPredSlevou,
      slevaPoplatnik: r.slevaPoplatnik,
      slevaDeti: r.slevaDeti,
      bonus: r.bonus > 0 ? r.bonus : null,
      dan: r.dan,
      socialni: r.socialni,
      zdravotni: r.zdravotni,
      zbyva: redondear(e.prijmy - r.celkem),
      observaciones,
    };
  },
  resultado: [
    { clave: "celkem", etiqueta: "Daň a pojištění za rok celkem", formato: "moneda", destacada: true },
    { clave: "mesicne", etiqueta: "Průměrně za měsíc", formato: "moneda" },
    { clave: "vydaje", etiqueta: "Paušální výdaje", formato: "moneda" },
    { clave: "zakladDane", etiqueta: "Základ daně", formato: "moneda" },
    { clave: "danPredSlevou", etiqueta: "Daň před slevami", formato: "moneda" },
    { clave: "slevaPoplatnik", etiqueta: "Sleva na poplatníka", formato: "moneda", ocultarSiCero: true },
    { clave: "slevaDeti", etiqueta: "Sleva na děti", formato: "moneda", ocultarSiCero: true },
    { clave: "bonus", etiqueta: "Daňový bonus na děti", formato: "moneda" },
    { clave: "dan", etiqueta: "Daň z příjmů k zaplacení", formato: "moneda" },
    { clave: "socialni", etiqueta: "Sociální pojištění za rok", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Zdravotní pojištění za rok", formato: "moneda" },
    { clave: "zbyva", etiqueta: "Zůstane z příjmů po dani a pojištění", formato: "moneda" },
  ],
});
