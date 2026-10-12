import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.prestamo",
  mercado: "py",
  concepto: "propio",
  slug: "prestamo",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del préstamo", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", min: 0, max: 100 },
    { id: "meses", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 360, porDefecto: 12 },
  ],
  calcular(entrada, _valores, { redondear }) {
    const i = entrada.tasa / 100 / 12;
    const n = entrada.meses;
    // Sistema francés: cuota fija que incluye capital e interés.
    const cuota = i === 0 ? entrada.monto / n : (entrada.monto * i) / (1 - (1 + i) ** -n);
    const total = cuota * n;
    return {
      cuota: redondear(cuota),
      total: redondear(total),
      intereses: redondear(total - entrada.monto),
      observaciones: [
        "Es la cuota del sistema francés, el que usan casi todos los bancos y financieras.",
        "La cuota real puede sumar seguros y gastos administrativos. Pedí el costo total del préstamo antes de firmar.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total a devolver", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total de intereses", formato: "moneda" },
  ],
});
