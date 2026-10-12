import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.prestamo",
  mercado: "do",
  concepto: "propio",
  slug: "prestamo",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del préstamo", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", ayuda: "La que te ofrece la entidad.", min: 0, max: 200 },
    { id: "meses", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 480, porDefecto: 36 },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.meses < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un mes.", "meses");
    const i = entrada.tasa / 100 / 12;
    const cuota = i === 0 ? entrada.monto / entrada.meses : (entrada.monto * i) / (1 - Math.pow(1 + i, -entrada.meses));
    const total = redondear(cuota * entrada.meses);
    return {
      cuota: redondear(cuota),
      total,
      intereses: redondear(total - entrada.monto),
      observaciones: [
        "Cuota fija con interés sobre saldo, como la mayoría de los préstamos de bancos y cooperativas.",
        "No incluye seguros, comisiones ni gastos de cierre. Pide la tabla de amortización a tu entidad para comparar.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda" },
    { clave: "intereses", etiqueta: "Intereses en total", formato: "moneda" },
  ],
});
