import { definirCasos } from "@/motor/calculo";
import zarplataNaRuki from "./zarplata-na-ruki";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(zarplataNaRuki, [
  {
    nombre: "408 975 тенге на руки = 500 000 тенге начислено",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "Обратный расчет: 500 000 − ОПВ 50 000 − ВОСМС 10 000 − ИПН 31 025 = 408 975. При 499 999 тенге на руки 408 974,21.",
    },
    fecha: "2026-10-24",
    entrada: { naRuki: 408975, vychet: true },
    esperado: { brutto: 500000, ipn: 31025, netto: 408975 },
  },
  {
    nombre: "74 800 тенге на руки = МЗП",
    origen: { tipo: "recalculado", url: NK, detalle: "85 000 − 8500 − 1700 = 74 800, ИПН 0 из-за вычета." },
    fecha: "2026-10-24",
    entrada: { naRuki: 74800, vychet: true },
    esperado: { brutto: 85000, ipn: 0 },
  },
  {
    nombre: "396 000 тенге на руки без вычета",
    origen: { tipo: "recalculado", url: NK, detalle: "500 000 − 50 000 − 10 000 − 44 000 = 396 000." },
    fecha: "2026-10-24",
    entrada: { naRuki: 396000, vychet: false },
    esperado: { brutto: 500000, netto: 396000 },
  },
  {
    nombre: "Ноль на руки",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { naRuki: 0, vychet: true },
    esperaError: true,
  },
]);
