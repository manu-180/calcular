import { definirCasos } from "@/motor/calculo";
import calculadora from "./hypotheekrenteaftrek-berekenen";

const IB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Inkomstenbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Schuld boven het maximum",
    origen: {
      tipo: "recalculado",
      url: IB,
      detalle: "Artikel 18 lid 1 sub g: schuld tot 600.000. Aftrek 64.000 × 600.000 / 800.000 = 48.000. IB over 400.000 = 22.680 + 166.000 × 38% = 85.760; over 352.000 = 22.680 + 118.000 × 38% = 67.520. Voordeel 18.240.",
    },
    fecha: "2026-10-27",
    entrada: { inkomen: 400000, schuld: 800000, rente: 64000 },
    esperado: { voordeel: 18240, aftrek: 48000, belastingZonder: 85760, belastingMet: 67520 },
  },
  {
    nombre: "Schuld onder het maximum",
    origen: { tipo: "recalculado", url: IB, detalle: "Aftrek 40.000. IB over 200.000 = 3.360 + 7.560 + 8.000 × 28% = 13.160; over 160.000 = 3.360 + 10.000 × 18% = 5.160. Voordeel 8.000." },
    fecha: "2026-10-27",
    entrada: { inkomen: 200000, schuld: 500000, rente: 40000 },
    esperado: { voordeel: 8000, aftrek: 40000 },
  },
  {
    nombre: "Inkomen onder de vrije schijf",
    origen: { tipo: "recalculado", detalle: "Wie al geen inkomstenbelasting betaalt, heeft geen voordeel." },
    fecha: "2026-10-27",
    entrada: { inkomen: 100000, schuld: 300000, rente: 20000 },
    esperado: { voordeel: 0 },
  },
  {
    nombre: "Rente zonder schuld",
    origen: { tipo: "recalculado", detalle: "Invoer die niet kan." },
    fecha: "2026-10-27",
    entrada: { inkomen: 100000, schuld: 0, rente: 20000 },
    esperaError: true,
  },
]);
