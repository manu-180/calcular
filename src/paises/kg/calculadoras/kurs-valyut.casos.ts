import { definirCasos } from "@/motor/calculo";
import kursValyut from "./kurs-valyut";

const NBKR = "https://www.nbkr.kg/XML/daily.xml";

export default definirCasos(kursValyut, [
  {
    nombre: "100 долларов по курсу на 27 октября 2026 года",
    origen: { tipo: "oficial", url: NBKR, detalle: "Официальный курс USD с 27.10.2026: 87,45 сома. 100 × 87,45 = 8745." },
    fecha: "2026-10-27",
    entrada: { valyuta: "usd", napravlenie: "v-somy", summa: 100 },
    esperado: { rezultat: 8745, kurs: 87.45, fecha: "2026-10-27" },
  },
  {
    nombre: "10 000 сомов в тенге",
    origen: { tipo: "oficial", url: NBKR, detalle: "Курс KZT с 27.10.2026: 0,1934 сома. 10 000 / 0,1934 = 51 706,31." },
    fecha: "2026-10-27",
    entrada: { valyuta: "kzt", napravlenie: "iz-somov", summa: 10000 },
    esperado: { rezultat: 51706.31 },
  },
  {
    nombre: "Курс на 24 октября 2026 года для рубля",
    origen: { tipo: "oficial", url: "https://www.nbkr.kg/EXCEL/dailyrus.xls", detalle: "Курс RUB с 24.10.2026: 1,0752 сома. 1000 × 1,0752 = 1075,20." },
    fecha: "2026-10-25",
    entrada: { valyuta: "rub", napravlenie: "v-somy", summa: 1000 },
    esperado: { rezultat: 1075.2, fecha: "2026-10-25" },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "oficial", url: NBKR, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { valyuta: "eur", napravlenie: "v-somy", summa: 0 },
    esperaError: true,
  },
]);
