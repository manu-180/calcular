import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.droits-enregistrement",
  mercado: "lu",
  concepto: "propio",
  slug: "droits-enregistrement",
  estado: "publicado",
  requiere: { "lu.droits-enregistrement": "numero", "lu.droits-transcription": "numero", "lu.bellegen-akt": "numero", "lu.droits-minimum": "numero" },
  campos: [
    { id: "prix", tipo: "moneda", etiqueta: "Prix d'achat du bien", min: 0, porDefecto: 750000 },
    { id: "habitation", tipo: "si-no", etiqueta: "Pour votre habitation principale (Bëllegen Akt)", porDefecto: true },
    { id: "acquereurs", tipo: "entero", etiqueta: "Nombre d'acquéreurs qui demandent le crédit d'impôt", min: 1, max: 4, porDefecto: 2 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!Number.isInteger(entrada.acquereurs) || entrada.acquereurs < 1 || entrada.acquereurs > 4) throw new ErrorEntrada("Indiquez entre 1 et 4 acquéreurs.", "acquereurs");
    const enregistrement = redondear((entrada.prix * valores["lu.droits-enregistrement"]) / 100);
    const transcription = redondear((entrada.prix * valores["lu.droits-transcription"]) / 100);
    const droits = redondear(enregistrement + transcription);
    const minimum = valores["lu.droits-minimum"];
    const plafond = entrada.habitation ? valores["lu.bellegen-akt"] * entrada.acquereurs : 0;
    const credit = entrada.habitation ? Math.max(Math.min(plafond, droits - minimum), 0) : 0;
    return {
      apayer: redondear(droits - credit),
      droits,
      enregistrement,
      transcription,
      credit,
      observaciones: entrada.habitation
        ? ["Le crédit d'impôt suppose d'occuper personnellement le bien pendant au moins deux ans. L'administration perçoit dans tous les cas au moins 100 euros."]
        : [],
    };
  },
  resultado: [
    { clave: "apayer", etiqueta: "Droits à payer", formato: "moneda", destacada: true },
    { clave: "droits", etiqueta: "Droits avant crédit d'impôt", formato: "moneda" },
    { clave: "enregistrement", etiqueta: "Droits d'enregistrement", formato: "moneda" },
    { clave: "transcription", etiqueta: "Droits de transcription", formato: "moneda" },
    { clave: "credit", etiqueta: "Crédit d'impôt Bëllegen Akt utilisé", formato: "moneda", ocultarSiCero: true },
  ],
});
