import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { impuestoRenta, libras, niPorTramos } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.self-employed-tax",
  mercado: "gb",
  concepto: "retencion-honorarios",
  slug: "self-employed-tax",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.income-tax-bands": "escala-por-region",
    "gb.class4-main-rate": "numero",
    "gb.class4-upper-rate": "numero",
    "gb.class4-lower-profits-limit": "numero",
    "gb.class4-upper-profits-limit": "numero",
    "gb.class2-small-profits-threshold": "numero",
    "gb.class2-weekly-rate": "numero",
  },
  campos: [
    { id: "beneficio", tipo: "moneda", etiqueta: "Yearly profit (income minus allowable expenses)", min: 0, porDefecto: 40000 },
    { id: "region", tipo: "region", etiqueta: "Where you live", porDefecto: "england-wales-ni" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.beneficio < 0) throw new ErrorEntrada("For a loss, there is no tax to pay this year. Enter a profit of zero or more.", "beneficio");
    const escala = porRegion(v["gb.income-tax-bands"], entrada.region);
    const impuesto = redondear(impuestoRenta(entrada.beneficio, escala, v["gb.personal-allowance"], v["gb.personal-allowance-taper"]).impuesto);
    const clase4 = redondear(
      niPorTramos(entrada.beneficio, {
        umbral: v["gb.class4-lower-profits-limit"],
        limite: v["gb.class4-upper-profits-limit"],
        tasa: v["gb.class4-main-rate"],
        tasaAlta: v["gb.class4-upper-rate"],
      }),
    );
    const umbralClase2 = v["gb.class2-small-profits-threshold"];
    const voluntaria = entrada.beneficio < umbralClase2 ? redondear(v["gb.class2-weekly-rate"] * 52) : 0;
    const total = redondear(impuesto + clase4);
    const observaciones: string[] = [];
    if (voluntaria > 0) {
      observaciones.push(`Your profit is under ${libras(umbralClase2)}, so you do not have to pay National Insurance. You can pay voluntary Class 2 to protect your State Pension record.`);
    } else {
      observaciones.push(`With profits of ${libras(umbralClase2)} or more, Class 2 is treated as paid, so the year counts for your State Pension at no cost.`);
    }
    if (total >= 1000) observaciones.push("With a bill of £1,000 or more, HMRC usually asks for two payments on account towards next year, each half of this bill, due on 31 January and 31 July.");
    return {
      total,
      impuesto,
      clase4,
      voluntaria,
      neto: redondear(entrada.beneficio - total),
      mensual: redondear(total / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Income Tax and National Insurance for the year", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income Tax", formato: "moneda" },
    { clave: "clase4", etiqueta: "Class 4 National Insurance", formato: "moneda" },
    { clave: "voluntaria", etiqueta: "Voluntary Class 2 for a full year (optional)", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Profit after tax", formato: "moneda" },
    { clave: "mensual", etiqueta: "Amount to set aside each month", formato: "moneda" },
  ],
});
