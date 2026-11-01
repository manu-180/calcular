import { definirCasos } from "@/motor/calculo";
import kalkulatorNetoVoBruto from "./kalkulator-neto-vo-bruto";

const UJP = "https://www.ujp.gov.mk/mk/vodic/category/643";

export default definirCasos(kalkulatorNetoVoBruto, [
  {
    nombre: "40.000 денари нето",
    origen: { tipo: "recalculado", url: UJP, detalle: "(40.000 − 1.093,2) / 0,648 = 60.041,36; придонеси 28 % = 16.811,58; данок 3.229,78." },
    fecha: "2026-11-01",
    entrada: { neto: 40000 },
    esperado: { bruto: 60041, pridonesi: 16812, danok: 3230 },
  },
  {
    nombre: "Под најниската основица: 15.000 денари нето",
    origen: { tipo: "recalculado", url: UJP, detalle: "Придонеси на 34.570,5 = 9.679,74. Нето = 0,9 × бруто − 9.679,74 + 0,1 × (9.679,74 + 10.932), значи бруто = (15.000 + 7.618,57) / 0,9 = 25.131,74; данок 452." },
    fecha: "2026-11-01",
    entrada: { neto: 15000 },
    esperado: { bruto: 25132, pridonesi: 9680, danok: 452 },
  },
  {
    nombre: "Нулта плата",
    origen: { tipo: "recalculado", url: UJP, detalle: "Без нето-плата нема пресметка." },
    fecha: "2026-11-01",
    entrada: { neto: 0 },
    esperaError: true,
  },
]);
