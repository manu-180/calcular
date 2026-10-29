import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { filaDe } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.notice-period",
  mercado: "lr",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "borrador",
  requiere: {
    "lr.notice-weeks": "escala",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service", min: 0, porDefecto: 24 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your pay for one week", min: 0, porDefecto: 10000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.meses < 0) throw new ErrorEntrada("Enter your months of service.", "meses");
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your pay for one week.", "semanal");
    const semanas = filaDe(v["lr.notice-weeks"], entrada.meses);
    return { semanas, pago: redondear(semanas * entrada.semanal) };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice", formato: "semanas", destacada: true },
    { clave: "pago", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
