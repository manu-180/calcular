import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "Cien dólares el 7/10/2026",
    origen: {
      tipo: "oficial",
      url: "https://servicios.bcn.gob.ni/Tc_Servicio/ServicioTC.asmx",
      detalle: "BCN, RecuperaTC_Dia(2026, 10, 7) = 36.6243. 100 × 36.6243 = 3662.43.",
    },
    fecha: "2026-10-07",
    entrada: { sentido: "a-cordobas", monto: 100 },
    esperado: { tipoCambio: 36.6243, fecha: "2026-10-07", cordobas: 3662.43, dolares: null },
  },
  {
    nombre: "Diez mil córdobas a dólares",
    origen: { tipo: "recalculado", detalle: "10000 / 36.6243 = 273.04." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-dolares", monto: 10000 },
    esperado: { dolares: 273.04, cordobas: null },
  },
  {
    nombre: "Fin de año: el valor ya publicado para el 31/12/2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bcn.gob.ni/sites/default/files/noticias/notas_prensa/2025/np_tcdeslizamineto201025.pdf",
      detalle: "Deslizamiento 0 % en 2026: 36.6243 todo el año. 250 × 36.6243 = 9156.08.",
    },
    fecha: "2026-12-31",
    entrada: { sentido: "a-cordobas", monto: 250 },
    esperado: { tipoCambio: 36.6243, fecha: "2026-12-31", cordobas: 9156.08 },
  },
]);
