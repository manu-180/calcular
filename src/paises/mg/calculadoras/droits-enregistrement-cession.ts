import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.droits-enregistrement-cession",
  mercado: "mg",
  concepto: "propio",
  slug: "droits-enregistrement-cession",
  estado: "publicado",
  requiere: { "mg.droit-cession": "mapa" },
  campos: [
    { id: "bien", tipo: "opcion-dato", dato: "mg.droit-cession", etiqueta: "Ce qui est vendu", porDefecto: "meubles" },
    { id: "prix", tipo: "moneda", etiqueta: "Prix de cession", min: 0, porDefecto: 30000000, ayuda: "Prix augmenté des charges reprises par l'acheteur." },
  ],
  calcular(e, v, { redondear }) {
    if (e.prix <= 0) throw new ErrorEntrada("Indiquez un prix supérieur à zéro.", "prix");
    const taux = v["mg.droit-cession"][e.bien];
    if (taux === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const observaciones: string[] = [];
    if (e.bien === "meubles") observaciones.push("Pour une voiture, la base ne peut pas être inférieure à la valeur minimale fixée par le ministère chargé de la réglementation fiscale.");
    if (e.bien === "parts") observaciones.push("L'administration évalue les titres avec sa table financière selon l'activité de la société.");
    return { droits: redondear(porcentaje(e.prix, taux)), taux, observaciones };
  },
  resultado: [
    { clave: "droits", etiqueta: "Droits d'enregistrement", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 1 },
  ],
});
