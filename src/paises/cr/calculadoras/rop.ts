import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.rop",
  mercado: "cr",
  concepto: "propio",
  slug: "rop",
  estado: "publicado",
  requiere: {
    "cr.banco-popular-trabajador": "numero",
    "cr.banco-popular-patrono": "numero",
    "cr.rop-parte-bp-patrono": "numero",
    "cr.rop-patrono": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    { id: "anios", tipo: "entero", etiqueta: "Años de aportes a estimar", min: 1, max: 50, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const trabajador = redondear(porcentaje(entrada.salario, valores["cr.banco-popular-trabajador"]));
    const tasaBpPatrono = (valores["cr.banco-popular-patrono"] * valores["cr.rop-parte-bp-patrono"]) / 100;
    const bpPatrono = redondear(porcentaje(entrada.salario, tasaBpPatrono));
    const patrono = redondear(porcentaje(entrada.salario, valores["cr.rop-patrono"]));
    const mensual = redondear(trabajador + bpPatrono + patrono);
    return {
      trabajador,
      bpPatrono,
      patrono,
      mensual,
      tasa: redondear(valores["cr.banco-popular-trabajador"] + tasaBpPatrono + valores["cr.rop-patrono"]),
      acumulado: redondear(mensual * 12 * entrada.anios),
      observaciones: [
        "Las partes que vienen del Banco Popular llegan a la operadora 18 meses después.",
        "No incluye rendimientos ni comisiones de la operadora.",
      ],
    };
  },
  resultado: [
    { clave: "trabajador", etiqueta: "Desde su aporte al Banco Popular", formato: "moneda" },
    { clave: "bpPatrono", etiqueta: "Desde el aporte patronal al Banco Popular", formato: "moneda" },
    { clave: "patrono", etiqueta: "Aporte directo del patrono", formato: "moneda" },
    { clave: "mensual", etiqueta: "Aporte total al ROP por mes", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Porcentaje del salario", formato: "porcentaje" },
    { clave: "acumulado", etiqueta: "Aportes en los años indicados (sin rendimientos)", formato: "moneda" },
  ],
});
