import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "ولادة في 1 ديسمبر 2026 مع 15 يومًا قبلها",
    origen: { tipo: "recalculado", detalle: "تبدأ في 16 نوفمبر 2026 وتستمر أربعة أشهر حتى 15 مارس 2027: 120 يومًا، منها 105 أيام بعد الولادة." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", diasAntes: 15, previas: 0 },
    esperado: { inicio: "2026-11-16", fin: "2027-03-15", diasDespues: 105, diasTotal: 120 },
  },
  {
    nombre: "90 يومًا قبل الولادة لا تترك 45 يومًا بعدها",
    origen: { tipo: "recalculado", detalle: "تنتهي الإجازة في 1 يناير 2027، أي 32 يومًا فقط بعد الولادة." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", diasAntes: 90, previas: 0 },
    esperaError: true,
  },
  {
    nombre: "ثلاث إجازات سابقة",
    origen: { tipo: "recalculado", detalle: "المادة 54: لا تُستحق أكثر من ثلاث مرات." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", diasAntes: 0, previas: 3 },
    esperado: { fin: null, diasTotal: 0 },
  },
]);
