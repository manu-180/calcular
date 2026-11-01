import { definirCasos } from "@/motor/calculo";
import ardzakmanNpast from "./ardzakman-npast";

const LEY = "https://www.arlis.am/hy/acts/66489/latest";

export default definirCasos(ardzakmanNpast, [
  { nombre: "Կրճատում", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 129 մաս 1: մեկ ամսվա միջին աշխատավարձ." }, fecha: "2026-11-01", entrada: { mijin: 420000, himq: "krchatum", stazh: null, shabat: null }, esperado: { npast: 420000 } },
  { nombre: "1-5 տարի", origen: { tipo: "oficial", url: LEY, detalle: "420 000 / 21 = 20 000. × 25 = 500 000." }, fecha: "2026-11-01", entrada: { mijin: 420000, himq: "anhamapatasxan", stazh: "1-5", shabat: "hing" }, esperado: { npast: 500000, orer: 25, orakan: 20000 } },
  { nombre: "15 տարի և ավելի", origen: { tipo: "oficial", url: LEY, detalle: "20 000 × 44 = 880 000." }, fecha: "2026-11-01", entrada: { mijin: 420000, himq: "anhamapatasxan", stazh: "15", shabat: "hing" }, esperado: { npast: 880000, orer: 44 } },
  { nombre: "Մինչև 1 տարի՝ վեցօրյա շաբաթ", origen: { tipo: "oficial", url: LEY, detalle: "420 000 / 25 = 16 800. × 10 = 168 000." }, fecha: "2026-11-01", entrada: { mijin: 420000, himq: "anhamapatasxan", stazh: "minchev1", shabat: "vets" }, esperado: { npast: 168000 } },
]);
