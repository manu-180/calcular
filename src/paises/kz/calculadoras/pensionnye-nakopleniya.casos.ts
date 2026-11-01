import { definirCasos } from "@/motor/calculo";
import pensionnyeNakopleniya from "./pensionnye-nakopleniya";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";

export default definirCasos(pensionnyeNakopleniya, [
  {
    nombre: "500 000 тенге, 10 лет без доходности",
    origen: { tipo: "recalculado", url: SK, detalle: "ОПВ 50 000 + ОПВР 3,5 % = 17 500; 67 500 × 120 месяцев = 8 100 000." },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, nakopleno: 0, let: 10, dokhodnost: 0, opvr: true },
    esperado: { itogo: 8100000, vMesyats: 67500, vznosyOpv: 6000000, vznosyOpvr: 2100000, dokhod: 0 },
  },
  {
    nombre: "500 000 тенге, 10 лет при 10 % в год",
    origen: { tipo: "recalculado", url: SK, detalle: "Ежемесячная капитализация: 67 500 × ((1 + 0,1/12)^120 − 1) / (0,1/12) = 13 827 036,08." },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, nakopleno: 0, let: 10, dokhodnost: 10, opvr: true },
    esperado: { itogo: 13827036.08 },
    tolerancia: 0.05,
  },
  {
    nombre: "Родился до 1975 года: только ОПВ",
    origen: { tipo: "recalculado", url: SK, detalle: "ОПВ 50 000 × 120 = 6 000 000, ОПВР не платятся." },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, nakopleno: 0, let: 10, dokhodnost: 0, opvr: false },
    esperado: { itogo: 6000000, vznosyOpvr: 0 },
  },
]);
