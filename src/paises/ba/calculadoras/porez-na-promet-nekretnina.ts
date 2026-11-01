import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ba.porez-na-promet-nekretnina",
  mercado: "ba",
  concepto: "propio",
  slug: "porez-na-promet-nekretnina",
  estado: "publicado",
  requiere: { "ba.promet-kanton": "mapa" },
  campos: [
    { id: "kanton", tipo: "opcion-dato", etiqueta: "Kanton u kojem je nekretnina", dato: "ba.promet-kanton", porDefecto: "ks" },
    { id: "cijena", tipo: "moneda", etiqueta: "Tržišna vrijednost nekretnine", min: 0, porDefecto: 200000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.cijena <= 0) throw new ErrorEntrada("Unesite vrijednost veću od nule.", "cijena");
    const stopa = enMapa(v["ba.promet-kanton"], e.kanton);
    const observaciones = e.kanton === "usk" || e.kanton === "hnk" ? ["Tu je zakonom propisana najviša stopa. Općinsko ili gradsko vijeće može odrediti nižu."] : [];
    return { porez: redondear((e.cijena * stopa) / 100), stopa, ukupno: redondear(e.cijena + (e.cijena * stopa) / 100), observaciones };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na promet nekretnina", formato: "moneda", destacada: true },
    { clave: "stopa", etiqueta: "Stopa", formato: "porcentaje", decimales: 0 },
    { clave: "ukupno", etiqueta: "Vrijednost zajedno s porezom", formato: "moneda" },
  ],
});
