import { definirCasos } from "@/motor/calculo";
import indeksInfliatsii from "./indeks-infliatsii";

const NBU = "https://bank.gov.ua/NBUStatService/v1/statdirectory/inflation?start=20100101&end=20261001&period=m&mcrd081=Total&tzep=PCPM_&json";

export default definirCasos(indeksInfliatsii, [
  {
    nombre: "Увесь 2022 рік: індекс 126,6 %",
    origen: { tipo: "recalculado", url: NBU, detalle: "Добуток місячних індексів Держстату за січень до грудня 2022: 435,9518 / 344,3449 = 1,266032; 10 000 × 1,266032 = 12 660,32 (річна інфляція Держстату 26,6 %)." },
    fecha: "2026-10-24",
    entrada: { suma: 10000, vid: "2022-01-01", do: "2022-12-31" },
    esperado: { zIndeksatsiieiu: 12660.32, infliatsiini: 2660.32, indeks: 126.6032, infliatsiia: 26.6032 },
    tolerancia: 0.001,
  },
  {
    nombre: "З січня 2024 до сьогодні: дані до вересня 2026",
    origen: { tipo: "recalculado", url: NBU, detalle: "Січень 2024 до вересня 2026 (останній опублікований): 50 000 × 600,2108 / 458,1147 = 65 508,79." },
    fecha: "2026-10-24",
    entrada: { suma: 50000, vid: "2024-01-01", do: "2026-10-24" },
    esperado: { zIndeksatsiieiu: 65508.79, infliatsiini: 15508.79, doMisiats: "вересень 2026" },
  },
  {
    nombre: "Один місяць: червень 2025",
    origen: { tipo: "recalculado", url: NBU, detalle: "Індекс червня 2025 до травня: 100,8 %; 1000 × 1,008 = 1008." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, vid: "2025-06-01", do: "2025-06-30" },
    esperado: { zIndeksatsiieiu: 1008 },
  },
  {
    nombre: "Місяць, якого ще немає",
    origen: { tipo: "recalculado", url: NBU, detalle: "Індекс за грудень 2026 ще не опубліковано." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, vid: "2026-12-01", do: "2026-12-31" },
    esperaError: true,
  },
]);
