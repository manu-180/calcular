import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { impuestoRenta } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.pension-tax-relief",
  mercado: "gb",
  concepto: "propio",
  slug: "pension-tax-relief",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.income-tax-bands": "escala-por-region",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Your income for the year before tax", min: 0, porDefecto: 60000 },
    { id: "region", tipo: "region", etiqueta: "Where you live", porDefecto: "england-wales-ni" },
    { id: "aporte", tipo: "moneda", etiqueta: "What you pay into your pension from your take-home pay", min: 0, porDefecto: 4000, ayuda: "For a personal pension or a workplace scheme that uses relief at source." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.aporte <= 0) throw new ErrorEntrada("Enter what you pay into your pension.", "aporte");
    const escala = porRegion(v["gb.income-tax-bands"], entrada.region);
    const basica = porRegion(v["gb.income-tax-bands"], "england-wales-ni")[0].tasa;
    const bruto = redondear(entrada.aporte / (1 - basica / 100));
    const reliefBasico = redondear(bruto - entrada.aporte);
    const observaciones: string[] = [];
    if (entrada.ingreso > 0 && bruto > entrada.ingreso) {
      observaciones.push("You only get tax relief on contributions up to 100% of your earnings. HMRC can ask for relief above that to be paid back.");
    }
    const pa = v["gb.personal-allowance"];
    const limite = v["gb.personal-allowance-taper"];
    const sin = impuestoRenta(entrada.ingreso, escala, pa, limite).impuesto;
    const con = impuestoRenta(Math.max(0, entrada.ingreso - bruto), escala, pa, limite).impuesto;
    const extra = redondear(Math.max(0, sin - con - reliefBasico));
    if (extra > 0) observaciones.push("Claim the extra relief through your Self Assessment tax return, or by asking HMRC to change your tax code.");
    return {
      bruto,
      reliefBasico,
      extra,
      total: redondear(reliefBasico + extra),
      coste: redondear(entrada.aporte - extra),
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Total going into your pension", formato: "moneda", destacada: true },
    { clave: "reliefBasico", etiqueta: "Basic rate relief added by your provider", formato: "moneda" },
    { clave: "extra", etiqueta: "Extra relief you can claim", formato: "moneda" },
    { clave: "total", etiqueta: "Total tax relief", formato: "moneda" },
    { clave: "coste", etiqueta: "Real cost to you after all relief", formato: "moneda" },
  ],
});
