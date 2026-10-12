import { definirCasos } from "@/motor/calculo";
import ajusteAlquiler from "./ajuste-alquiler";

export default definirCasos(ajusteAlquiler, [
  {
    nombre: "Ajuste anual en octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/IPC/Base%20Octubre%202022=100/IPC%20gral%20y%20variaciones_base%202022.xlsx",
      detalle: "IPC del INE: setiembre de 2025 = 113,80957493 y setiembre de 2026 = 119,13131514. Variación 4,676 % (el INE informa 4,68 % en 12 meses). 30.000 × 1,0467600 = 31.402,80.",
    },
    fecha: "2026-10-12",
    entrada: { alquiler: 30000, ultimo: "2025-10-01", nuevo: "2026-10-01" },
    esperado: { nuevoAlquiler: 31402.8, aumento: 1402.8, mesDesde: "setiembre de 2025", mesHasta: "setiembre de 2026" },
  },
  {
    nombre: "Ajuste en setiembre: IPC de agosto",
    origen: { tipo: "recalculado", detalle: "IPC agosto 2026 118,4878636 / agosto 2025 113,32908103 = 1,0455204. 30.000 × 1,0455204 = 31.365,61." },
    fecha: "2026-10-12",
    entrada: { alquiler: 30000, ultimo: "2025-09-15", nuevo: "2026-09-15" },
    esperado: { nuevoAlquiler: 31365.61 },
  },
  {
    nombre: "Ajuste que todavía no tiene IPC",
    origen: { tipo: "recalculado", detalle: "Para noviembre de 2026 haría falta el IPC de octubre, que no salió: se usa setiembre de 2026." },
    fecha: "2026-10-12",
    entrada: { alquiler: 30000, ultimo: "2025-10-01", nuevo: "2026-11-01" },
    esperado: { nuevoAlquiler: 31402.8, mesHasta: "setiembre de 2026" },
  },
  {
    nombre: "Fechas al revés",
    origen: { tipo: "recalculado", detalle: "El nuevo ajuste no puede ser antes del último." },
    fecha: "2026-10-12",
    entrada: { alquiler: 30000, ultimo: "2026-10-01", nuevo: "2025-10-01" },
    esperaError: true,
  },
]);
