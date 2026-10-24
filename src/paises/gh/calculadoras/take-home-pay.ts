import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cedis, impuestoAnual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gh.take-home-pay",
  mercado: "gh",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "gh.paye-annual-bands": "escala",
    "gh.ssnit-employee-rate": "numero",
    "gh.provident-fund-relief": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 5000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Cash allowances a month (transport, rent, risk)", min: 0, porDefecto: 0 },
    { id: "tier3", tipo: "moneda", etiqueta: "Your provident fund (Tier 3) contribution a month", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your basic salary.", "basico");
    const ssnit = redondear(porcentaje(entrada.basico, v["gh.ssnit-employee-rate"]));
    const topeTier3 = porcentaje(entrada.basico, v["gh.provident-fund-relief"]);
    const deducibleTier3 = Math.min(entrada.tier3, topeTier3);
    const gravable = Math.max(0, entrada.basico + entrada.subsidios - ssnit - deducibleTier3);
    const paye = redondear(impuestoAnual(v["gh.paye-annual-bands"], gravable * 12) / 12);
    const neto = redondear(entrada.basico + entrada.subsidios - ssnit - entrada.tier3 - paye);
    const observaciones: string[] = [];
    if (entrada.tier3 > topeTier3) observaciones.push(`Only ${cedis(redondear(topeTier3))} of your provident fund contribution reduces your PAYE.`);
    return {
      neto,
      ssnit,
      paye,
      tier3: entrada.tier3,
      gravable: redondear(gravable),
      anual: redondear(neto * 12),
      marginal: tasaMarginal(v["gh.paye-annual-bands"], gravable * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "ssnit", etiqueta: "SSNIT (5.5% of basic)", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE income tax", formato: "moneda" },
    { clave: "tier3", etiqueta: "Provident fund", formato: "moneda", ocultarSiCero: true },
    { clave: "gravable", etiqueta: "Chargeable income a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 1 },
  ],
});
