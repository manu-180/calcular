import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.calcul-tva",
  mercado: "mg",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "mg.tva": "mapa", "mg.tva-seuil": "numero" },
  campos: [
    { id: "operation", tipo: "opcion", etiqueta: "Ce que vous voulez faire", opciones: [{ valor: "ajouter", etiqueta: "Passer du HT au TTC" }, { valor: "retirer", etiqueta: "Passer du TTC au HT" }], porDefecto: "ajouter" },
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 100000 },
    { id: "taux", tipo: "opcion-dato", dato: "mg.tva", etiqueta: "Taux", porDefecto: "normal" },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const t = v["mg.tva"][e.taux];
    if (t === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const ht = e.operation === "retirer" ? redondear(e.montant / (1 + t / 100)) : redondear(e.montant);
    const tva = e.operation === "retirer" ? redondear(e.montant - ht) : redondear(porcentaje(ht, t));
    return { ttc: redondear(ht + tva), ht, tva, taux: t };
  },
  resultado: [
    { clave: "ttc", etiqueta: "Prix TTC", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Prix HT", formato: "moneda" },
    { clave: "tva", etiqueta: "TVA", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
  ],
});
