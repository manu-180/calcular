import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Fórmula del NSSF para quien se jubila desde el 1/7/2022: pensión anual = N × APE / 580; un 33 % se
// cobra junto (× 12,5 años) y el resto en cuotas mensuales.
export default definirCalculadora({
  id: "tz.nssf-pension-calculator",
  mercado: "tz",
  concepto: "jubilacion",
  slug: "nssf-pension-calculator",
  estado: "publicado",
  requiere: {
    "tz.nssf-pension-divisor": "numero",
    "tz.nssf-pension-years": "numero",
    "tz.nssf-commuted-share": "numero",
    "tz.nssf-min-contributions": "numero",
    "tz.nssf-max-pension": "numero",
  },
  campos: [
    { id: "ape", tipo: "moneda", etiqueta: "Annual pensionable emoluments", min: 0, porDefecto: 18000000, ayuda: "The average of your three highest years of earnings in the last ten years." },
    { id: "cotizaciones", tipo: "entero", etiqueta: "Number of monthly contributions", min: 0, porDefecto: 300 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ape <= 0) throw new ErrorEntrada("Enter your annual pensionable emoluments.", "ape");
    if (e.cotizaciones < v["tz.nssf-min-contributions"]) {
      throw new ErrorEntrada(`A pension needs at least ${v["tz.nssf-min-contributions"]} monthly contributions. With fewer you get your contributions back with interest.`, "cotizaciones");
    }
    const tope = porcentaje(e.ape, v["tz.nssf-max-pension"]);
    const anual = Math.min((e.cotizaciones * e.ape) / v["tz.nssf-pension-divisor"], tope);
    const parte = v["tz.nssf-commuted-share"];
    const observaciones = anual >= tope ? [`Your pension is capped at ${v["tz.nssf-max-pension"]}% of your annual pensionable emoluments.`] : [];
    return {
      mensual: redondear(porcentaje(anual, 100 - parte) / 12),
      sumaInicial: redondear(porcentaje(anual * v["tz.nssf-pension-years"], parte)),
      anual: redondear(anual),
      tasaReemplazo: (anual / e.ape) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly pension", formato: "moneda", destacada: true },
    { clave: "sumaInicial", etiqueta: "Lump sum at retirement (commuted pension)", formato: "moneda" },
    { clave: "anual", etiqueta: "Full annual pension before the lump sum", formato: "moneda" },
    { clave: "tasaReemplazo", etiqueta: "Annual pension as a share of your earnings", formato: "porcentaje", decimales: 1 },
  ],
});
