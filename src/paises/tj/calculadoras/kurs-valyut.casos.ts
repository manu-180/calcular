import { definirCasos } from "@/motor/calculo";
import kursValyut from "./kurs-valyut";

const NBT = "https://nbt.tj/ru/kurs/kurs.php";

export default definirCasos(kursValyut, [
  {
    nombre: "100 долларов по курсу на 29 октября 2026 года",
    origen: { tipo: "oficial", url: NBT, detalle: "Официальный курс USD на 29.10.2026: 9,2174 сомони. 100 × 9,2174 = 921,74." },
    fecha: "2026-10-29",
    entrada: { valyuta: "usd", napravlenie: "v-somoni", summa: 100 },
    esperado: { rezultat: 921.74, kurs: 9.2174, fecha: "2026-10-29" },
  },
  {
    nombre: "10 000 сомони в российские рубли",
    origen: { tipo: "oficial", url: NBT, detalle: "Курс RUB на 29.10.2026: 0,1142 сомони. 10 000 / 0,1142 = 87 565,67." },
    fecha: "2026-10-29",
    entrada: { valyuta: "rub", napravlenie: "iz-somoni", summa: 10000 },
    esperado: { rezultat: 87565.67 },
  },
  {
    nombre: "Тенге: в ленте номинал 10, калькулятор считает за единицу",
    origen: { tipo: "oficial", url: NBT, detalle: "Курс KZT на 29.10.2026: 0,2017 сомони за 10 тенге, то есть 0,02017 за один. 5000 × 0,02017 = 100,85." },
    fecha: "2026-10-29",
    entrada: { valyuta: "kzt", napravlenie: "v-somoni", summa: 5000 },
    esperado: { rezultat: 100.85 },
  },
  {
    nombre: "Евро по курсу на 1 сентября 2026 года",
    origen: { tipo: "oficial", url: NBT, detalle: "Курс EUR на 01.09.2026: 10,727 сомони. 50 × 10,727 = 536,35." },
    fecha: "2026-09-01",
    entrada: { valyuta: "eur", napravlenie: "v-somoni", summa: 50 },
    esperado: { rezultat: 536.35, fecha: "2026-09-01" },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "recalculado", detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-29",
    entrada: { valyuta: "cny", napravlenie: "v-somoni", summa: 0 },
    esperaError: true,
  },
]);
