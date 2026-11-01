import { definirCasos } from "@/motor/calculo";
import dekretuliShvebuleba from "./dekretuli-shvebuleba";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(dekretuliShvebuleba, [
  {
    nombre: "ჩვეულებრივი შემთხვევა",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 37: 126 + 57 = 183; 126 + 604 = 730; 1 ნოემბრიდან 183-ე დღე არის 2 მაისი." },
    fecha: "2026-11-01",
    entrada: { gartuleba: false, dasatskisi: "2026-11-01" },
    esperado: { anazghaurebadi: 183, sul: 730, bolo: "2027-05-02" },
  },
  {
    nombre: "გართულება ან ტყუპი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 37: 143 + 57 = 200; 143 + 587 = 730; 200-ე დღე არის 19 მაისი." },
    fecha: "2026-11-01",
    entrada: { gartuleba: true, dasatskisi: "2026-11-01" },
    esperado: { anazghaurebadi: 200, dekreti: 143, movla: 587, bolo: "2027-05-19" },
  },
]);
