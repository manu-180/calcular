import { definirCasos } from "@/motor/calculo";
import podatokZProdazhuNeruhomosti from "./podatok-z-prodazhu-neruhomosti";

const PDFO = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(podatokZProdazhuNeruhomosti, [
  {
    nombre: "Квартира у власності менше 3 років за 2 000 000 грн",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 5 % = 100 000; ВЗ 5 % = 100 000 (ЗІР 126.02: дохід від продажу нерухомості є обʼєктом ВЗ); разом 200 000." },
    fecha: "2026-10-24",
    entrada: { vypadok: "druhyi", suma: 2000000 },
    esperado: { pdfo: 100000, vz: 100000, razom: 200000, stavka: 5, zalyshyt: 1800000 },
  },
  {
    nombre: "Перший продаж за рік, понад 3 роки у власності",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Не оподатковується: 0." },
    fecha: "2026-10-24",
    entrada: { vypadok: "pilha", suma: 2000000 },
    esperado: { razom: 0, stavka: 0, zalyshyt: 2000000 },
  },
  {
    nombre: "Третій продаж за рік",
    origen: { tipo: "recalculado", url: PDFO, detalle: "ПДФО 18 % від 1 500 000 = 270 000; ВЗ 75 000; разом 345 000." },
    fecha: "2026-10-24",
    entrada: { vypadok: "tretii", suma: 1500000 },
    esperado: { pdfo: 270000, vz: 75000, razom: 345000 },
  },
  {
    nombre: "Нульова вартість",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Без вартості податку немає." },
    fecha: "2026-10-24",
    entrada: { vypadok: "druhyi", suma: 0 },
    esperaError: true,
  },
]);
