import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { cvlileba, tveDaTseli } from "../lib/inflatsia";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "ge.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ge.inflatsiis-kalkulatori",
  mercado: "ge",
  concepto: "inflacion",
  slug: "inflatsiis-kalkulatori",
  estado: "publicado",
  requiere: { "ge.cpi": "serie" },
  campos: [
    { id: "tanxa", tipo: "moneda", etiqueta: "თანხა", min: 0, porDefecto: 1000 },
    { id: "dan", tipo: "fecha", etiqueta: "რომელი თვის თანხაა", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "ითვლება მხოლოდ თვე, დღეს მნიშვნელობა არ აქვს." },
    { id: "mde", tipo: "fecha", etiqueta: "რომელ თვეზე გადავიყვანოთ", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const z = cvlileba(CPI, v["ge.cpi"], e.dan, e.mde);
    return {
      axali: redondear(e.tanxa * z.koeficienti),
      skhvaoba: redondear(e.tanxa * z.koeficienti - e.tanxa),
      dzveli: redondear(e.tanxa / z.koeficienti),
      sul: z.sul,
      danTve: tveDaTseli(z.dan),
      mdeTve: tveDaTseli(z.mde),
      observaciones: z.shenishvnebi,
    };
  },
  resultado: [
    { clave: "axali", etiqueta: "იგივე მსყიდველობითი უნარი", formato: "moneda", destacada: true },
    { clave: "skhvaoba", etiqueta: "ინფლაციის გამო მეტი", formato: "moneda" },
    { clave: "dzveli", etiqueta: "თანხის ღირებულება საწყისი თვის ფასებში", formato: "moneda" },
    { clave: "sul", etiqueta: "ინფლაცია მთელ პერიოდში", formato: "porcentaje", decimales: 1 },
    { clave: "danTve", etiqueta: "საწყისი თვე", formato: "texto" },
    { clave: "mdeTve", etiqueta: "საბოლოო თვე", formato: "texto" },
  ],
});
