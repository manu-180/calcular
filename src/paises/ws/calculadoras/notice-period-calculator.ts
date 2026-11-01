import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

function mesesCompletos(desde: string, hasta: string): number {
  const [a1, m1, d1] = desde.split("-").map(Number);
  const [a2, m2, d2] = hasta.split("-").map(Number);
  return (a2 - a1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
}

function banda(meses: number): string | null {
  if (meses < 3) return null;
  if (meses < 12) return "m3-y1";
  const limites: [number, string][] = [
    [48, "y1-y4"],
    [84, "y4-y7"],
    [120, "y7-y10"],
    [156, "y10-y13"],
    [192, "y13-y16"],
    [228, "y16-y19"],
  ];
  for (const [limite, clave] of limites) if (meses < limite) return clave;
  return "y19";
}

export default definirCalculadora({
  id: "ws.notice-period-calculator",
  mercado: "ws",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "ws.notice-weeks": "mapa",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of employment", porDefecto: "2020-03-15" },
    { id: "aviso", tipo: "fecha", etiqueta: "Date notice is given", porDefecto: "hoy" },
    { id: "pagoMensual", tipo: "moneda", etiqueta: "Monthly pay (full rate)", min: 0, porDefecto: 3000, ayuda: "Include bonuses, allowances and regular overtime. The Act counts them in notice pay." },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of employment",
      opciones: [
        { valor: "permanente", etiqueta: "Permanent or open-ended contract" },
        { valor: "sin-aviso", etiqueta: "Seasonal, trainee or casual under 2 months" },
      ],
      porDefecto: "permanente",
    },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.inicio) || !esFechaISO(e.aviso)) throw new ErrorEntrada("Enter both dates.", "inicio");
    if (e.aviso < e.inicio) throw new ErrorEntrada("The notice date cannot be before the first day of employment.", "aviso");
    const meses = mesesCompletos(e.inicio, e.aviso);
    const clave = e.tipo === "sin-aviso" ? null : banda(meses);
    const semanas = clave === null ? 0 : v["ws.notice-weeks"][clave];
    const observaciones: string[] = [];
    if (e.tipo === "sin-aviso") observaciones.push("The Act does not require notice for seasonal employees, trainees at the end of a training agreement and casual employees with under two months of service.");
    else if (clave === null) observaciones.push("The notice table starts at three months of service, so no notice period is listed yet.");
    observaciones.push("Where service is exactly on a boundary, such as one year, this uses the longer notice.");
    return {
      meses,
      semanas,
      ultimoDia: semanas > 0 ? sumarDias(e.aviso, semanas * 7) : e.aviso,
      pagoSustituto: redondear(semanas * ((e.pagoMensual * 12) / 52)),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Notice period", formato: "semanas", destacada: true },
    { clave: "ultimoDia", etiqueta: "Notice ends on", formato: "fecha" },
    { clave: "pagoSustituto", etiqueta: "Pay if the employer pays instead of notice", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "Complete months of service", formato: "numero", decimales: 0 },
  ],
});
