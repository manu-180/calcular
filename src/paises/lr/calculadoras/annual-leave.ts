import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { filaDe } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.annual-leave",
  mercado: "lr",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "borrador",
  requiere: {
    "lr.annual-leave-weeks": "escala",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service with your employer", min: 0, porDefecto: 12 },
    { id: "dias", tipo: "entero", etiqueta: "Working days in your week", min: 1, max: 7, porDefecto: 5 },
    { id: "diario", tipo: "moneda", etiqueta: "Your pay for one day", min: 0, porDefecto: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.meses < 0) throw new ErrorEntrada("Enter your months of service.", "meses");
    if (entrada.dias < 1 || entrada.dias > 7) throw new ErrorEntrada("A week has between 1 and 7 working days.", "dias");
    const semanas = filaDe(v["lr.annual-leave-weeks"], entrada.meses);
    const diasLicencia = semanas * entrada.dias;
    return {
      diasLicencia,
      semanas,
      pago: entrada.diario ? redondear(entrada.diario * diasLicencia) : null,
    };
  },
  resultado: [
    { clave: "diasLicencia", etiqueta: "Days of annual leave", formato: "dias", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of leave", formato: "semanas" },
    { clave: "pago", etiqueta: "Leave pay", formato: "moneda" },
  ],
});
