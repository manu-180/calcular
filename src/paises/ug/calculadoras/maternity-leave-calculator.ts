import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const DIA = 86400000;

function sumarDiasHabiles(inicio: string, dias: number, porSemana: number): { fin: string; corridos: number } {
  const [a, m, d] = inicio.split("-").map(Number);
  const desde = Date.UTC(a, m - 1, d);
  // 5 días: lunes a viernes; 6 días: lunes a sábado. getUTCDay: 0 domingo, 6 sábado.
  const habil = (t: number) => {
    const w = new Date(t).getUTCDay();
    return porSemana === 6 ? w !== 0 : w !== 0 && w !== 6;
  };
  let t = desde;
  while (!habil(t)) t += DIA;
  let contados = 1;
  while (contados < dias) {
    t += DIA;
    if (habil(t)) contados++;
  }
  return { fin: new Date(t).toISOString().slice(0, 10), corridos: Math.round((t - desde) / DIA) + 1 };
}

export default definirCalculadora({
  id: "ug.maternity-leave-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "ug.maternity-days": "numero",
    "ug.paternity-days": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Leave",
      opciones: [
        { valor: "maternity", etiqueta: "Maternity leave" },
        { valor: "paternity", etiqueta: "Paternity leave" },
      ],
      porDefecto: "maternity",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
    {
      id: "semana",
      tipo: "opcion",
      etiqueta: "Working days a week",
      opciones: [
        { valor: "5", etiqueta: "5 days (Monday to Friday)" },
        { valor: "6", etiqueta: "6 days (Monday to Saturday)" },
      ],
      porDefecto: "5",
    },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual < 0) throw new ErrorEntrada("Pay cannot be negative.", "mensual");
    const porSemana = Number(e.semana);
    const dias = e.tipo === "maternity" ? v["ug.maternity-days"] : v["ug.paternity-days"];
    const { fin, corridos } = sumarDiasHabiles(e.inicio, dias, porSemana);
    const observaciones = ["Public holidays falling in the leave are counted as working days here. If your employer skips them, the leave ends later."];
    if (e.tipo === "maternity") observaciones.push("At least four weeks of the leave must come after the birth.");
    return {
      fin,
      dias,
      corridos,
      pago: redondear((dias * e.mensual * 12) / (52 * porSemana)),
      observaciones,
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Working days of leave", formato: "dias" },
    { clave: "corridos", etiqueta: "Calendar days of leave", formato: "dias" },
    { clave: "pago", etiqueta: "Full pay for the leave days", formato: "moneda" },
  ],
});
