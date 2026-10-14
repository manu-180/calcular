import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { libras } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.maternity-pay",
  mercado: "gb",
  concepto: "propio",
  slug: "maternity-pay",
  estado: "publicado",
  requiere: {
    "gb.smp-standard-rate": "numero",
    "gb.smp-earnings-percent": "numero",
    "gb.smp-higher-weeks": "numero",
    "gb.smp-total-weeks": "numero",
    "gb.ni-lower-earnings-limit-weekly": "numero",
  },
  campos: [
    {
      id: "semanal",
      tipo: "moneda",
      etiqueta: "Your average weekly earnings before tax",
      min: 0,
      porDefecto: 600,
      ayuda: "Usually your average over the 8 weeks up to the 15th week before your baby is due. For monthly pay, multiply by 12 and divide by 52.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal < 0) throw new ErrorEntrada("Earnings cannot be negative.", "semanal");
    const piso = v["gb.ni-lower-earnings-limit-weekly"];
    const semanasAltas = v["gb.smp-higher-weeks"];
    const semanasResto = v["gb.smp-total-weeks"] - semanasAltas;
    if (entrada.semanal < piso) {
      return {
        total: 0,
        primeras: 0,
        resto: 0,
        totalPrimeras: 0,
        totalResto: 0,
        semanasResto,
        observaciones: [`You need average weekly earnings of at least ${libras(piso)} to get Statutory Maternity Pay. You may be able to get Maternity Allowance instead.`],
      };
    }
    const primeras = redondear((entrada.semanal * v["gb.smp-earnings-percent"]) / 100);
    const resto = Math.min(v["gb.smp-standard-rate"], primeras);
    const totalPrimeras = redondear(primeras * semanasAltas);
    const totalResto = redondear(resto * semanasResto);
    return {
      total: redondear(totalPrimeras + totalResto),
      primeras,
      resto,
      totalPrimeras,
      totalResto,
      semanasResto,
      observaciones: ["Statutory Maternity Pay is taxed and has National Insurance taken off like normal pay. Your employer may pay more under its own maternity scheme."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total Statutory Maternity Pay before tax", formato: "moneda", destacada: true },
    { clave: "primeras", etiqueta: "Weekly pay for the first 6 weeks", formato: "moneda" },
    { clave: "totalPrimeras", etiqueta: "Total for the first 6 weeks", formato: "moneda" },
    { clave: "resto", etiqueta: "Weekly pay for the remaining weeks", formato: "moneda" },
    { clave: "semanasResto", etiqueta: "Remaining weeks", formato: "numero", decimales: 0 },
    { clave: "totalResto", etiqueta: "Total for the remaining weeks", formato: "moneda" },
  ],
});
