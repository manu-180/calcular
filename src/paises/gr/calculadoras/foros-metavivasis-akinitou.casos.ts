import { definirCasos } from "@/motor/calculo";
import forosMetavivasisAkinitou from "./foros-metavivasis-akinitou";

const KFP = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100130.pdf";

export default definirCasos(forosMetavivasisAkinitou, [
  {
    nombre: "Τίμημα 150.000 € πάνω από την αντικειμενική",
    origen: { tipo: "recalculado", url: KFP, detalle: "Άρθρο 25: ο φόρος στη μεγαλύτερη αξία. 150000 × 3% = 4500, + 3% υπέρ δήμων = 135. Σύνολο 4635 (3,09%)." },
    fecha: "2026-10-24",
    entrada: { timima: 150000, antikeimeniki: 120000, meridio: 100 },
    esperado: { axia: 150000, foros: 4500, dimoi: 135, synolo: 4635, syntelestis: 3.09 },
  },
  {
    nombre: "Μισό ακίνητο, αντικειμενική μεγαλύτερη",
    origen: { tipo: "recalculado", url: KFP, detalle: "Άρθρο 25 παρ. 3: αναλογούσα αξία. 100000 × 50% = 50000 × 3% = 1500, + 45. Σύνολο 1545." },
    fecha: "2026-10-24",
    entrada: { timima: 80000, antikeimeniki: 100000, meridio: 50 },
    esperado: { axia: 50000, synolo: 1545, vasi: "Αντικειμενική αξία" },
  },
  {
    nombre: "Χωρίς αξίες",
    origen: { tipo: "recalculado", url: KFP, detalle: "Χωρίς τίμημα και αντικειμενική αξία δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { timima: 0, antikeimeniki: 0, meridio: 100 },
    esperaError: true,
  },
]);
