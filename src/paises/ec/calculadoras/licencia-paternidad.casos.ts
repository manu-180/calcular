import { definirCasos } from "@/motor/calculo";
import licenciaPaternidad from "./licencia-paternidad";

export default definirCasos(licenciaPaternidad, [
  {
    nombre: "Parto normal: quince días",
    origen: { tipo: "recalculado", detalle: "Art. 152 del Código del Trabajo (reforma del 12/5/2023): 15 días desde el 1/10/2026, último día 15/10/2026, regreso 16/10/2026." },
    fecha: "2026-10-01",
    entrada: { nacimiento: "2026-10-01", parto: "normal", prematuro: false, grave: false },
    esperado: { dias: 15, fin: "2026-10-15", regreso: "2026-10-16" },
  },
  {
    nombre: "Cesárea y bebé prematuro",
    origen: { tipo: "recalculado", detalle: "15 + 5 (cesárea) + 8 (prematuro) = 28 días desde el 1/10/2026: último día 28/10/2026." },
    fecha: "2026-10-01",
    entrada: { nacimiento: "2026-10-01", parto: "cesarea", prematuro: true, grave: false },
    esperado: { dias: 28, fin: "2026-10-28" },
  },
  {
    nombre: "Enfermedad grave o discapacidad severa",
    origen: { tipo: "recalculado", detalle: "Licencia de 25 días desde el 1/10/2026: último día 25/10/2026." },
    fecha: "2026-10-01",
    entrada: { nacimiento: "2026-10-01", parto: "normal", prematuro: false, grave: true },
    esperado: { dias: 25, fin: "2026-10-25" },
  },
]);
