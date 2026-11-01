import { definirCasos } from "@/motor/calculo";
import calculadora from "./kitzbat-nechut";

const URL = "https://www.btl.gov.il/benefits/Disability/Pages/%D7%A9%D7%99%D7%A2%D7%95%D7%A8%D7%99%20%D7%94%D7%A7%D7%A6%D7%91%D7%94.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Grado pleno, solo",
    origen: { tipo: "oficial", url: URL, detalle: "Grado pleno (100% o 75%): 4.711 por mes desde el 01.01.2026." },
    fecha: "2026-10-26",
    entrada: { darga: "male", yeladim: 0, zug: false, hachnasatZug: 0 },
    esperado: { sach: 4711, tosefetYeladim: 0, tosefetZug: 0 },
  },
  {
    nombre: "Grado pleno con cónyuge y tres hijos",
    origen: { tipo: "recalculado", detalle: "4.711 + 2 x 1.214 (solo dos hijos) + 1.518 = 8.657." },
    fecha: "2026-10-26",
    entrada: { darga: "male", yeladim: 3, zug: true, hachnasatZug: 5000 },
    esperado: { kitzba: 4711, tosefetYeladim: 2428, tosefetZug: 1518, sach: 8657 },
  },
  {
    nombre: "74 % con un hijo y cónyuge sobre el tope",
    origen: { tipo: "recalculado", detalle: "3.211 + 898; el cónyuge gana 9.000 > 7.848, sin תוספת. Total 4.109." },
    fecha: "2026-10-26",
    entrada: { darga: "chelki-74", yeladim: 1, zug: true, hachnasatZug: 9000 },
    esperado: { tosefetYeladim: 898, tosefetZug: 0, sach: 4109 },
  },
  {
    nombre: "60 % con dos hijos",
    origen: { tipo: "recalculado", detalle: "2.718 + 2 x 728 = 4.174." },
    fecha: "2026-10-26",
    entrada: { darga: "chelki-60", yeladim: 2, zug: false, hachnasatZug: 0 },
    esperado: { sach: 4174 },
  },
]);
