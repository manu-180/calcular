import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { tzs } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.presumptive-tax-calculator",
  mercado: "tz",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax-calculator",
  estado: "publicado",
  requiere: {
    "tz.presumptive-threshold": "numero",
    "tz.presumptive-ceiling": "numero",
    "tz.presumptive-band-1-limit": "numero",
    "tz.presumptive-band-2-limit": "numero",
    "tz.presumptive-band-1-incomplete": "numero",
    "tz.presumptive-band-2-incomplete": "numero",
    "tz.presumptive-band-2-base": "numero",
    "tz.presumptive-complete-rate": "numero",
    "tz.presumptive-top-rate": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Annual turnover", min: 0, porDefecto: 9000000 },
    { id: "registros", tipo: "si-no", etiqueta: "You keep complete records", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.ventas < 0) throw new ErrorEntrada("Turnover cannot be negative.", "ventas");
    const umbral = v["tz.presumptive-threshold"];
    const l1 = v["tz.presumptive-band-1-limit"];
    const l2 = v["tz.presumptive-band-2-limit"];
    const tasa = v["tz.presumptive-complete-rate"];
    const observaciones: string[] = [];
    if (e.ventas > v["tz.presumptive-ceiling"]) {
      throw new ErrorEntrada(`The presumptive regime is for turnover up to ${tzs(v["tz.presumptive-ceiling"])}. Above that you file a normal return.`, "ventas");
    }
    let impuesto = 0;
    if (e.ventas <= umbral) impuesto = 0;
    else if (e.ventas <= l1) impuesto = e.registros ? porcentaje(e.ventas - umbral, tasa) : v["tz.presumptive-band-1-incomplete"];
    else if (e.ventas <= l2) impuesto = e.registros ? v["tz.presumptive-band-2-base"] + porcentaje(e.ventas - l1, tasa) : v["tz.presumptive-band-2-incomplete"];
    else impuesto = porcentaje(e.ventas, v["tz.presumptive-top-rate"]);
    if (e.ventas <= umbral) observaciones.push(`Turnover up to ${tzs(umbral)} pays no presumptive tax.`);
    observaciones.push("A new business can get no tax for its first 12 months if the Commissioner approves the relief.");
    const anual = redondear(impuesto);
    return { anual, efectiva: e.ventas > 0 ? (anual / e.ventas) * 100 : 0, observaciones };
  },
  resultado: [
    { clave: "anual", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Tax as a share of turnover", formato: "porcentaje", decimales: 2 },
  ],
});
