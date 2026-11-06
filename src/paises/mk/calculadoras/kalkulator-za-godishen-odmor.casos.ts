import { definirCasos } from "@/motor/calculo";
import kalkulatorZaGodishenOdmor from "./kalkulator-za-godishen-odmor";

const ZRO = "https://portal.mdt.gov.mk/post-body-files/zakoni-met-file-LaRm.pdf";

export default definirCasos(kalkulatorZaGodishenOdmor, [
  {
    nombre: "Цела година со 20 денови",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 137: најмалку 20 работни денови; член 139: право по 6 месеци." },
    fecha: "2026-11-01",
    entrada: { denovi: 20, meseci: 12, dopolnitelni: false },
    esperado: { denovi: 20, celo: 20, proporcionalni: 20 },
  },
  {
    nombre: "Три месеци работа: пропорционално",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 140: 2 дена за секој месец, 3 × 2 = 6." },
    fecha: "2026-11-01",
    entrada: { denovi: 20, meseci: 3, dopolnitelni: false },
    esperado: { denovi: 6, proporcionalni: 6 },
  },
  {
    nombre: "Шест месеци: цел одмор со дополнителни денови",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 137, став 3: 26 + 3 = 29; член 139: право по 6 месеци." },
    fecha: "2026-11-01",
    entrada: { denovi: 26, meseci: 6, dopolnitelni: true },
    esperado: { denovi: 29, celo: 29 },
  },
  {
    nombre: "Договор со помалку од законскиот минимум",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 137, став 1: 19 денови не се дозволени." },
    fecha: "2026-11-01",
    entrada: { denovi: 19, meseci: 12, dopolnitelni: false },
    esperaError: true,
  },
]);
