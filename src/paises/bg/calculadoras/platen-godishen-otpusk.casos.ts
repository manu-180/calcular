import { definirCasos } from "@/motor/calculo";
import calc from "./platen-godishen-otpusk";

const KT = "https://www.noi.bg/wp-content/uploads/KT-2.pdf";

export default definirCasos(calc, [
  {
    nombre: "10 дни отпуск при 1500 евро",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 177: 1500 / 21 = 71,43 на ден; за 10 дни 714,29. Чл. 155: 20 дни за година." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, rabotniDni: 21, dniOtpusk: 10, dopalnitelni: 0, mesetsi: 12 },
    esperado: { zaplashtane: 714.29, sredenDen: 71.43, polagashti: 20, godishno: 20 },
  },
  {
    nombre: "Половин година с 5 допълнителни дни",
    origen: { tipo: "recalculado", url: KT, detalle: "(20 + 5) × 6 / 12 = 12,5 дни." },
    fecha: "2026-10-31",
    entrada: { bruto: 2000, rabotniDni: 20, dniOtpusk: 5, dopalnitelni: 5, mesetsi: 6 },
    esperado: { zaplashtane: 500, polagashti: 12.5 },
  },
]);
