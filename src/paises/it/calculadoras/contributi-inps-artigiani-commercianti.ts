import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.contributi-artigiani-commercianti",
  mercado: "it",
  concepto: "propio",
  slug: "contributi-inps-artigiani-commercianti",
  estado: "publicado",
  requiere: {
    "it.aliquote-artigiani-commercianti": "mapa",
    "it.minimale-autonomi": "numero",
    "it.fascia-pensionabile": "numero",
    "it.aliquota-aggiuntiva": "numero",
    "it.massimale-contributivo": "numero",
    "it.massimale-ante-1996": "numero",
    "it.maternita-autonomi": "numero",
    "it.riduzione-forfettari": "numero",
  },
  campos: [
    { id: "gestione", tipo: "opcion-dato", dato: "it.aliquote-artigiani-commercianti", etiqueta: "Gestione INPS", porDefecto: "artigiano" },
    { id: "reddito", tipo: "moneda", etiqueta: "Reddito d'impresa dell'anno", min: 0, porDefecto: 30000 },
    { id: "ante1996", tipo: "si-no", etiqueta: "Hai contributi versati prima del 1996?", porDefecto: false },
    { id: "forfettario", tipo: "si-no", etiqueta: "Sei nel regime forfettario e hai chiesto la riduzione contributiva?", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.reddito < 0) throw new ErrorEntrada("Il reddito non può essere negativo.", "reddito");
    const aliquota = enMapa(v["it.aliquote-artigiani-commercianti"], e.gestione);
    const minimale = v["it.minimale-autonomi"];
    const fascia = v["it.fascia-pensionabile"];
    const massimale = e.ante1996 ? v["it.massimale-ante-1996"] : v["it.massimale-contributivo"];
    const base = Math.min(Math.max(e.reddito, minimale), massimale);
    const ivsPieno = redondear(porcentaje(Math.min(base, fascia), aliquota) + porcentaje(Math.max(0, base - fascia), aliquota + v["it.aliquota-aggiuntiva"]));
    const riduzione = e.forfettario ? redondear(porcentaje(ivsPieno, v["it.riduzione-forfettari"])) : 0;
    const ivs = redondear(ivsPieno - riduzione);
    const fisso = redondear(porcentaje(minimale, aliquota) * (e.forfettario ? 1 - v["it.riduzione-forfettari"] / 100 : 1));
    const maternita = redondear(v["it.maternita-autonomi"] * 12);
    const observaciones: string[] = [];
    if (e.reddito < minimale) observaciones.push("Il contributo sul minimale è dovuto anche se il reddito è più basso.");
    if (e.reddito > massimale) observaciones.push("Oltre il massimale non si pagano contributi: il calcolo si ferma lì.");
    return {
      totale: redondear(ivs + maternita),
      fisso: redondear(fisso + maternita),
      eccedenza: redondear(ivs - fisso),
      riduzione,
      aliquota,
      observaciones,
    };
  },
  resultado: [
    { clave: "totale", etiqueta: "Contributi INPS dell'anno", formato: "moneda", destacada: true },
    { clave: "fisso", etiqueta: "Contributi fissi sul minimale (4 rate)", formato: "moneda" },
    { clave: "eccedenza", etiqueta: "Contributi sul reddito oltre il minimale", formato: "moneda" },
    { clave: "riduzione", etiqueta: "Riduzione per il regime forfettario", formato: "moneda", ocultarSiCero: true },
    { clave: "aliquota", etiqueta: "Aliquota fino alla prima fascia", formato: "porcentaje" },
  ],
});
