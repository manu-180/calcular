import { definirCasos } from "@/motor/calculo";
import calc from "./letni-dopust";

export default definirCasos(calc, [
  { nombre: "Dva otroka", origen: { tipo: "recalculado", detalle: "4 × 5 + 2 = 22; 22 × 6 / 12 = 11" }, fecha: "2026-10-31", entrada: { dniTeden: 5, posebni: false, otroci: 2, meseci: 6 }, esperado: { skupaj: 22, sorazmerni: 11 } },
  { nombre: "Starejši delavec", origen: { tipo: "recalculado", detalle: "20 + 3 = 23" }, fecha: "2026-10-31", entrada: { dniTeden: 5, posebni: true, otroci: 0, meseci: 12 }, esperado: { skupaj: 23 } },
]);
