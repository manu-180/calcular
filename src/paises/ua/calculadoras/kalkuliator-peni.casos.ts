import { definirCasos } from "@/motor/calculo";
import kalkuliatorPeni from "./kalkuliator-peni";

const VS = "https://supreme.court.gov.ua/supreme/pro_sud/rishennya_obedn_palati_kgs_vs/2020_06_05_922_3578_18";

export default definirCasos(kalkuliatorPeni, [
  {
    nombre: "Справа № 922/3578/18: пеня в межах подвійної облікової ставки",
    origen: { tipo: "oficial", url: VS, detalle: "Верховний Суд: пеня в межах подвійної облікової ставки НБУ від суми боргу 119 810,14 грн за період з 22.03.2018 по 22.09.2018 становить 20 935,59 грн." },
    fecha: "2026-10-24",
    entrada: { borh: 119810.14, vid: "2018-03-22", do: "2018-09-22", dohovir: null },
    esperado: { penia: 20935.59, dni: 185 },
  },
  {
    nombre: "Договірна пеня менша за граничну",
    origen: { tipo: "recalculado", url: VS, detalle: "0,01 % за день від 100 000 = 10 грн; 30 днів квітня 2026 = 300. Граничний розмір: 100 000 × 2 × 15 % / 365 × 30 = 2465,75." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, vid: "2026-04-01", do: "2026-04-30", dohovir: 0.01 },
    esperado: { penia: 300, granychna: 2465.75, dni: 30 },
  },
  {
    nombre: "Договірна пеня 0,5 % обмежується граничною",
    origen: { tipo: "recalculado", url: VS, detalle: "0,5 % за день = 500 грн більше за 82,19 грн; пеня дорівнює граничній 2465,75." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, vid: "2026-04-01", do: "2026-04-30", dohovir: 0.5 },
    esperado: { penia: 2465.75 },
  },
  {
    nombre: "Зміна облікової ставки 18.09.2026",
    origen: { tipo: "recalculado", url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/key?json", detalle: "10.09 до 17.09: 8 днів × 15,5 %; 18.09 до 30.09: 13 днів × 16 %. 100 000 × 2 × (8 × 15,5 + 13 × 16) / 100 / 365 = 1819,18." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, vid: "2026-09-10", do: "2026-09-30", dohovir: null },
    esperado: { penia: 1819.18, dni: 21 },
  },
  {
    nombre: "Кінець раніше за початок",
    origen: { tipo: "recalculado", url: VS, detalle: "Останній день не може бути раніше за перший." },
    fecha: "2026-10-24",
    entrada: { borh: 1000, vid: "2026-05-10", do: "2026-05-01", dohovir: null },
    esperaError: true,
  },
]);
