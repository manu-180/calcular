import { definirCasos } from "@/motor/calculo";
import seguroDeCesantia from "./seguro-de-cesantia";

export default definirCasos(seguroDeCesantia, [
  {
    nombre: "Indefinido con promedio de $800.000",
    origen: {
      tipo: "oficial",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/03/17/44402/01/2781409.pdf",
      detalle:
        "Res. ex. 383 SP: 70 %, 60 %, 45 %, 40 %, 35 %. 560.000; 480.000; 360.000; 320.000; 280.000 (todos entre el mínimo y el máximo de cada mes). Total 2.000.000.",
    },
    fecha: "2026-10-07",
    entrada: { contrato: "indefinido", promedio: 800000 },
    esperado: { giro1: 560000, giro2: 480000, giro3: 360000, giro4: 320000, giro5: 280000, total: 2000000 },
  },
  {
    nombre: "Sueldo alto: se aplica el máximo",
    origen: { tipo: "recalculado", detalle: "70 % de 2.000.000 = 1.400.000, sobre el máximo del primer mes (1.004.003). 60 % = 1.200.000 → 860.574." },
    fecha: "2026-10-07",
    entrada: { contrato: "indefinido", promedio: 2000000 },
    esperado: { giro1: 1004003, giro2: 860574, giro3: 645429, giro4: 573718, giro5: 502002 },
  },
  {
    nombre: "Plazo fijo con sueldo bajo: se aplica el mínimo",
    origen: { tipo: "recalculado", detalle: "60 % de 300.000 = 180.000, bajo el mínimo del primer mes (258.161). 30 % = 90.000 → 129.085 en el cuarto y quinto." },
    fecha: "2026-10-07",
    entrada: { contrato: "plazo-fijo", promedio: 300000 },
    esperado: { giro1: 258161, giro2: 172115, giro3: 150602, giro4: 129085, giro5: 129085 },
  },
]);
