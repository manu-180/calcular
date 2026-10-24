import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.allocations-familiales",
  mercado: "lu",
  concepto: "propio",
  slug: "allocations-familiales",
  estado: "publicado",
  requiere: { "lu.allocation-familiale": "numero", "lu.majoration-age": "mapa", "lu.allocation-rentree": "mapa" },
  campos: [
    { id: "moins6", tipo: "entero", etiqueta: "Enfants de moins de 6 ans", min: 0, max: 15, porDefecto: 1 },
    { id: "de6a11", tipo: "entero", etiqueta: "Enfants de 6 à 11 ans", min: 0, max: 15, porDefecto: 1 },
    { id: "plus12", tipo: "entero", etiqueta: "Enfants de 12 ans et plus", min: 0, max: 15, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    for (const champ of ["moins6", "de6a11", "plus12"] as const) {
      const n = entrada[champ];
      if (!Number.isInteger(n) || n < 0 || n > 15) throw new ErrorEntrada("Indiquez un nombre entre 0 et 15.", champ);
    }
    const enfants = entrada.moins6 + entrada.de6a11 + entrada.plus12;
    const base = valores["lu.allocation-familiale"];
    const maj = valores["lu.majoration-age"];
    const rentreeMap = valores["lu.allocation-rentree"];
    const mensuel = redondear(base * enfants + enMapa(maj, "6-11") * entrada.de6a11 + enMapa(maj, "12-plus") * entrada.plus12);
    const rentree = redondear(enMapa(rentreeMap, "6-11") * entrada.de6a11 + enMapa(rentreeMap, "12-plus") * entrada.plus12);
    return {
      mensuel,
      annuel: redondear(mensuel * 12),
      rentree,
      total: redondear(mensuel * 12 + rentree),
      observaciones: ["Montants du nouveau système (enfants ouvrant droit depuis le 1er août 2016). Le droit et sa durée sont vérifiés par la Caisse pour l'avenir des enfants."],
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "Allocations familiales par mois", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Sur douze mois", formato: "moneda" },
    { clave: "rentree", etiqueta: "Allocation de rentrée scolaire (une fois par an)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total annuel", formato: "moneda" },
  ],
});
