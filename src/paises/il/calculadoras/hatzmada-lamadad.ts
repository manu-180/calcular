import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const MADAD = (series.series.find((s) => s.id === "il.madad")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

const CHODASHIM = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

function shemChodesh(fecha: string): string {
  return `${CHODASHIM[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function techilatChodesh(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

// El motor da solo el último punto de la serie a la fecha del cálculo; la historia sale de series.json
// cortada en ese punto, para que un caso con fecha fija no vea meses publicados después.
export default definirCalculadora({
  id: "il.hatzmada-lamadad",
  mercado: "il",
  concepto: "inflacion",
  slug: "hatzmada-lamadad",
  estado: "publicado",
  requiere: { "il.madad": "serie" },
  campos: [
    { id: "schum", tipo: "moneda", etiqueta: "הסכום", min: 0, porDefecto: 10000 },
    { id: "me", tipo: "fecha", etiqueta: "החודש של הסכום המקורי (מדד בסיס)", ayuda: "המדד של החודש הזה. היום בחודש לא משנה.", min: "2000-01-01", porDefecto: "2020-01-01" },
    { id: "ad", tipo: "fecha", etiqueta: "החודש שאליו מצמידים", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.schum <= 0) throw new ErrorEntrada("הזינו סכום.", "schum");
    const acharon = v["il.madad"];
    const zminim = MADAD.filter(([f]) => f <= acharon.fecha);
    const madad = new Map<string, number>(zminim);
    const rishon = zminim[0]?.[0];
    if (!rishon) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const m1 = techilatChodesh(e.me);
    let m2 = techilatChodesh(e.ad);
    const observaciones: string[] = [];
    if (m1 < rishon) throw new ErrorEntrada("אין נתוני מדד לחודש הזה. בחרו חודש מאוחר יותר.", "me");
    if (m1 > acharon.fecha) throw new ErrorEntrada("המדד של החודש הזה עוד לא פורסם. בחרו חודש מוקדם יותר.", "me");
    if (m2 > acharon.fecha) {
      observaciones.push(`המדד האחרון שפורסם הוא של ${shemChodesh(acharon.fecha)}, ולכן ההצמדה היא עד החודש הזה.`);
      m2 = acharon.fecha;
    }
    if (m1 > m2) throw new ErrorEntrada("חודש הבסיס צריך להיות לפני החודש שאליו מצמידים.", "me");
    const madad1 = madad.get(m1);
    const madad2 = madad.get(m2);
    if (madad1 === undefined || madad2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const yachas = madad2 / madad1;
    const metuam = redondear(e.schum * yachas);
    return {
      metuam,
      hefresh: redondear(metuam - e.schum),
      shinui: (yachas - 1) * 100,
      chodeshMe: shemChodesh(m1),
      chodeshAd: shemChodesh(m2),
      observaciones,
    };
  },
  resultado: [
    { clave: "metuam", etiqueta: "הסכום אחרי הצמדה למדד", formato: "moneda", destacada: true },
    { clave: "hefresh", etiqueta: "הפרשי הצמדה", formato: "moneda" },
    { clave: "shinui", etiqueta: "שינוי המדד בתקופה", formato: "porcentaje", decimales: 2 },
    { clave: "chodeshMe", etiqueta: "מדד בסיס", formato: "texto" },
    { clave: "chodeshAd", etiqueta: "מדד אחרון בחישוב", formato: "texto" },
  ],
});
