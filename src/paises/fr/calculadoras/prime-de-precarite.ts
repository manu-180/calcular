import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.prime-de-precarite",
  mercado: "fr",
  concepto: "propio",
  slug: "prime-de-precarite",
  estado: "publicado",
  requiere: {
    "fr.cdd-indemnite-fin": "numero",
    "fr.cdd-indemnite-fin-reduite": "numero",
    "fr.cdd-conges": "numero",
  },
  campos: [
    { id: "brutTotal", tipo: "moneda", etiqueta: "Rémunération brute totale perçue pendant le CDD", min: 0, porDefecto: 12000 },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "Taux de l'indemnité de fin de contrat",
      opciones: [
        { valor: "normal", etiqueta: "Taux légal" },
        { valor: "reduit", etiqueta: "Taux réduit prévu par ma convention collective" },
      ],
      porDefecto: "normal",
    },
    { id: "congesNonPris", tipo: "si-no", etiqueta: "Il vous reste des congés payés non pris", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.brutTotal <= 0) throw new ErrorEntrada("Indiquez la rémunération brute perçue pendant le contrat.", "brutTotal");
    const taux = entrada.taux === "reduit" ? valores["fr.cdd-indemnite-fin-reduite"] : valores["fr.cdd-indemnite-fin"];
    const prime = redondear(porcentaje(entrada.brutTotal, taux));
    const conges = entrada.congesNonPris ? redondear(porcentaje(entrada.brutTotal, valores["fr.cdd-conges"])) : 0;
    return {
      taux,
      prime,
      conges,
      total: redondear(prime + conges),
      observaciones: [
        "L'indemnité de fin de contrat n'est pas due notamment en cas d'embauche en CDI à la suite du CDD, de refus d'un CDI équivalent, de faute grave, ou pour un CDD saisonnier ou d'usage.",
        "L'indemnité de congés payés affichée est un minimum, calculé sur la rémunération du contrat.",
      ],
    };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "prime", etiqueta: "Indemnité de fin de contrat (prime de précarité)", formato: "moneda", destacada: true },
    { clave: "conges", etiqueta: "Indemnité compensatrice de congés payés (minimum)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total versé en fin de contrat (brut)", formato: "moneda" },
  ],
});
