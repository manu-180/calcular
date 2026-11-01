import { definirCasos } from "@/motor/calculo";
import droshmanishayinVchar from "./droshmanishayin-vchar";

const LEY = "https://www.arlis.am/hy/acts/218669/latest";

export default definirCasos(droshmanishayinVchar, [
  {
    nombre: "Աշխատող՝ 400 000 դրամ",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 12 մաս 1 կետ 1: 200 001 դրամից մինչև 500 000 դրամ՝ 1000 դրամ." },
    fecha: "2026-11-01",
    entrada: { tesak: "ashkhatogh", gumar: 400000 },
    esperado: { vchar: 1000, tarekan: 12000 },
  },
  {
    nombre: "Աշխատող՝ 1 000 001 դրամ",
    origen: { tipo: "oficial", url: LEY, detalle: "1 000 001 դրամ և ավելի՝ 15000 դրամ." },
    fecha: "2026-11-01",
    entrada: { tesak: "ashkhatogh", gumar: 1000001 },
    esperado: { vchar: 15000 },
  },
  {
    nombre: "Ձեռնարկատեր՝ 12 000 000 դրամ",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 12 մաս 1 կետ 2: մինչև 12 000 000 դրամ՝ 12000 դրամ." },
    fecha: "2026-11-01",
    entrada: { tesak: "dzernarkater", gumar: 12000000 },
    esperado: { vchar: 12000 },
  },
  {
    nombre: "Ձեռնարկատեր՝ 12 000 001 դրամ",
    origen: { tipo: "oficial", url: LEY, detalle: "12 000 001 դրամ և ավելի՝ 120 000 դրամ." },
    fecha: "2026-11-01",
    entrada: { tesak: "dzernarkater", gumar: 12000001 },
    esperado: { vchar: 120000 },
  },
]);
