import { definirCasos } from "@/motor/calculo";
import podatokZProdazhuAvto from "./podatok-z-prodazhu-avto";

const PDFO = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(podatokZProdazhuAvto, [
  {
    nombre: "Перший продаж за рік",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Продаж один раз на рік легкового автомобіля не оподатковується." },
    fecha: "2026-10-24",
    entrada: { yakyi: "pershyi", rezydent: true, suma: 400000 },
    esperado: { razom: 0, stavka: 0, zalyshyt: 400000 },
  },
  {
    nombre: "Другий продаж за рік, 400 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 5 % = 20 000; ВЗ 5 % = 20 000 (ЗІР 126.02: дохід від продажу рухомого майна); разом 40 000." },
    fecha: "2026-10-24",
    entrada: { yakyi: "druhyi", rezydent: true, suma: 400000 },
    esperado: { pdfo: 20000, vz: 20000, razom: 40000, stavka: 5 },
  },
  {
    nombre: "Третій продаж за рік, 300 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 18 % = 54 000; ВЗ 15 000; разом 69 000." },
    fecha: "2026-10-24",
    entrada: { yakyi: "tretii", rezydent: true, suma: 300000 },
    esperado: { razom: 69000, stavka: 18 },
  },
  {
    nombre: "Нерезидент, другий продаж",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Для нерезидентів продаж більше одного обʼєкта: 18 %; 300 000 × 18 % = 54 000; ВЗ 15 000." },
    fecha: "2026-10-24",
    entrada: { yakyi: "druhyi", rezydent: false, suma: 300000 },
    esperado: { pdfo: 54000, vz: 15000 },
  },
  {
    nombre: "Нульова ціна",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Без ціни податку немає." },
    fecha: "2026-10-24",
    entrada: { yakyi: "druhyi", rezydent: true, suma: 0 },
    esperaError: true,
  },
]);
