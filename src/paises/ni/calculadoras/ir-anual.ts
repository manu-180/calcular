import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { filaDe } from "../lib/fechas";

export default definirCalculadora({
  id: "ni.ir-anual",
  mercado: "ni",
  concepto: "propio",
  slug: "ir-anual",
  estado: "publicado",
  requiere: {
    "ni.ir-actividades-personas": "escala",
    "ni.ir-actividades-alicuota": "numero",
    "ni.ir-actividades-umbral": "numero",
    "ni.pago-minimo": "mapa",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", min: 0 },
    { id: "rentaNeta", tipo: "moneda", etiqueta: "Renta neta del año (ingresos menos costos y gastos deducibles)" },
    { id: "contribuyente", tipo: "opcion-dato", dato: "ni.pago-minimo", etiqueta: "Tipo de contribuyente", porDefecto: "demas" },
    { id: "retenciones", tipo: "moneda", etiqueta: "Anticipos y retenciones ya pagados en el año", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.rentaNeta > entrada.ingresos) throw new ErrorEntrada("La renta neta no puede ser mayor que los ingresos brutos.", "rentaNeta");
    const progresiva = entrada.ingresos <= valores["ni.ir-actividades-umbral"];
    const base = Math.max(0, entrada.rentaNeta);
    const alicuota = progresiva ? filaDe(valores["ni.ir-actividades-personas"], base).fila.tasa : valores["ni.ir-actividades-alicuota"];
    const irAnual = redondear(porcentaje(base, alicuota));
    const pagoMinimo = redondear(porcentaje(entrada.ingresos, enMapa(valores["ni.pago-minimo"], entrada.contribuyente)));
    const irAPagar = Math.max(irAnual, pagoMinimo);
    const saldo = redondear(irAPagar - (entrada.retenciones ?? 0));
    const millones = valores["ni.ir-actividades-umbral"] / 1_000_000;
    const observaciones = [
      progresiva
        ? `Con ingresos de hasta C$${millones} millones, el porcentaje del estrato se aplica sobre toda tu renta neta.`
        : `Con ingresos de más de C$${millones} millones se aplica la alícuota general sobre la renta neta.`,
      irAPagar === pagoMinimo && pagoMinimo > irAnual
        ? "Pagás el pago mínimo definitivo porque es mayor que el IR sobre tu renta neta."
        : "Pagás el IR sobre tu renta neta porque es mayor que el pago mínimo definitivo.",
    ];
    if (saldo < 0) observaciones.push("Tus anticipos y retenciones superan el impuesto: tenés saldo a favor.");
    return { alicuota, irAnual, pagoMinimo, irAPagar, saldo, observaciones };
  },
  resultado: [
    { clave: "alicuota", etiqueta: "Alícuota sobre la renta neta", formato: "porcentaje" },
    { clave: "irAnual", etiqueta: "IR sobre la renta neta", formato: "moneda" },
    { clave: "pagoMinimo", etiqueta: "Pago mínimo definitivo", formato: "moneda" },
    { clave: "irAPagar", etiqueta: "IR del año (el mayor de los dos)", formato: "moneda", destacada: true },
    { clave: "saldo", etiqueta: "Saldo a pagar (negativo: a favor)", formato: "moneda" },
  ],
});
