import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.droits-de-mutation-immobiliere",
  mercado: "mg",
  concepto: "propio",
  slug: "droits-de-mutation-immobiliere",
  estado: "publicado",
  requiere: {
    "mg.droit-mutation-immeuble": "numero",
    "mg.ipvi-taux": "numero",
    "mg.ipvi-prix-revient": "numero",
  },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix de vente du terrain ou de la maison", min: 0, porDefecto: 150000000 },
    { id: "charges", tipo: "moneda", etiqueta: "Charges ajoutées au prix", min: 0, porDefecto: 0, ayuda: "Dettes du vendeur reprises par l'acheteur ou indemnités versées au vendeur." },
    { id: "vendeurParticulier", tipo: "si-no", etiqueta: "Le vendeur est un particulier", porDefecto: true, ayuda: "Il paie alors l'IPVI sur la vente." },
  ],
  calcular(e, v, { redondear }) {
    if (e.prix <= 0) throw new ErrorEntrada("Indiquez un prix supérieur à zéro.", "prix");
    const base = e.prix + e.charges;
    const droits = redondear(porcentaje(base, v["mg.droit-mutation-immeuble"]));
    const ipvi = e.vendeurParticulier ? redondear(porcentaje(e.prix - porcentaje(e.prix, v["mg.ipvi-prix-revient"]), v["mg.ipvi-taux"])) : null;
    return {
      droits,
      base,
      coutAcheteur: redondear(base + droits),
      ipvi,
      observaciones: ["Les frais de notaire et les frais de la conservation foncière s'ajoutent et ne sont pas compris ici."],
    };
  },
  resultado: [
    { clave: "droits", etiqueta: "Droits d'enregistrement (acheteur)", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base des droits", formato: "moneda" },
    { clave: "coutAcheteur", etiqueta: "Prix et droits", formato: "moneda" },
    { clave: "ipvi", etiqueta: "IPVI à la charge du vendeur", formato: "moneda" },
  ],
});
