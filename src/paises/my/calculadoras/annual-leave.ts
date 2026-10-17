import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_ANIOS, CAMPO_SUELDO, etiquetaTramo, sueldoValido, tramoAntiguedad } from "../lib/empleo";

export default definirCalculadora({
  id: "my.annual-leave",
  mercado: "my",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "my.annual-leave-days": "mapa",
    "my.ordinary-rate-divisor": "numero",
  },
  campos: [
    CAMPO_SUELDO,
    CAMPO_ANIOS,
    { id: "salida", tipo: "si-no", etiqueta: "You are leaving this year", porDefecto: false },
    { id: "mesesAnio", tipo: "entero", etiqueta: "Completed months of service in your final year", min: 0, max: 12, porDefecto: 12, ayuda: "Only used if you are leaving." },
    { id: "tomados", tipo: "numero", etiqueta: "Annual leave days already taken this year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    if (entrada.mesesAnio < 0 || entrada.mesesAnio > 12) throw new ErrorEntrada("Enter between 0 and 12 months.", "mesesAnio");
    const tramo = tramoAntiguedad(entrada.anios);
    const anual = enMapa(v["my.annual-leave-days"], tramo);
    // Sección 60E(1): el último año va en proporción a los meses completos; menos de medio día se descarta y medio o más cuenta como un día.
    const derecho = entrada.salida && entrada.mesesAnio < 12 ? Math.floor((anual * entrada.mesesAnio) / 12 + 0.5) : anual;
    const pendientes = Math.max(0, derecho - entrada.tomados);
    const diario = redondear(entrada.sueldo / v["my.ordinary-rate-divisor"]);
    return {
      derecho,
      pendientes,
      anual,
      tramo: etiquetaTramo(tramo),
      diario,
      pago: redondear(pendientes * diario),
    };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Annual leave for this year", formato: "dias", destacada: true },
    { clave: "pendientes", etiqueta: "Days still to take", formato: "dias" },
    { clave: "anual", etiqueta: "Full-year entitlement", formato: "dias" },
    { clave: "tramo", etiqueta: "Length of service", formato: "texto" },
    { clave: "diario", etiqueta: "Ordinary rate of pay (a day)", formato: "moneda" },
    { clave: "pago", etiqueta: "Value of the days still to take", formato: "moneda" },
  ],
});
