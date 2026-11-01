import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.droit-enregistrement-bail",
  mercado: "mg",
  concepto: "propio",
  slug: "droit-enregistrement-bail",
  estado: "publicado",
  requiere: { "mg.droit-bail": "mapa" },
  campos: [
    { id: "usage", tipo: "opcion-dato", dato: "mg.droit-bail", etiqueta: "Type de bail", porDefecto: "habitation" },
    { id: "loyer", tipo: "moneda", etiqueta: "Loyer mensuel", min: 0, porDefecto: 800000 },
    { id: "charges", tipo: "moneda", etiqueta: "Charges mensuelles payées par le locataire", min: 0, porDefecto: 0, ayuda: "Charges imposées au preneur par le contrat, en plus du loyer." },
    { id: "mois", tipo: "entero", etiqueta: "Durée du bail en mois", min: 1, max: 1200, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.loyer <= 0) throw new ErrorEntrada("Indiquez un loyer supérieur à zéro.", "loyer");
    const taux = v["mg.droit-bail"][e.usage];
    if (taux === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const base = (e.loyer + e.charges) * e.mois;
    return { droit: redondear(porcentaje(base, taux)), base, taux };
  },
  resultado: [
    { clave: "droit", etiqueta: "Droit d'enregistrement du bail", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Loyers et charges sur toute la durée", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
  ],
});
