import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.prestamo",
  mercado: "hn",
  concepto: "propio",
  slug: "prestamo",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del préstamo", min: 0, porDefecto: 100000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", min: 0, max: 100 },
    { id: "meses", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 480, porDefecto: 36 },
  ],
  calcular(entrada, _valores, { redondear }) {
    const i = entrada.tasa / 100 / 12;
    const n = entrada.meses;
    // Cuota fija (sistema francés), la que usan bancos y cooperativas en préstamos personales y de vivienda.
    const cuota = redondear(i === 0 ? entrada.monto / n : (entrada.monto * i) / (1 - Math.pow(1 + i, -n)));
    const total = redondear(cuota * n);
    return {
      cuota,
      intereses: redondear(total - entrada.monto),
      total,
      observaciones: [
        "La cuota no incluye seguros, comisiones ni gastos de cierre que la entidad suele sumar.",
        "Compare préstamos por la tasa anual y por el total a pagar, no solo por la cuota.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "intereses", etiqueta: "Total de intereses", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda" },
  ],
});
