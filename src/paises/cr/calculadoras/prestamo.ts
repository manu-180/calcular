import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.prestamo",
  mercado: "cr",
  concepto: "propio",
  slug: "prestamo",
  estado: "publicado",
  requiere: {
    "cr.tbp": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del préstamo", min: 0, porDefecto: 5000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", min: 0, max: 100 },
    { id: "meses", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 480, porDefecto: 60 },
  ],
  calcular(entrada, valores, { redondear }) {
    const i = entrada.tasa / 100 / 12;
    const n = entrada.meses;
    // Sistema francés (cuota fija), el que usan los bancos para préstamos personales e hipotecarios.
    const cuota = redondear(i === 0 ? entrada.monto / n : (entrada.monto * i) / (1 - Math.pow(1 + i, -n)));
    const total = redondear(cuota * n);
    const tbp = valores["cr.tbp"];
    return {
      cuota,
      total,
      intereses: redondear(total - entrada.monto),
      tbp: tbp.valor,
      fechaTbp: tbp.fecha,
      observaciones: [
        "La cuota no incluye seguros, comisiones ni pólizas que la entidad suele sumar.",
        "Si su préstamo tiene tasa variable (por ejemplo, tasa básica pasiva más un margen), la cuota cambia cuando cambia la tasa.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "intereses", etiqueta: "Total de intereses", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda" },
    { clave: "tbp", etiqueta: "Tasa básica pasiva del BCCR (referencia)", formato: "porcentaje" },
    { clave: "fechaTbp", etiqueta: "Fecha de la tasa básica pasiva", formato: "fecha" },
  ],
});
