import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ie.maternity-benefit",
  mercado: "ie",
  concepto: "propio",
  slug: "maternity-benefit",
  estado: "publicado",
  requiere: {
    "ie.maternity-benefit-weekly": "numero",
    "ie.maternity-benefit-weeks": "numero",
    "ie.maternity-unpaid-weeks": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of your maternity leave", porDefecto: "hoy" },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Your gross weekly pay (optional, to compare)",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    const semanal = v["ie.maternity-benefit-weekly"];
    const semanas = v["ie.maternity-benefit-weeks"];
    const sinPago = v["ie.maternity-unpaid-weeks"];
    if (semanas <= 0) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const inicio = entrada.inicio as FechaISO;
    const fin = sumarDias(inicio, semanas * 7 - 1);
    const finSinPago = sumarDias(fin, sinPago * 7);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.sueldo !== null) {
      diferencia = redondear(Math.max(0, entrada.sueldo - semanal));
      if (diferencia > 0) observaciones.push("The gap is what you would have less each week than your normal pay, unless your employer pays you something during your leave.");
    }
    observaciones.push("You must start your leave at least 2 weeks, and no more than 16 weeks, before the end of the week your baby is due.");
    return {
      semanal,
      semanas,
      total: redondear(semanal * semanas),
      fin,
      finSinPago,
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total Maternity Benefit", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Maternity Benefit a week", formato: "moneda" },
    { clave: "semanas", etiqueta: "Weeks paid", formato: "numero", decimales: 0 },
    { clave: "fin", etiqueta: "Paid leave ends", formato: "fecha" },
    { clave: "finSinPago", etiqueta: "Optional unpaid leave would end", formato: "fecha" },
    { clave: "diferencia", etiqueta: "Weekly gap to your pay", formato: "moneda" },
  ],
});
