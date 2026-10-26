import { definirCasos } from "@/motor/calculo";
import kalkulyatorNds from "./kalkulyator-nds";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(kalkulyatorNds, [
  {
    nombre: "Начислить 16 % на 100 000 тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 503: 100 000 × 16 % = 16 000, с НДС 116 000." },
    fecha: "2026-10-24",
    entrada: { summa: 100000, napravlenie: "nachislit", stavka: "osnovnaya" },
    esperado: { nds: 16000, bezNds: 100000, sNds: 116000, stavka: 16 },
  },
  {
    nombre: "Выделить 16 % из 116 000 тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "116 000 / 1,16 = 100 000, НДС 16 000." },
    fecha: "2026-10-24",
    entrada: { summa: 116000, napravlenie: "vydelit", stavka: "osnovnaya" },
    esperado: { nds: 16000, bezNds: 100000 },
  },
  {
    nombre: "Лекарства в 2026 году: 5 %",
    origen: { tipo: "recalculado", url: NK, detalle: "10 000 × 5 % = 500." },
    fecha: "2026-10-24",
    entrada: { summa: 10000, napravlenie: "nachislit", stavka: "lekarstva" },
    esperado: { nds: 500, stavka: 5 },
  },
  {
    nombre: "Лекарства с 2027 года: 10 %",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 503, пункт 2: с 1 января 2027 года 10 %. 10 000 × 10 % = 1000." },
    fecha: "2027-01-01",
    entrada: { summa: 10000, napravlenie: "nachislit", stavka: "lekarstva" },
    esperado: { nds: 1000, stavka: 10 },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { summa: 0, napravlenie: "nachislit", stavka: "osnovnaya" },
    esperaError: true,
  },
]);
