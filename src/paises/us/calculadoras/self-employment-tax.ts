import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { estadoValido, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";
import { FICA } from "../lib/nomina";

export default definirCalculadora({
  id: "us.self-employment-tax",
  mercado: "us",
  concepto: "retencion-honorarios",
  slug: "self-employment-tax",
  estado: "publicado",
  requiere: {
    ...FICA,
    "us.additional-medicare-threshold": "mapa",
    "us.se-earnings-factor": "numero",
    "us.se-minimum": "numero",
  },
  campos: [
    { id: "ganancia", tipo: "moneda", etiqueta: "Net profit from self-employment", min: 0, porDefecto: 50000, ayuda: "Income minus business expenses, as on Schedule C." },
    { id: "salarios", tipo: "moneda", etiqueta: "W-2 wages from a job, if any", min: 0, requerido: false, ayuda: "Wages already taxed for Social Security use up part of the wage base." },
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const salarios = entrada.salarios ?? 0;
    const neto = redondear(porcentaje(entrada.ganancia, valores["us.se-earnings-factor"]));
    if (neto < valores["us.se-minimum"]) {
      return {
        neto,
        socialSecurity: 0,
        medicare: 0,
        impuesto: 0,
        deduccion: 0,
        adicional: 0,
        trimestral: 0,
        observaciones: ["Net earnings under the minimum owe no self-employment tax."],
      };
    }
    const lugarSs = Math.max(0, valores["us.social-security-wage-base"] - salarios);
    const socialSecurity = redondear(porcentaje(Math.min(neto, lugarSs), 2 * valores["us.social-security-rate"]));
    const medicare = redondear(porcentaje(neto, 2 * valores["us.medicare-rate"]));
    const impuesto = redondear(socialSecurity + medicare);
    // Form 8959: el umbral del Additional Medicare se achica con los salarios ya cobrados.
    const umbral = Math.max(0, enMapa(valores["us.additional-medicare-threshold"], estado) - salarios);
    const adicional = redondear(porcentaje(Math.max(0, neto - umbral), valores["us.additional-medicare-rate"]));
    return {
      neto,
      socialSecurity,
      medicare,
      impuesto,
      deduccion: redondear(impuesto / 2),
      adicional,
      trimestral: redondear((impuesto + adicional) / 4),
      observaciones: ["Federal income tax is separate. You also owe it on your profit, minus the deduction for half of this tax."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net earnings subject to SE tax", formato: "moneda" },
    { clave: "socialSecurity", etiqueta: "Social Security part", formato: "moneda" },
    { clave: "medicare", etiqueta: "Medicare part", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Self-employment tax", formato: "moneda", destacada: true },
    { clave: "adicional", etiqueta: "Additional Medicare Tax", formato: "moneda", ocultarSiCero: true },
    { clave: "deduccion", etiqueta: "Deduction for half of SE tax", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Set aside each quarter for these taxes", formato: "moneda" },
  ],
});
