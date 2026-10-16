import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { accEarnersLevy, dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.acc-levy-calculator",
  mercado: "nz",
  concepto: "aportes-seguridad-social",
  slug: "acc-levy-calculator",
  estado: "publicado",
  requiere: {
    "nz.acc-earners-levy-rate": "numero",
    "nz.acc-max-liable-earnings": "numero",
  },
  campos: [{ id: "ingreso", tipo: "moneda", etiqueta: "Your earnings for the tax year", min: 0, porDefecto: 70000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your earnings for the year.", "ingreso");
    const tope = v["nz.acc-max-liable-earnings"];
    const levy = redondear(accEarnersLevy(entrada.ingreso, v["nz.acc-earners-levy-rate"], tope));
    const observaciones: string[] = [];
    if (entrada.ingreso > tope) observaciones.push(`The levy stops at earnings of ${dolares(tope)}, so you pay nothing on the rest.`);
    return {
      levy,
      semanal: redondear(levy / 52),
      tasa: v["nz.acc-earners-levy-rate"],
      tope,
      maximo: redondear((tope * v["nz.acc-earners-levy-rate"]) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "levy", etiqueta: "ACC earners' levy for the year", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "About a week", formato: "moneda" },
    { clave: "tasa", etiqueta: "Levy rate (includes GST)", formato: "porcentaje", decimales: 2 },
    { clave: "tope", etiqueta: "Maximum liable earnings", formato: "moneda" },
    { clave: "maximo", etiqueta: "Most anyone pays this year", formato: "moneda" },
  ],
});
