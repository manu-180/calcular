import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.taxe-fonciere",
  mercado: "tg",
  concepto: "propio",
  slug: "taxe-fonciere",
  estado: "publicado",
  requiere: { "tg.taxe-fonciere": "mapa" },
  campos: [
    {
      id: "propriete",
      tipo: "opcion",
      etiqueta: "Propriété",
      opciones: [
        { valor: "bati", etiqueta: "Propriété bâtie (maison, immeuble, local)" },
        { valor: "non-bati", etiqueta: "Terrain non bâti" },
      ],
      porDefecto: "bati",
    },
    {
      id: "valeurLocative",
      tipo: "moneda",
      etiqueta: "Valeur locative cadastrale annuelle",
      min: 0,
      porDefecto: 1200000,
      ayuda: "Le loyer annuel normal du bien, tel que l'évalue le cadastre.",
      visibleSi: { propriete: ["bati"] },
    },
    {
      id: "valeurVenale",
      tipo: "moneda",
      etiqueta: "Valeur vénale du terrain",
      min: 0,
      porDefecto: 10000000,
      ayuda: "Le prix auquel le terrain pourrait se vendre au 1er janvier, selon le cadastre.",
      visibleSi: { propriete: ["non-bati"] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    const t = v["tg.taxe-fonciere"];
    if (entrada.propriete === "bati") {
      const valeur = entrada.valeurLocative ?? 0;
      if (valeur <= 0) throw new ErrorEntrada("Indiquez une valeur locative supérieure à zéro.", "valeurLocative");
      const base = redondear(valeur - porcentaje(valeur, t["abattement-bati"]));
      return { taxe: redondear(porcentaje(base, t.bati)), base, taux: t.bati };
    }
    const valeur = entrada.valeurVenale ?? 0;
    if (valeur <= 0) throw new ErrorEntrada("Indiquez une valeur vénale supérieure à zéro.", "valeurVenale");
    return { taxe: redondear(porcentaje(valeur, t["non-bati"])), base: valeur, taux: t["non-bati"] };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe foncière de l'année", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base d'imposition", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 1 },
  ],
});
