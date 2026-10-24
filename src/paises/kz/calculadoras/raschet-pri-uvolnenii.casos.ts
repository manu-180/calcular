import { definirCasos } from "@/motor/calculo";
import raschetPriUvolnenii from "./raschet-pri-uvolnenii";

const TK = "https://adilet.zan.kz/rus/docs/K1500000414";

export default definirCasos(raschetPriUvolnenii, [
  {
    nombre: "Сокращение штата: отпуск 10 рабочих дней и компенсация за месяц",
    origen: {
      tipo: "recalculado",
      url: TK,
      detalle: "Средний дневной 6 000 000 / 247 = 24 291,50. За отпуск × 10 = 242 915. Статья 131: компенсация за месяц 24 291,50 × 21 = 510 121,50. Итого 753 036,50.",
    },
    fecha: "2026-10-24",
    entrada: { zarabotok: 6000000, dneyRaboty: 247, dneyOtpuska: 10, zarplata: 0, kompensatsiya: true, prichina: "sokrashchenie", dneyMesyatsa: 21 },
    esperado: { sredniy: 24291.5, zaOtpusk: 242915, poteryaRaboty: 510121.5, itogo: 753036.5 },
  },
  {
    nombre: "Снижение объема производства: две средние месячные зарплаты",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 131, пункт 2: 24 291,50 × 21 × 2 = 1 020 243." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 6000000, dneyRaboty: 247, dneyOtpuska: 0, zarplata: 0, kompensatsiya: true, prichina: "snizhenie", dneyMesyatsa: 21 },
    esperado: { poteryaRaboty: 1020243, itogo: 1020243 },
  },
  {
    nombre: "По собственному желанию: только отпуск и зарплата",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 96: компенсация за отпуск 242 915 плюс зарплата 150 000 = 392 915." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 6000000, dneyRaboty: 247, dneyOtpuska: 10, zarplata: 150000, kompensatsiya: false, prichina: null, dneyMesyatsa: null },
    esperado: { poteryaRaboty: 0, itogo: 392915 },
  },
]);
