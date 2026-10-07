import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasDeVacaciones, OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.vacaciones",
  mercado: "mx",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "mx.vacaciones-primer-anio": "numero",
    "mx.prima-vacacional": "numero",
    "mx.exencion-prima-vacacional": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Años completos que llevas en la empresa", min: 1, max: 60, porDefecto: 1 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "prima", tipo: "porcentaje", etiqueta: "Prima vacacional que da tu empresa", min: 0, max: 100, requerido: false, ayuda: "Déjalo vacío si no lo sabes: se usa el mínimo de ley." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anios < 1) throw new ErrorEntrada("Las vacaciones se ganan al cumplir el primer año.", "anios");
    const minimoPrima = valores["mx.prima-vacacional"];
    const tasa = entrada.prima ?? minimoPrima;
    if (tasa < minimoPrima) throw new ErrorEntrada(`La prima vacacional no puede ser menor al ${minimoPrima} %.`, "prima");
    const dias = diasDeVacaciones(entrada.anios, valores["mx.vacaciones-primer-anio"]);
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const pago = redondear(diario * dias);
    const prima = redondear(porcentaje(pago, tasa));
    const exenta = Math.min(prima, redondear(valores["mx.exencion-prima-vacacional"] * valores["mx.uma-diaria"]));
    return {
      dias,
      diasSiguiente: diasDeVacaciones(entrada.anios + 1, valores["mx.vacaciones-primer-anio"]),
      diario,
      pago,
      prima,
      exenta,
      total: redondear(pago + prima),
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de vacaciones que te tocan", formato: "dias", destacada: true },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago de tus días de vacaciones", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima vacacional", formato: "moneda" },
    { clave: "exenta", etiqueta: "Parte de la prima que no paga ISR", formato: "moneda" },
    { clave: "total", etiqueta: "Total por tus vacaciones", formato: "moneda", destacada: true },
    { clave: "diasSiguiente", etiqueta: "Días que te tocan al cumplir otro año", formato: "dias" },
  ],
});
