import { definirCasos } from "@/motor/calculo";
import kalkulatorZaRegres from "./kalkulator-za-regres";

const KD = "https://portal.mdt.gov.mk/post-body-files/socijalno-partnerstvo-file-kXFT.pdf";

export default definirCasos(kalkulatorZaRegres, [
  {
    nombre: "Основица 45.000 денари, цела година",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 21: 30 % × 45.000 = 13.500." },
    fecha: "2026-11-01",
    entrada: { osnovica: 45000, meseci: 12 },
    esperado: { regres: 13500 },
  },
  {
    nombre: "Пет месеци: без право",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 21: потребни се најмалку 6 месеци." },
    fecha: "2026-11-01",
    entrada: { osnovica: 45000, meseci: 5 },
    esperado: { regres: 0 },
  },
  {
    nombre: "Точно шест месеци",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 21: 30 % × 40.000 = 12.000." },
    fecha: "2026-11-01",
    entrada: { osnovica: 40000, meseci: 6 },
    esperado: { regres: 12000 },
  },
]);
