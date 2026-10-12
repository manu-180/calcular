import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_PERIODO_NOMINA } from "../nomina";

const TARIFAS = {
  semanal: "mx.tarifa-isr-semanal",
  decenal: "mx.tarifa-isr-decenal",
  quincenal: "mx.tarifa-isr-quincenal",
  mensual: "mx.tarifa-isr-mensual",
} as const;

export default definirCalculadora({
  id: "mx.asimilados-a-salarios",
  mercado: "mx",
  concepto: "propio",
  slug: "asimilados-a-salarios",
  estado: "publicado",
  requiere: {
    "mx.tarifa-isr-semanal": "escala",
    "mx.tarifa-isr-decenal": "escala",
    "mx.tarifa-isr-quincenal": "escala",
    "mx.tarifa-isr-mensual": "escala",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Pago bruto del periodo", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Cada cuánto te pagan", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!(entrada.periodo in TARIFAS)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const isr = redondear(aplicarEscala(valores[TARIFAS[entrada.periodo]], entrada.monto));
    return {
      isr,
      neto: redondear(entrada.monto - isr),
      tasaEfectiva: entrada.monto > 0 ? (isr / entrada.monto) * 100 : 0,
      observaciones: ["Como asimilado no recibes subsidio para el empleo ni cotizas al IMSS."],
    };
  },
  resultado: [
    { clave: "isr", etiqueta: "ISR que te retienen", formato: "moneda" },
    { clave: "neto", etiqueta: "Pago neto", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje real de ISR", formato: "porcentaje", decimales: 2 },
  ],
});
