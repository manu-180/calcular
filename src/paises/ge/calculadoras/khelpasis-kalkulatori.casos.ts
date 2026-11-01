import { definirCasos } from "@/motor/calculo";
import khelpasisKalkulatori from "./khelpasis-kalkulatori";

const SHEMA = "https://site-api.pensions.ge/api/v1/static-page/get?slug=pension-schema";
const KANONI = "https://site-api.pensions.ge/uploads/docs/legislation/funded-pension-law-2026.pdf";

export default definirCasos(khelpasisKalkulatori, [
  {
    nombre: "1000 ლარი, საპენსიო ფონდის მაგალითი",
    origen: { tipo: "oficial", url: SHEMA, detalle: "დარიცხული 1000: შენატანი 20, 980-დან 20% გადასახადი 196, ხელზე 784; ანგარიშზე სულ 60." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, monatsile: true },
    esperado: { neto: 784, pensia: 20, gadasakhadi: 196, damsaqmebeli: 20, sakhelmtsipo: 20, angarishze: 60 },
  },
  {
    nombre: "1000 ლარი სქემის გარეშე",
    origen: { tipo: "oficial", url: SHEMA, detalle: "იგივე მაგალითი: სქემაში მონაწილეობამდე ხელზე 800." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, monatsile: false },
    esperado: { neto: 800, gadasakhadi: 200, pensia: 0, angarishze: 0 },
  },
  {
    nombre: "7000 ლარი, სახელმწიფოს ზღვრის ზემოთ",
    origen: { tipo: "recalculado", url: KANONI, detalle: "წელიწადში 84 000: 24 000 × 2% = 480, 36 000 × 1% = 360, სულ 840, თვეში 70. შენატანი 140, გადასახადი 6860 × 20% = 1372, ხელზე 5488." },
    fecha: "2026-11-01",
    entrada: { bruto: 7000, monatsile: true },
    esperado: { neto: 5488, sakhelmtsipo: 70, damsaqmebeli: 140 },
  },
  {
    nombre: "ნულოვანი ხელფასი",
    origen: { tipo: "recalculado", url: KANONI, detalle: "გადასახადის გამოთვლა ნულზე მეტ თანხას ითხოვს." },
    fecha: "2026-11-01",
    entrada: { bruto: 0, monatsile: true },
    esperaError: true,
  },
]);
