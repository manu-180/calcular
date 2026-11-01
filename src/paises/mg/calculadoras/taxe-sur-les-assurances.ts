import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.taxe-sur-les-assurances",
  mercado: "mg",
  concepto: "propio",
  slug: "taxe-sur-les-assurances",
  estado: "publicado",
  requiere: { "mg.taxe-assurance": "mapa" },
  campos: [
    { id: "contrat", tipo: "opcion-dato", dato: "mg.taxe-assurance", etiqueta: "Type de contrat", porDefecto: "autres" },
    { id: "prime", tipo: "moneda", etiqueta: "Prime hors taxe", min: 0, porDefecto: 500000, ayuda: "Somme versée à l'assureur, accessoires compris." },
  ],
  calcular(e, v, { redondear }) {
    if (e.prime <= 0) throw new ErrorEntrada("Indiquez une prime supérieure à zéro.", "prime");
    const taux = v["mg.taxe-assurance"][e.contrat];
    if (taux === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const taxe = redondear(porcentaje(e.prime, taux));
    return { taxe, taux, total: redondear(e.prime + taxe) };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur le contrat", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 1 },
    { clave: "total", etiqueta: "Prime toutes taxes", formato: "moneda" },
  ],
});
