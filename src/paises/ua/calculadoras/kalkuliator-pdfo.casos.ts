import { definirCasos } from "@/motor/calculo";
import kalkuliatorPdfo from "./kalkuliator-pdfo";

const PDFO = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(kalkuliatorPdfo, [
  {
    nombre: "Оренда квартири 15 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 18 % = 2700; ВЗ 5 % = 750 (ЗІР 126.02: оренда оподатковується ВЗ 5 %); залишиться 11 550." },
    fecha: "2026-10-24",
    entrada: { vyd: "orenda", suma: 15000 },
    esperado: { pdfo: 2700, vz: 750, chystyi: 11550, razom: 3450, stavka: 18 },
  },
  {
    nombre: "Дивіденди від української компанії 100 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 5 % = 5000; ВЗ 5 % = 5000; залишиться 90 000." },
    fecha: "2026-10-24",
    entrada: { vyd: "dyvRezydent", suma: 100000 },
    esperado: { pdfo: 5000, vz: 5000, chystyi: 90000, stavka: 5 },
  },
  {
    nombre: "Дивіденди від нерезидента 100 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 9 % = 9000; ВЗ 5 % = 5000; залишиться 86 000." },
    fecha: "2026-10-24",
    entrada: { vyd: "dyvInshi", suma: 100000 },
    esperado: { pdfo: 9000, chystyi: 86000, stavka: 9 },
  },
  {
    nombre: "Виграш 10 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 18 % = 1800; ВЗ 500; залишиться 7700." },
    fecha: "2026-10-24",
    entrada: { vyd: "vyhrash", suma: 10000 },
    esperado: { chystyi: 7700 },
  },
  {
    nombre: "Нульовий дохід",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Без доходу нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { vyd: "orenda", suma: 0 },
    esperaError: true,
  },
]);
