import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.vanemahuvitis",
  mercado: "ee",
  concepto: "propio",
  slug: "vanemahuvitis",
  estado: "publicado",
  requiere: {
    "ee.vanemahuvitis-ulempiir": "numero",
    "ee.vanemahuvitis-maar": "numero",
    "ee.vanemahuvitis-paevad": "numero",
    "ee.miinimumpalk-kuu": "numero",
    "ee.tulumaks": "numero",
    "ee.maksuvaba-kuu": "numero",
  },
  campos: [
    { id: "tulu", tipo: "moneda", etiqueta: "Keskmine sotsiaalmaksuga maksustatud kuutulu arvestusperioodil", ayuda: "Lapse (eeldatavale) sünnikuule eelnenud 21 kuud, millest jäetakse välja viimased 9 kuud. Kui tulu ei olnud, sisesta 0.", min: 0, porDefecto: 2000 },
    { id: "maksuvaba", tipo: "si-no", etiqueta: "Maksuvaba tulu rakendatakse hüvitisele", porDefecto: true },
    { id: "paevad", tipo: "entero", etiqueta: "Mitu kalendripäeva hüvitist arvutad", min: 1, max: 605, porDefecto: 605 },
  ],
  calcular(e, v, { redondear }) {
    if (e.tulu < 0) throw new ErrorEntrada("Tulu ei saa olla negatiivne.", "tulu");
    if (e.paevad > v["ee.vanemahuvitis-paevad"]) throw new ErrorEntrada("Vanemahüvitist makstakse lapse kohta kuni 605 kalendripäeva.", "paevad");
    const alam = v["ee.miinimumpalk-kuu"];
    const ulem = v["ee.vanemahuvitis-ulempiir"];
    const kuu = e.tulu === 0 ? v["ee.vanemahuvitis-maar"] : Math.min(Math.max(e.tulu, alam), ulem);
    const mv = e.maksuvaba ? Math.min(v["ee.maksuvaba-kuu"], kuu) : 0;
    const neto = redondear(kuu - porcentaje(kuu - mv, v["ee.tulumaks"]));
    return {
      kuu: redondear(kuu),
      neto,
      paevas: redondear(kuu / 30),
      kokku: redondear((kuu / 30) * e.paevad),
      ulempiir: ulem,
      miinimum: alam,
    };
  },
  resultado: [
    { clave: "kuu", etiqueta: "Vanemahüvitis kuus bruto", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pärast tulumaksu kuus", formato: "moneda" },
    { clave: "paevas", etiqueta: "Hüvitis kalendripäevas", formato: "moneda" },
    { clave: "kokku", etiqueta: "Kokku valitud päevade eest bruto", formato: "moneda" },
    { clave: "ulempiir", etiqueta: "Ülempiir kuus", formato: "moneda" },
    { clave: "miinimum", etiqueta: "Töötasu alammäär, millest hüvitis töötaval vanemal ei lange", formato: "moneda" },
  ],
});
