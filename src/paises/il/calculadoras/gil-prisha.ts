import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";

// ביטוח לאומי: los hombres se retiran a los 67; las mujeres entre 60 y 65 según mes y año de
// nacimiento (claves «isha-AAAA-MM» con el primer mes de cada franja, valor en meses de edad).
// La edad de זכאות (sin examen de ingresos) es 70 para todos.

function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  const dia = Math.min(d, ultimo);
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

function mesesEntre(desde: FechaISO, hasta: FechaISO): number {
  const [a1, m1, d1] = desde.split("-").map(Number);
  const [a2, m2, d2] = hasta.split("-").map(Number);
  return (a2 - a1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
}

export function gilBeChodashim(mapa: Readonly<Record<string, number>>, min: string, leida: FechaISO): number | null {
  if (min === "gever") return enMapa(mapa, "gever");
  const chodesh = leida.slice(0, 7);
  let gil: number | null = null;
  for (const clave of Object.keys(mapa).filter((k) => k.startsWith("isha-")).sort()) {
    if (clave.slice(5) <= chodesh) gil = mapa[clave];
  }
  return gil;
}

export default definirCalculadora({
  id: "il.gil-prisha",
  mercado: "il",
  concepto: "propio",
  slug: "gil-prisha",
  estado: "publicado",
  requiere: { "il.gil-prisha": "mapa", "il.gil-zakaut": "mapa" },
  campos: [
    {
      id: "min",
      tipo: "opcion",
      etiqueta: "מין",
      opciones: [
        { valor: "isha", etiqueta: "אישה" },
        { valor: "gever", etiqueta: "גבר" },
      ],
      porDefecto: "isha",
    },
    { id: "leida", tipo: "fecha", etiqueta: "תאריך לידה", min: "1944-06-01", porDefecto: "1965-05-15" },
  ],
  calcular(e, v, { fecha }) {
    if (!e.leida) throw new ErrorEntrada("הזינו תאריך לידה.", "leida");
    const chodashim = gilBeChodashim(v["il.gil-prisha"], e.min, e.leida);
    if (chodashim === null) throw new ErrorEntrada("המחשבון מתחיל בילידות יוני 1944.", "leida");
    const shanim = Math.floor(chodashim / 12);
    const yeter = chodashim % 12;
    const gil = yeter ? `${shanim} שנים ו-${yeter} חודשים` : `${shanim} שנים`;
    const prisha = sumarMeses(e.leida, chodashim);
    const zakaut = sumarMeses(e.leida, enMapa(v["il.gil-zakaut"], "kulam") * 12);
    const nishar = Math.max(0, mesesEntre(fecha, prisha));
    const observaciones = ["מגיל הפרישה ועד גיל הזכאות הקצבה תלויה במבחן הכנסות. מגיל הזכאות לא נבדקות ההכנסות."];
    if (prisha <= fecha) observaciones.push("כבר הגעתם לגיל הפרישה.");
    return { gil, prisha, zakaut, nishar, observaciones };
  },
  resultado: [
    { clave: "gil", etiqueta: "גיל הפרישה", formato: "texto", destacada: true },
    { clave: "prisha", etiqueta: "תאריך ההגעה לגיל הפרישה", formato: "fecha" },
    { clave: "zakaut", etiqueta: "תאריך ההגעה לגיל הזכאות (70)", formato: "fecha" },
    { clave: "nishar", etiqueta: "חודשים שנשארו עד גיל הפרישה", formato: "meses" },
  ],
});
