import { definirCasos } from "@/motor/calculo";
import tasaDelDolar from "./tasa-del-dolar";

export default definirCasos(tasaDelDolar, [
  {
    nombre: "100 dólares a pesos con la tasa del 6 de octubre",
    origen: { tipo: "oficial", url: "https://www.bancentral.gov.do/", detalle: "Portada del BCRD, tipo de cambio del 6/10/2026: compra 60.8522, venta 61.4111. 100 × 60.8522 = 6,085.22." },
    fecha: "2026-10-07",
    entrada: { direccion: "usd-a-dop", monto: 100 },
    esperado: { compra: 60.8522, venta: 61.4111, fecha: "2026-10-06", pesos: 6085.22 },
  },
  {
    nombre: "10,000 pesos a dólares",
    origen: { tipo: "recalculado", detalle: "10,000 ÷ 61.4111 (venta del 6/10/2026) = 162.84." },
    fecha: "2026-10-07",
    entrada: { direccion: "dop-a-usd", monto: 10000 },
    esperado: { dolares: 162.84 },
  },
  {
    nombre: "Sábado: usa la tasa del viernes",
    origen: {
      tipo: "oficial",
      url: "https://cdn.bancentral.gov.do/documents/estadisticas/mercado-cambiario/documents/TASA_DOLAR_REFERENCIA_MC.xlsx",
      detalle: "Archivo diario del BCRD: el 2/10/2026 compra 60.1698. 100 × 60.1698 = 6,016.98.",
    },
    fecha: "2026-10-03",
    entrada: { direccion: "usd-a-dop", monto: 100 },
    esperado: { compra: 60.1698, fecha: "2026-10-02", pesos: 6016.98 },
  },
]);
