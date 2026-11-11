import { definirCasos } from "@/motor/calculo";
import kalkulatorZaPersonalenDanok from "./kalkulator-za-personalen-danok";

const UJP = "https://www.ujp.gov.mk/mk/vodic/category/643";

export default definirCasos(kalkulatorZaPersonalenDanok, [
  {
    nombre: "60.000 денари бруто",
    origen: { tipo: "recalculado", url: UJP, detalle: "60.000 − 16.800 − 10.932 = 32.268; 10 % = 3.226,8; годишно 38.721,6; ефективно 5,4 %." },
    fecha: "2026-11-01",
    entrada: { bruto: 60000 },
    esperado: { danok: 3227, godishno: 38722, osnovica: 32268, oslobuduvanje: 10932, efektivna: 5.4 },
  },
  {
    nombre: "Ниска плата без данок: 15.000 денари",
    origen: { tipo: "recalculado", url: UJP, detalle: "Придонеси на најниската основица 9.679,74; основица 15.000 − 9.679,74 − 10.932 е негативна, данокот е нула." },
    fecha: "2026-11-01",
    entrada: { bruto: 15000 },
    esperado: { danok: 0, osnovica: 0 },
  },
]);
