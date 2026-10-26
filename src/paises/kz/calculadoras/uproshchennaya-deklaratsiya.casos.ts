import { definirCasos } from "@/motor/calculo";
import uproshchennayaDeklaratsiya from "./uproshchennaya-deklaratsiya";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(uproshchennayaDeklaratsiya, [
  {
    nombre: "10 млн тенге за полугодие по ставке 4 %",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 726: 10 000 000 × 4 % = 400 000. Предел 600 000 × 4325 = 2 595 000 000." },
    fecha: "2026-10-24",
    entrada: { dokhod: 10000000, svoyaStavka: false, stavka: null },
    esperado: { nalog: 400000, stavka: 4, predel: 2595000000, ostatok: 9600000 },
  },
  {
    nombre: "Маслихат снизил ставку до 3 %",
    origen: { tipo: "recalculado", url: NK, detalle: "Ставку можно менять на 50 %: от 2 до 6 %. 10 000 000 × 3 % = 300 000." },
    fecha: "2026-10-24",
    entrada: { dokhod: 10000000, svoyaStavka: true, stavka: 3 },
    esperado: { nalog: 300000, stavka: 3 },
  },
  {
    nombre: "Ставка 7 % вне пределов",
    origen: { tipo: "recalculado", url: NK, detalle: "Больше 6 % маслихат установить не может." },
    fecha: "2026-10-24",
    entrada: { dokhod: 10000000, svoyaStavka: true, stavka: 7 },
    esperaError: true,
  },
]);
