import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "Cien dólares con el tipo de cambio del 7 de octubre",
    origen: { tipo: "oficial", url: "https://www.banguat.gob.gt/tipo_cambio/", detalle: "Banguat, referencia vigente para el 07/10/2026: 7.64254. 100 × 7.64254 = 764.25." },
    fecha: "2026-10-07",
    entrada: { sentido: "dolares-a-quetzales", cantidad: 100 },
    esperado: { tipo: 7.64254, fecha: "2026-10-07", quetzales: 764.25 },
  },
  {
    nombre: "Un domingo usa el valor publicado para ese día",
    origen: { tipo: "oficial", url: "https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx", detalle: "Servicio TipoCambioRango: 04/10/2026 = 7.64136. 7641.36 / 7.64136 = 1000." },
    fecha: "2026-10-04",
    entrada: { sentido: "quetzales-a-dolares", cantidad: 7641.36 },
    esperado: { tipo: 7.64136, dolares: 1000 },
  },
]);
