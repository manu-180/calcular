import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { fechaDe } from "../lib/fechas";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.aguinaldo-atrasado",
  mercado: "ni",
  concepto: "propio",
  slug: "aguinaldo-atrasado",
  estado: "publicado",
  requiere: {
    "ni.aguinaldo-plazo-dias": "numero",
    "ni.aguinaldo-multa-dias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué aguinaldo te pagaron tarde",
      opciones: [
        { valor: "diciembre", etiqueta: "El de diciembre" },
        { valor: "salida", etiqueta: "El proporcional, porque terminó el contrato" },
      ],
      porDefecto: "diciembre",
    },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", requerido: false, ayuda: "Solo si terminó el contrato." },
    { id: "fechaPago", tipo: "fecha", etiqueta: "Día en que te pagaron (o hoy, si todavía no te pagan)", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const plazo = valores["ni.aguinaldo-plazo-dias"];
    let limite: FechaISO;
    if (entrada.motivo === "salida") {
      if (entrada.fechaSalida === null) throw new ErrorEntrada("Poné tu último día de trabajo.", "fechaSalida");
      if (entrada.fechaSalida > entrada.fechaPago) throw new ErrorEntrada("La fecha de pago no puede ser anterior a tu último día de trabajo.", "fechaPago");
      limite = sumarDias(entrada.fechaSalida, plazo);
    } else {
      const [anio, mes] = entrada.fechaPago.split("-").map(Number);
      // Un pago de enero a noviembre corresponde al aguinaldo de diciembre del año anterior.
      limite = fechaDe(mes === 12 ? anio : anio - 1, 12, plazo);
    }
    const dias = Math.max(0, diasEntre(limite, entrada.fechaPago));
    const diario = redondear(entrada.salario / DIAS_MES);
    const indemnizacion = redondear(diario * valores["ni.aguinaldo-multa-dias"] * dias);
    const observaciones =
      dias === 0
        ? ["Te pagaron dentro del plazo: no corresponde indemnización."]
        : ["La indemnización se suma al aguinaldo. Si no te la pagan, podés reclamar en la Inspectoría Departamental del Trabajo."];
    return { limite, dias, diario, indemnizacion, observaciones };
  },
  resultado: [
    { clave: "limite", etiqueta: "Último día para pagarlo", formato: "fecha" },
    { clave: "dias", etiqueta: "Días de retraso", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización por el retraso", formato: "moneda", destacada: true },
  ],
});
