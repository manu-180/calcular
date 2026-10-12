import { definirCasos } from "@/motor/calculo";
import aguinaldoPensionados from "./aguinaldo-pensionados";

export default definirCasos(aguinaldoPensionados, [
  {
    nombre: "Navidad 2026 con dos cargas",
    origen: {
      tipo: "oficial",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/02/05/44368-B/01/2766382.pdf",
      detalle: "Ley 21.806, art. 5: aguinaldo de Navidad 2026 de $29.055, más $16.415 por carga. 29.055 + 2 × 16.415 = 61.885.",
    },
    fecha: "2026-10-07",
    entrada: { aguinaldo: "navidad", cargas: 2 },
    esperado: { base: 29055, incremento: 32830, total: 61885 },
  },
  {
    nombre: "Fiestas Patrias 2026 sin cargas",
    origen: {
      tipo: "oficial",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/02/05/44368-B/01/2766382.pdf",
      detalle: "Ley 21.806, art. 5: aguinaldo de Fiestas Patrias 2026 de $25.280.",
    },
    fecha: "2026-09-10",
    entrada: { aguinaldo: "fiestas-patrias", cargas: 0 },
    esperado: { total: 25280 },
  },
  {
    nombre: "Fiestas Patrias 2026 con una carga",
    origen: { tipo: "recalculado", detalle: "25.280 + 12.969 = 38.249." },
    fecha: "2026-09-10",
    entrada: { aguinaldo: "fiestas-patrias", cargas: 1 },
    esperado: { total: 38249 },
  },
]);
