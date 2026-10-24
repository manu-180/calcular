import { definirCasos } from "@/motor/calculo";
import nalogNaImushchestvo from "./nalog-na-imushchestvo";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(nalogNaImushchestvo, [
  {
    nombre: "Квартира стоимостью 15 млн тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 602: 22 600 + 0,35 % × (15 000 000 − 14 000 000) = 26 100." },
    fecha: "2026-10-24",
    entrada: { stoimost: 15000000 },
    esperado: { nalog: 26100, stavka: 0.35 },
  },
  {
    nombre: "1,5 млн тенге: первая строка шкалы",
    origen: { tipo: "recalculado", url: NK, detalle: "0,05 % × 1 500 000 = 750." },
    fecha: "2026-10-24",
    entrada: { stoimost: 1500000 },
    esperado: { nalog: 750 },
  },
  {
    nombre: "Ровно 2 млн тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "До 2 000 000 включительно: 0,05 % = 1000." },
    fecha: "2026-10-24",
    entrada: { stoimost: 2000000 },
    esperado: { nalog: 1000, stavka: 0.05 },
  },
  {
    nombre: "500 млн тенге: последняя строка",
    origen: { tipo: "recalculado", url: NK, detalle: "2 946 600 + 2 % × 50 000 000 = 3 946 600." },
    fecha: "2026-10-24",
    entrada: { stoimost: 500000000 },
    esperado: { nalog: 3946600, stavka: 2 },
  },
]);
