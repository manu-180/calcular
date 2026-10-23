import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.droits-enregistrement",
  mercado: "ma",
  concepto: "propio",
  slug: "droits-enregistrement",
  estado: "publicado",
  requiere: {
    "ma.droits-enregistrement": "mapa",
    "ma.droits-enregistrement-minimum": "numero",
  },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix d'acquisition", min: 0, porDefecto: 900000 },
    {
      id: "bien",
      tipo: "opcion",
      etiqueta: "Bien acquis",
      opciones: [
        { valor: "locaux-construits", etiqueta: "Logement ou local construit (habitation, commerce, bureau)" },
        { valor: "terrains-nus", etiqueta: "Terrain nu ou construction destinée à être démolie" },
      ],
      porDefecto: "locaux-construits",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prix <= 0) throw new ErrorEntrada("Indiquez un prix supérieur à zéro.", "prix");
    const taux = v["ma.droits-enregistrement"][entrada.bien];
    const droits = Math.max(redondear(porcentaje(entrada.prix, taux)), v["ma.droits-enregistrement-minimum"]);
    return {
      droits,
      taux,
      observaciones: [
        "Ce montant ne comprend que les droits d'enregistrement. Les frais de conservation foncière, les honoraires du notaire ou de l'adoul et les éventuels droits supplémentaires s'y ajoutent.",
      ],
    };
  },
  resultado: [
    { clave: "droits", etiqueta: "Droits d'enregistrement", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
