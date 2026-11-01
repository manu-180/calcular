import { definirCasos } from "@/motor/calculo";
import kursValyut from "./kurs-valyut";

const NBK = "https://nationalbank.kz/rss/get_rates.cfm?fdate=24.10.2026";

export default definirCasos(kursValyut, [
  {
    nombre: "100 долларов по курсу на 24 октября 2026 года",
    origen: { tipo: "oficial", url: NBK, detalle: "Официальный курс USD на 24.10.2026: 451,05 тенге. 100 × 451,05 = 45 105." },
    fecha: "2026-10-24",
    entrada: { valyuta: "usd", napravlenie: "v-tenge", summa: 100 },
    esperado: { rezultat: 45105, kurs: 451.05, fecha: "2026-10-24" },
  },
  {
    nombre: "100 000 тенге в рубли",
    origen: { tipo: "oficial", url: NBK, detalle: "Курс RUB на 24.10.2026: 5,60 тенге. 100 000 / 5,6 = 17 857,14." },
    fecha: "2026-10-24",
    entrada: { valyuta: "rub", napravlenie: "iz-tenge", summa: 100000 },
    esperado: { rezultat: 17857.14 },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "oficial", url: NBK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { valyuta: "eur", napravlenie: "v-tenge", summa: 0 },
    esperaError: true,
  },
]);
