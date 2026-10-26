import { definirCasos } from "@/motor/calculo";
import ypologismosPlithorismou from "./ypologismos-plithorismou";

const ELSTAT = "https://www.statistics.gr/el/statistics/-/publication/DKT87/-";

export default definirCasos(ypologismosPlithorismou, [
  {
    nombre: "Σεπτέμβριος 2025 έως Σεπτέμβριος 2026: 5,0%",
    origen: { tipo: "oficial", url: ELSTAT, detalle: "ΕΛΣΤΑΤ: ετήσιος πληθωρισμός Σεπτεμβρίου 2026 5,0%. Δείκτες 122,0603 και 128,2234: 1000 × 1,05049 = 1050,49." },
    fecha: "2026-10-24",
    entrada: { poso: 1000, apo: "2025-09-01", eos: "2026-09-30" },
    esperado: { simera: 1050.49, diafora: 50.49 },
  },
  {
    nombre: "Ιανουάριος 2020 έως σήμερα: φτάνει στον Σεπτέμβριο του 2026",
    origen: { tipo: "recalculado", url: ELSTAT, detalle: "Ιανουάριος 2020 100,4932, Σεπτέμβριος 2026 128,2234: συντελεστής 1,27594, 1000 → 1275,94." },
    fecha: "2026-10-24",
    entrada: { poso: 1000, apo: "2020-01-01", eos: "2026-10-24" },
    esperado: { simera: 1275.94, axia: 783.74, minasEos: "Σεπτέμβριος 2026" },
  },
  {
    nombre: "Μήνας χωρίς δημοσίευση",
    origen: { tipo: "recalculado", url: ELSTAT, detalle: "Ο Οκτώβριος 2026 δεν έχει δημοσιευθεί στις 24.10.2026." },
    fecha: "2026-10-24",
    entrada: { poso: 1000, apo: "2026-10-01", eos: "2026-10-24" },
    esperaError: true,
  },
]);
