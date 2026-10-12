import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre } from "@/motor/vigencia";
import { menor, sumarMeses } from "../lib/fechas";

const DIAS_ANIO_COMERCIAL = 360;

function factor(tasaAnual: number, dias: number): number {
  return Math.pow(1 + tasaAnual / 100 / DIAS_ANIO_COMERCIAL, dias) - 1;
}

function diasEnTramo(desde: FechaISO, hasta: FechaISO, pago: FechaISO): number {
  if (pago <= desde) return 0;
  return diasEntre(desde, menor(pago, hasta));
}

export default definirCalculadora({
  id: "bo.deuda-tributaria",
  mercado: "bo",
  concepto: "propio",
  slug: "deuda-tributaria",
  estado: "publicado",
  requiere: {
    "bo.deuda-tributaria-tasas": "mapa",
    "bo.multa-omision-pago": "numero",
    "bo.ufv": "serie",
  },
  campos: [
    { id: "tributo", tipo: "moneda", etiqueta: "Impuesto que no pagó (tributo omitido)", min: 0 },
    { id: "vencimiento", tipo: "fecha", etiqueta: "Fecha en que vencía el pago" },
    {
      id: "ufvVencimiento",
      tipo: "numero",
      etiqueta: "Valor de la UFV del día del vencimiento",
      ayuda: "Lo publica el Banco Central de Bolivia para cada día.",
      min: 1,
      max: 10,
    },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    if (entrada.vencimiento >= fecha) throw new ErrorEntrada("El vencimiento tiene que ser anterior a hoy para que haya mora.", "vencimiento");
    const tasas = valores["bo.deuda-tributaria-tasas"];
    const ufv = valores["bo.ufv"];
    const omitidoUfv = entrada.tributo / entrada.ufvVencimiento;
    // Art. 47 y Anexo 1 del D.S. 27310: cada tramo de mora (hasta el 4.º año, del 5.º al 7.º, desde el 8.º)
    // tiene su tasa, con capitalización diaria sobre 360, y los intereses de los tramos se suman.
    const fin4 = sumarMeses(entrada.vencimiento, 48);
    const fin7 = sumarMeses(entrada.vencimiento, 84);
    const n1 = diasEnTramo(entrada.vencimiento, fin4, fecha);
    const n2 = diasEnTramo(fin4, fin7, fecha);
    const n3 = fecha > fin7 ? diasEntre(fin7, fecha) : 0;
    const interesesUfv =
      omitidoUfv * factor(enMapa(tasas, "hasta-4"), n1) + omitidoUfv * factor(enMapa(tasas, "hasta-7"), n2) + omitidoUfv * factor(enMapa(tasas, "desde-8"), n3);
    const actualizado = redondear(omitidoUfv * ufv.valor);
    const intereses = redondear(interesesUfv * ufv.valor);
    return {
      omitidoUfv: redondear(omitidoUfv),
      dias: n1 + n2 + n3,
      actualizado,
      mantenimiento: redondear(actualizado - entrada.tributo),
      intereses,
      deuda: redondear(actualizado + intereses),
      multa: redondear(porcentaje(actualizado, valores["bo.multa-omision-pago"])),
      ufvHoy: ufv.valor,
      observaciones: [
        "La deuda se calcula al día de hoy con la UFV de hoy. Si paga otro día, cambia.",
        "Si paga antes de que pasen 20 días desde que le notifiquen la Vista de Cargo, la multa se extingue (arrepentimiento eficaz).",
      ],
    };
  },
  resultado: [
    { clave: "omitidoUfv", etiqueta: "Tributo omitido en UFV", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "Días de mora", formato: "dias", decimales: 0 },
    { clave: "ufvHoy", etiqueta: "UFV de hoy", formato: "numero", decimales: 5 },
    { clave: "mantenimiento", etiqueta: "Mantenimiento de valor", formato: "moneda" },
    { clave: "intereses", etiqueta: "Intereses", formato: "moneda" },
    { clave: "deuda", etiqueta: "Deuda tributaria a hoy", formato: "moneda", destacada: true },
    { clave: "multa", etiqueta: "Multa por omisión de pago, si el SIN la determina", formato: "moneda" },
  ],
});
