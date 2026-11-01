import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarDias } from "@/motor/vigencia";

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// Un mes de preaviso termina el mismo día del mes siguiente (o el último día, si ese mes es más corto).
function sumarUnMes(fecha: FechaISO): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const anio = m === 12 ? a + 1 : a;
  const mes = m === 12 ? 1 : m + 1;
  const dia = Math.min(d, diasDelMes(anio, mes));
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

const DIAS = { dia: 1, semana: 7, quincena: 14 } as const;
const NOMBRE = { dia: "One day", semana: "One week", quincena: "One fortnight", mes: "One month" } as const;

export default definirCalculadora({
  id: "mw.notice-period-calculator",
  mercado: "mw",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "mw.notice-long-service": "numero",
    "mw.notice-mid-service": "numero",
    "mw.notice-short-service": "numero",
    "mw.notice-fixed-term": "numero",
  },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "How your contract pays you",
      opciones: [
        { valor: "mensual", etiqueta: "By the month" },
        { valor: "quincenal", etiqueta: "By the fortnight" },
        { valor: "semanal", etiqueta: "By the week" },
        { valor: "diario", etiqueta: "By the day or by the hour" },
        { valor: "plazo", etiqueta: "Fixed-term contract" },
      ],
      porDefecto: "mensual",
    },
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service", min: 0, porDefecto: 24 },
    { id: "fecha", tipo: "fecha", etiqueta: "Day the notice is given", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.meses < 0) throw new ErrorEntrada("Months of service cannot be negative.", "meses");
    if (e.pago === "plazo") {
      const dias = v["mw.notice-fixed-term"];
      return { periodo: `${dias} calendar days`, dias, fin: sumarDias(e.fecha, dias) };
    }
    const largo = v["mw.notice-long-service"] * 12;
    const medio = v["mw.notice-mid-service"] * 12;
    const corto = v["mw.notice-short-service"];
    let tipo: keyof typeof NOMBRE;
    if (e.pago === "mensual" || e.meses >= largo) tipo = "mes";
    else if (e.pago === "quincenal" || e.meses >= medio) tipo = "quincena";
    else if (e.pago === "semanal" || e.meses >= corto) tipo = "semana";
    else tipo = "dia";
    if (tipo === "mes") return { periodo: NOMBRE.mes, dias: null, fin: sumarUnMes(e.fecha) };
    const dias = DIAS[tipo];
    return { periodo: NOMBRE[tipo], dias, fin: sumarDias(e.fecha, dias) };
  },
  resultado: [
    { clave: "periodo", etiqueta: "Minimum notice", formato: "texto", destacada: true },
    { clave: "dias", etiqueta: "Notice in days", formato: "dias" },
    { clave: "fin", etiqueta: "Notice runs until", formato: "fecha" },
  ],
});
