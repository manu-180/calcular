import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.costo-de-un-empleado",
  mercado: "cr",
  concepto: "costo-empleador",
  slug: "costo-de-un-empleado",
  estado: "publicado",
  requiere: {
    "cr.ccss-sem-patrono": "numero",
    "cr.ccss-ivm-patrono": "numero",
    "cr.banco-popular-patrono": "numero",
    "cr.asignaciones-familiares": "numero",
    "cr.imas": "numero",
    "cr.ina": "numero",
    "cr.fcl": "numero",
    "cr.rop-patrono": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    {
      id: "ina",
      tipo: "si-no",
      etiqueta: "La empresa tiene cinco o más trabajadores permanentes",
      ayuda: "Con menos de cinco no se paga el aporte al INA.",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa =
      valores["cr.ccss-sem-patrono"] +
      valores["cr.ccss-ivm-patrono"] +
      valores["cr.banco-popular-patrono"] +
      valores["cr.asignaciones-familiares"] +
      valores["cr.imas"] +
      (entrada.ina ? valores["cr.ina"] : 0) +
      valores["cr.fcl"] +
      valores["cr.rop-patrono"];
    const cargas = redondear(porcentaje(entrada.salario, tasa));
    const aguinaldo = redondear(entrada.salario / 12);
    return {
      tasa: redondear(tasa),
      cargas,
      aguinaldo,
      costoMensual: redondear(entrada.salario + cargas + aguinaldo),
      costoAnual: redondear(entrada.salario * 13 + cargas * 12),
      observaciones: [
        "El aguinaldo se reparte por mes: es un doceavo del salario.",
        "Falta sumar la póliza de riesgos del trabajo del INS, que depende de la actividad.",
        "Las vacaciones no suman costo aparte: se pagan con el salario de esos días.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Cargas sociales del patrono", formato: "porcentaje" },
    { clave: "cargas", etiqueta: "Cargas sociales por mes", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo por mes (reserva)", formato: "moneda" },
    { clave: "costoMensual", etiqueta: "Costo total por mes", formato: "moneda", destacada: true },
    { clave: "costoAnual", etiqueta: "Costo total por año", formato: "moneda" },
  ],
});
