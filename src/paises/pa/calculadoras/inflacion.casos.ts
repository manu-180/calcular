import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "B/. 500 de agosto de 2025 llevados a agosto de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.inec.gob.pa/avance/Default2.aspx?ID_CATEGORIA=2&ID_CIFRAS=10&ID_IDIOMA=1",
      detalle:
        "Anexo 4 del INEC: IPC agosto 2025 = 99,79064701 y agosto 2026 = 101,98833055, variación interanual 2,2022941 % y mensual 0,1828949 %. 500 × 1,0220229 = 511,01.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 500, desde: "2025-08", hasta: "2026-08" },
    esperado: { actualizado: 511.01, diferencia: 11.01, acumulada: 2.2, mensual: 0.18, interanual: 2.2 },
  },
  {
    nombre: "Primer mes de la base 2024: sin dato interanual",
    origen: {
      tipo: "recalculado",
      detalle: "IPC enero 2024 = 99,923805 y febrero 2024 = 100,263588. 1.000 × 1,0034004 = 1.003,40. No hay febrero 2023 en la base 2024, así que la interanual no se muestra.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2024-01", hasta: "2024-02" },
    esperado: { actualizado: 1003.4, acumulada: 0.34, mensual: 0.34, interanual: null },
  },
  {
    nombre: "Mes de origen igual al mes final",
    origen: { tipo: "recalculado", detalle: "Hacen falta dos meses distintos." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-08", hasta: "2026-08" },
    esperaError: true,
  },
]);
