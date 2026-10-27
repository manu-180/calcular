import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

function tramoDias(dias: number): string {
  if (dias <= 30) return "up-to-30";
  if (dias <= 60) return "31-to-60";
  return "over-60";
}

function tramoMeses(meses: number): string {
  if (meses <= 6) return "up-to-6";
  if (meses <= 12) return "6-to-12";
  return "over-12";
}

export default definirCalculadora({
  id: "rw.tax-penalty-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "tax-penalty-calculator",
  estado: "publicado",
  requiere: {
    "rw.late-interest": "mapa",
    "rw.fine-undeclared": "mapa",
    "rw.fine-unpaid": "mapa",
    "rw.local-fine": "numero",
    "rw.local-interest": "numero",
    "rw.local-extra": "numero",
    "rw.local-extra-cap": "numero",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "Tax due", min: 0, porDefecto: 1000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tax",
      opciones: [
        { valor: "national", etiqueta: "Income tax, PAYE, VAT or withholding tax" },
        { valor: "district", etiqueta: "District tax (property, rental income, trading licence)" },
      ],
      porDefecto: "national",
    },
    { id: "declarado", tipo: "si-no", etiqueta: "The return was filed on time", porDefecto: false },
    { id: "dias", tipo: "entero", etiqueta: "Days late with the payment", min: 1, porDefecto: 45 },
  ],
  calcular(e, v, { redondear }) {
    if (e.impuesto <= 0) throw new ErrorEntrada("Enter the tax due.", "impuesto");
    if (e.dias < 1) throw new ErrorEntrada("Enter at least one day late.", "dias");
    const meses = Math.ceil(e.dias / 30);
    let multa: number;
    let tasaMensual: number;
    let recargo = 0;
    if (e.tipo === "district") {
      multa = e.declarado ? 0 : redondear(porcentaje(e.impuesto, v["rw.local-fine"]));
      tasaMensual = v["rw.local-interest"];
      recargo = redondear(Math.min(porcentaje(e.impuesto, v["rw.local-extra"]), v["rw.local-extra-cap"]));
    } else {
      const mapa = e.declarado ? v["rw.fine-unpaid"] : v["rw.fine-undeclared"];
      multa = redondear(porcentaje(e.impuesto, enMapa(mapa, tramoDias(e.dias))));
      tasaMensual = enMapa(v["rw.late-interest"], tramoMeses(meses));
    }
    const interes = redondear(Math.min(porcentaje(e.impuesto, tasaMensual * meses), e.tipo === "national" ? e.impuesto : Infinity));
    const recargos = multa + interes + recargo;
    return {
      total: e.impuesto + recargos,
      recargos,
      multa,
      interes,
      recargo,
      meses,
      tasaMensual,
      observaciones: ["Every month that has started counts as a full month of interest. We count 30 days as a month."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total to pay", formato: "moneda", destacada: true },
    { clave: "recargos", etiqueta: "Fines and interest", formato: "moneda" },
    { clave: "multa", etiqueta: "Administrative fine", formato: "moneda" },
    { clave: "interes", etiqueta: "Interest for late payment", formato: "moneda" },
    { clave: "recargo", etiqueta: "Extra 10% penalty on district tax", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "Months of interest", formato: "numero", decimales: 0 },
    { clave: "tasaMensual", etiqueta: "Interest rate a month", formato: "porcentaje", decimales: 1 },
  ],
});
