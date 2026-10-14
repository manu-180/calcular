import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.charges-micro-entrepreneur",
  mercado: "fr",
  concepto: "regimen-simplificado",
  slug: "charges-micro-entrepreneur",
  estado: "publicado",
  requiere: {
    "fr.micro-cotisations": "mapa",
    "fr.micro-versement-liberatoire": "mapa",
  },
  campos: [
    { id: "activite", tipo: "opcion-dato", etiqueta: "Activité", dato: "fr.micro-cotisations", porDefecto: "services" },
    { id: "chiffreAffaires", tipo: "moneda", etiqueta: "Chiffre d'affaires encaissé", min: 0, porDefecto: 3000, ayuda: "Sur le mois ou le trimestre que vous déclarez." },
    { id: "versementLiberatoire", tipo: "si-no", etiqueta: "Vous avez opté pour le versement libératoire de l'impôt", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.chiffreAffaires <= 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires supérieur à zéro.", "chiffreAffaires");
    const tauxCotisations = enMapa(valores["fr.micro-cotisations"], entrada.activite);
    const tauxVl = entrada.versementLiberatoire ? enMapa(valores["fr.micro-versement-liberatoire"], entrada.activite) : 0;
    const cotisations = redondear(porcentaje(entrada.chiffreAffaires, tauxCotisations));
    const impot = redondear(porcentaje(entrada.chiffreAffaires, tauxVl));
    const total = redondear(cotisations + impot);
    return {
      tauxCotisations,
      cotisations,
      tauxVl,
      impot,
      total,
      tauxGlobal: redondear(tauxCotisations + tauxVl),
      reste: redondear(entrada.chiffreAffaires - total),
      observaciones: [
        "Le reste ne tient pas compte de vos frais (achats, matériel, déplacements) ni de la contribution à la formation professionnelle.",
        ...(entrada.versementLiberatoire ? [] : ["Sans versement libératoire, votre bénéfice est imposé au barème de l'impôt sur le revenu, après un abattement forfaitaire pour frais."]),
      ],
    };
  },
  resultado: [
    { clave: "tauxCotisations", etiqueta: "Taux des cotisations sociales", formato: "porcentaje" },
    { clave: "cotisations", etiqueta: "Cotisations sociales à payer", formato: "moneda", destacada: true },
    { clave: "tauxVl", etiqueta: "Taux du versement libératoire", formato: "porcentaje", ocultarSiCero: true },
    { clave: "impot", etiqueta: "Versement libératoire de l'impôt", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total prélevé par l'Urssaf", formato: "moneda" },
    { clave: "tauxGlobal", etiqueta: "Taux global", formato: "porcentaje" },
    { clave: "reste", etiqueta: "Reste sur le chiffre d'affaires", formato: "moneda" },
  ],
});
