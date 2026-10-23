import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.calcul-contribution-fonciere",
  mercado: "sn",
  concepto: "propio",
  slug: "calcul-contribution-fonciere",
  estado: "publicado",
  requiere: { "sn.contribution-fonciere": "mapa" },
  campos: [
    { id: "type", tipo: "opcion", etiqueta: "Type de propriété", opciones: [{ valor: "batie", etiqueta: "Propriété bâtie (sur la valeur locative)" }, { valor: "non-batie", etiqueta: "Terrain non bâti (sur la valeur vénale)" }], porDefecto: "batie" },
    { id: "valeur", tipo: "moneda", etiqueta: "Valeur de base", min: 0, porDefecto: 3600000, ayuda: "Pour une propriété bâtie, la valeur locative annuelle ; pour un terrain, sa valeur vénale." },
  ],
  calcular(e, v, { redondear }) {
    if (e.valeur <= 0) throw new ErrorEntrada("Inscrivez une valeur supérieure à zéro.", "valeur");
    const taux = v["sn.contribution-fonciere"][e.type];
    return { contribution: redondear(porcentaje(e.valeur, taux)), taux };
  },
  resultado: [
    { clave: "contribution", etiqueta: "Contribution foncière de l'année", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
  ],
});
