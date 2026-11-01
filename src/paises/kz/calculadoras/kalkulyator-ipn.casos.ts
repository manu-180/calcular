import { definirCasos } from "@/motor/calculo";
import kalkulyatorIpn from "./kalkulyator-ipn";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(kalkulyatorIpn, [
  {
    nombre: "Зарплата: 40 млн тенге облагаемого дохода за год",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "Порог 8500 × 4325 = 36 762 500. ИПН 10 % × 36 762 500 = 3 676 250 плюс 15 % × 3 237 500 = 485 625. Итого 4 161 875.",
    },
    fecha: "2026-10-24",
    entrada: { vid: "zarplata", dokhod: 40000000 },
    esperado: { ipn: 4161875, porog: 36762500, sverkhPoroga: 3237500 },
  },
  {
    nombre: "Зарплата ниже порога: 6 млн тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "10 % × 6 000 000 = 600 000." },
    fecha: "2026-10-24",
    entrada: { vid: "zarplata", dokhod: 6000000 },
    esperado: { ipn: 600000, sverkhPoroga: 0 },
  },
  {
    nombre: "ИП: 1 млрд тенге",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "Порог 230 000 × 4325 = 994 750 000. 10 % = 99 475 000 плюс 15 % × 5 250 000 = 787 500. Итого 100 262 500.",
    },
    fecha: "2026-10-24",
    entrada: { vid: "ip", dokhod: 1000000000 },
    esperado: { ipn: 100262500 },
  },
  {
    nombre: "Дивиденды: 10 млн тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "5 % × 10 000 000 = 500 000." },
    fecha: "2026-10-24",
    entrada: { vid: "dividendy", dokhod: 10000000 },
    esperado: { ipn: 500000 },
  },
  {
    nombre: "Частная практика: 5 млн тенге",
    origen: { tipo: "recalculado", url: NK, detalle: "9 % × 5 000 000 = 450 000." },
    fecha: "2026-10-24",
    entrada: { vid: "praktika", dokhod: 5000000 },
    esperado: { ipn: 450000 },
  },
  {
    nombre: "Нулевой доход",
    origen: { tipo: "recalculado", url: NK, detalle: "Доход должен быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { vid: "zarplata", dokhod: 0 },
    esperaError: true,
  },
]);
