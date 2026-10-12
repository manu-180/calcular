import { definirCasos } from "@/motor/calculo";
import certificadoDeDeposito from "./certificado-de-deposito";

export default definirCasos(certificadoDeDeposito, [
  {
    nombre: "₡1.000.000 a 180 días al 5 %, base 360",
    origen: {
      tipo: "recalculado",
      detalle: "1.000.000 × 5 % × 180 / 360 = 25.000. Retención 15 % (Ley 7092, art. 31 ter) = 3.750. Neto 21.250; al vencimiento 1.021.250.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 1000000, tasa: 5, plazo: 180, base: "360", emisor: "general" },
    esperado: { interes: 25000, impuesto: 3750, neto: 21250, total: 1021250, tbp: 3.57 },
  },
  {
    nombre: "Título de vivienda a un año, base 365",
    origen: { tipo: "recalculado", detalle: "2.000.000 × 4 % × 365 / 365 = 80.000. Retención 7 % = 5.600. Neto 74.400." },
    fecha: "2026-10-12",
    entrada: { monto: 2000000, tasa: 4, plazo: 365, base: "365", emisor: "vivienda" },
    esperado: { interes: 80000, impuesto: 5600, neto: 74400 },
  },
]);
