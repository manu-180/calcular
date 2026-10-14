import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { FICA } from "../lib/nomina";

export default definirCalculadora({
  id: "us.bonus-tax",
  mercado: "us",
  concepto: "propio",
  slug: "bonus-tax",
  estado: "publicado",
  requiere: {
    ...FICA,
    "us.additional-medicare-withholding": "numero",
    "us.supplemental-rate": "numero",
    "us.supplemental-rate-over-1m": "numero",
    "us.supplemental-threshold": "numero",
  },
  campos: [
    { id: "bono", tipo: "moneda", etiqueta: "Bonus amount", min: 0, porDefecto: 5000 },
    { id: "salariosPrevios", tipo: "moneda", etiqueta: "Wages already paid to you this year", min: 0, requerido: false, ayuda: "Used for the Social Security cap and the Additional Medicare Tax." },
    {
      id: "suplementariosPrevios",
      tipo: "moneda",
      etiqueta: "Bonuses and commissions already paid this year",
      min: 0,
      requerido: false,
      ayuda: "Only matters if your supplemental pay for the year passes $1 million.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const previos = entrada.salariosPrevios ?? 0;
    const supPrevios = entrada.suplementariosPrevios ?? 0;
    const tope = valores["us.supplemental-threshold"];
    const aTasaAlta = Math.max(0, supPrevios + entrada.bono - Math.max(supPrevios, tope));
    const aTasaBase = entrada.bono - aTasaAlta;
    const federal = redondear(porcentaje(aTasaBase, valores["us.supplemental-rate"]) + porcentaje(aTasaAlta, valores["us.supplemental-rate-over-1m"]));
    const lugarSs = Math.max(0, valores["us.social-security-wage-base"] - previos);
    const socialSecurity = redondear(porcentaje(Math.min(entrada.bono, lugarSs), valores["us.social-security-rate"]));
    const umbral = valores["us.additional-medicare-withholding"];
    const sobreUmbral = Math.max(0, previos + entrada.bono - Math.max(previos, umbral));
    const medicare = redondear(porcentaje(entrada.bono, valores["us.medicare-rate"]) + porcentaje(sobreUmbral, valores["us.additional-medicare-rate"]));
    const neto = redondear(entrada.bono - federal - socialSecurity - medicare);
    return {
      federal,
      socialSecurity,
      medicare,
      neto,
      porcentajeNeto: entrada.bono > 0 ? redondear((neto / entrada.bono) * 100) : 0,
      observaciones: [
        "This uses the flat rate for supplemental wages that most employers apply. State withholding is not included.",
        "Withholding is not your final tax. When you file, the bonus is taxed with the rest of your income and any difference becomes part of your refund or balance due.",
      ],
    };
  },
  resultado: [
    { clave: "federal", etiqueta: "Federal income tax withheld", formato: "moneda" },
    { clave: "socialSecurity", etiqueta: "Social Security tax", formato: "moneda" },
    { clave: "medicare", etiqueta: "Medicare tax", formato: "moneda" },
    { clave: "neto", etiqueta: "Bonus after federal withholding", formato: "moneda", destacada: true },
    { clave: "porcentajeNeto", etiqueta: "Share of the bonus you keep", formato: "porcentaje" },
  ],
});
