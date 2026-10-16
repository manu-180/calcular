import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.kiwisaver-government-contribution",
  mercado: "nz",
  concepto: "propio",
  slug: "kiwisaver-government-contribution",
  estado: "publicado",
  requiere: {
    "nz.kiwisaver-government-rate": "numero",
    "nz.kiwisaver-government-max": "numero",
    "nz.kiwisaver-government-income-cap": "numero",
    "nz.kiwisaver-government-full-contribution": "numero",
  },
  campos: [
    { id: "aportado", tipo: "moneda", etiqueta: "What you've contributed between 1 July and 30 June", min: 0, porDefecto: 800 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your taxable income for the year", min: 0, porDefecto: 50000 },
    { id: "edad", tipo: "entero", etiqueta: "Your age", min: 0, max: 120, porDefecto: 30 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.aportado < 0) throw new ErrorEntrada("Contributions can't be negative.", "aportado");
    const tasa = v["nz.kiwisaver-government-rate"];
    const maximo = v["nz.kiwisaver-government-max"];
    const necesario = v["nz.kiwisaver-government-full-contribution"];
    const elegible = entrada.edad >= 16 && entrada.edad < 65 && entrada.ingreso <= v["nz.kiwisaver-government-income-cap"];
    const gobierno = elegible ? redondear(Math.min((entrada.aportado * tasa) / 100, maximo)) : 0;
    const observaciones: string[] = [];
    if (entrada.ingreso > v["nz.kiwisaver-government-income-cap"]) {
      observaciones.push(`With taxable income over ${dolares(v["nz.kiwisaver-government-income-cap"])} you don't qualify for the government contribution.`);
    } else if (!elegible) {
      observaciones.push("The government contribution is for members aged 16 to 65. If you turn 16 or 65 during the year, you get part of it.");
    }
    return {
      gobierno,
      necesario,
      faltante: elegible ? redondear(Math.max(0, necesario - entrada.aportado)) : 0,
      maximo,
      observaciones,
    };
  },
  resultado: [
    { clave: "gobierno", etiqueta: "Your government contribution", formato: "moneda", destacada: true },
    { clave: "faltante", etiqueta: "Still to contribute for the full amount", formato: "moneda" },
    { clave: "necesario", etiqueta: "Your contribution for the full amount", formato: "moneda" },
    { clave: "maximo", etiqueta: "Maximum government contribution", formato: "moneda" },
  ],
});
