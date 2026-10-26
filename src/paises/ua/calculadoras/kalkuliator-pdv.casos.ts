import { definirCasos } from "@/motor/calculo";
import kalkuliatorPdv from "./kalkuliator-pdv";

const PDV = "https://zir.tax.gov.ua/docs/stavki/pdv.pdf";

export default definirCasos(kalkuliatorPdv, [
  {
    nombre: "Нарахувати 20 % на 10 000 грн",
    origen: { tipo: "recalculado", url: PDV, detalle: "10 000 × 20 % = 2000; з ПДВ 12 000." },
    fecha: "2026-10-24",
    entrada: { operatsiia: "dodaty", stavka: "osnovna", suma: 10000 },
    esperado: { pdv: 2000, zPdv: 12000, bezPdv: 10000, stavka: 20 },
  },
  {
    nombre: "Виділити 20 % із 12 000 грн",
    origen: { tipo: "recalculado", url: PDV, detalle: "12 000 × 20 / 120 = 2000; без ПДВ 10 000." },
    fecha: "2026-10-24",
    entrada: { operatsiia: "vydilyty", stavka: "osnovna", suma: 12000 },
    esperado: { pdv: 2000, bezPdv: 10000 },
  },
  {
    nombre: "Ліки: виділити 7 % із 535 грн",
    origen: { tipo: "recalculado", url: PDV, detalle: "535 × 7 / 107 = 35; без ПДВ 500." },
    fecha: "2026-10-24",
    entrada: { operatsiia: "vydilyty", stavka: "likarski", suma: 535 },
    esperado: { pdv: 35, bezPdv: 500 },
  },
  {
    nombre: "Сільгосппродукція: 14 % на 1000 грн",
    origen: { tipo: "recalculado", url: PDV, detalle: "1000 × 14 % = 140." },
    fecha: "2026-10-24",
    entrada: { operatsiia: "dodaty", stavka: "silhosp", suma: 1000 },
    esperado: { pdv: 140, zPdv: 1140 },
  },
  {
    nombre: "Нульова сума",
    origen: { tipo: "recalculado", url: PDV, detalle: "Без суми нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { operatsiia: "dodaty", stavka: "osnovna", suma: 0 },
    esperaError: true,
  },
]);
