import { definirCasos } from "@/motor/calculo";
import yesvDliaFop from "./yesv-dlia-fop";

const ZIR = "https://zir.tax.gov.ua/main/bz/search/?src=ques";

export default definirCasos(yesvDliaFop, [
  {
    nombre: "Мінімальний ЄСВ за квартал 2026",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/docs/stavki/esv.pdf", detalle: "8647 × 22 % = 1902,34 на місяць; за квартал 5707,02; за рік 22 828,08." },
    fecha: "2026-10-24",
    entrada: { baza: 8647, misiatsi: 3 },
    esperado: { naMisiats: 1902.34, razom: 5707.02, zaRik: 22828.08, minimum: 1902.34, maksimum: 38046.8 },
  },
  {
    nombre: "База 20 000 грн за місяць",
    origen: { tipo: "recalculado", url: ZIR, detalle: "20 000 × 22 % = 4400; за 3 місяці 13 200." },
    fecha: "2026-10-24",
    entrada: { baza: 20000, misiatsi: 3 },
    esperado: { naMisiats: 4400, razom: 13200 },
  },
  {
    nombre: "База понад максимальну",
    origen: { tipo: "recalculado", url: ZIR, detalle: "Максимальна база 20 × 8647 = 172 940; ЄСВ 38 046,80." },
    fecha: "2026-10-24",
    entrada: { baza: 300000, misiatsi: 1 },
    esperado: { baza: 172940, naMisiats: 38046.8 },
  },
  {
    nombre: "База нижча за мінімальну",
    origen: { tipo: "recalculado", url: ZIR, detalle: "База не може бути меншою за мінімальну зарплату: 1902,34." },
    fecha: "2026-10-24",
    entrada: { baza: 3000, misiatsi: 1 },
    esperado: { baza: 8647, naMisiats: 1902.34 },
  },
]);
