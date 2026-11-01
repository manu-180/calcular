import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.droits-de-mutation",
  mercado: "cm",
  concepto: "propio",
  slug: "droits-de-mutation",
  estado: "publicado",
  requiere: { "cm.droits-mutation": "mapa" },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix de vente du bien", min: 0, porDefecto: 30000000 },
    { id: "nature", tipo: "opcion-dato", etiqueta: "Nature du bien", dato: "cm.droits-mutation", porDefecto: "urbain-bati" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prix <= 0) throw new ErrorEntrada("Indiquez un prix supérieur à zéro.", "prix");
    const taux = enMapa(v["cm.droits-mutation"], entrada.nature);
    const droits = redondear(porcentaje(entrada.prix, taux));
    return { taux, droits, total: entrada.prix + droits };
  },
  resultado: [
    { clave: "droits", etiqueta: "Droit de mutation", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "total", etiqueta: "Prix plus droit de mutation", formato: "moneda" },
  ],
});
