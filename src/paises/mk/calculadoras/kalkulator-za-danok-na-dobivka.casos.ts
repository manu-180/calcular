import { definirCasos } from "@/motor/calculo";
import kalkulatorZaDanokNaDobivka from "./kalkulator-za-danok-na-dobivka";

const UJP = "https://www.ujp.gov.mk/mk/vodic/category/537";

export default definirCasos(kalkulatorZaDanokNaDobivka, [
  {
    nombre: "Приход 5.000.000 и добивка 1.000.000 денари",
    origen: { tipo: "recalculado", url: UJP, detalle: "10 % на добивка = 100.000; 1 % на приход = 50.000; пониско 50.000." },
    fecha: "2026-11-01",
    entrada: { prihod: 5000000, dobivka: 1000000 },
    esperado: { redoven: 100000, naPrihod: 50000, povolno: 50000 },
  },
  {
    nombre: "Над прагот: приход 8.000.000 денари",
    origen: { tipo: "recalculado", url: UJP, detalle: "Над 6.000.000 нема данок на вкупен приход; 10 % на 1.000.000 = 100.000." },
    fecha: "2026-11-01",
    entrada: { prihod: 8000000, dobivka: 1000000 },
    esperado: { redoven: 100000, naPrihod: null, povolno: 100000 },
  },
  {
    nombre: "На прагот на годишниот данок: 6.000.000 денари",
    origen: { tipo: "recalculado", url: UJP, detalle: "Опсегот завршува на 6.000.000; 1 % = 60.000." },
    fecha: "2026-11-01",
    entrada: { prihod: 6000000, dobivka: 100000 },
    esperado: { redoven: 10000, naPrihod: 60000, povolno: 10000 },
  },
]);
