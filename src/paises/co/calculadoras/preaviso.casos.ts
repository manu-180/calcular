import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Contrato que vence el 31 de diciembre",
    origen: { tipo: "recalculado", detalle: "CST art. 46 (Ley 2466): 30 días antes del vencimiento. 31/12/2026 − 30 = 1/12/2026; desde el 15/10 quedan 47 días." },
    fecha: "2026-10-15",
    entrada: { vencimiento: "2026-12-31" },
    esperado: { limite: "2026-12-01", quedan: 47 },
  },
  {
    nombre: "Plazo vencido",
    origen: { tipo: "recalculado", detalle: "Vence el 1/11/2026: había que avisar hasta el 2/10/2026." },
    fecha: "2026-10-15",
    entrada: { vencimiento: "2026-11-01" },
    esperado: { limite: "2026-10-02", quedan: null, estado: "Ya pasó el plazo: si nadie avisó, el contrato se renueva por el mismo término" },
  },
]);
