import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_DIA, REQUIERE_JORNADA, tarifas } from "../lib/jornada";

export default definirCalculadora({
  id: "ph.overtime-pay",
  mercado: "ph",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: REQUIERE_JORNADA,
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your regular daily wage", min: 0, porDefecto: 755 },
    { id: "dia", tipo: "opcion", etiqueta: "Day you worked overtime", opciones: OPCIONES_DIA, porDefecto: "ordinary" },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours (beyond 8)", min: 0, max: 16, porDefecto: 2 },
    { id: "nocturnas", tipo: "numero", etiqueta: "Of those, hours between 10 pm and 6 am", min: 0, max: 8, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diario <= 0) throw new ErrorEntrada("Enter your daily wage.", "diario");
    if (entrada.nocturnas > entrada.horas) throw new ErrorEntrada("Night hours cannot be more than your overtime hours.", "nocturnas");
    const t = tarifas(entrada.diario, entrada.dia, v);
    const extra = redondear(t.horaExtra * entrada.horas);
    const nocturno = redondear(t.horaExtra * t.nocturno * entrada.nocturnas);
    return {
      total: redondear(extra + nocturno),
      extra,
      nocturno,
      horaExtra: redondear(t.horaExtra),
      horaBase: redondear(t.horaBase),
      recargo: t.recargo,
      jornada: redondear(entrada.diario * t.factorDia),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "extra", etiqueta: "Overtime hours pay", formato: "moneda" },
    { clave: "nocturno", etiqueta: "Night shift differential on overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "horaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "horaBase", etiqueta: "Your regular hourly rate", formato: "moneda" },
    { clave: "recargo", etiqueta: "Overtime premium", formato: "porcentaje", decimales: 0 },
    { clave: "jornada", etiqueta: "Pay for the first 8 hours that day", formato: "moneda" },
  ],
});
