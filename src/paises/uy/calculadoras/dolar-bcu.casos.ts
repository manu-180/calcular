import { definirCasos } from "@/motor/calculo";
import dolarBcu from "./dolar-bcu";

const BCU = "https://www.bcu.gub.uy/Estadisticas-e-Indicadores/Paginas/Cotizaciones.aspx" as const;

// Cada caso se evalúa el mismo día de su cotización (o en un fin de semana, donde el BCU no publica):
// fechado un día después, el punto de ese día entraba a la serie y el caso fallaba, frenando la
// publicación de Uruguay (issue #17).
export default definirCasos(dolarBcu, [
  {
    nombre: "US$ 100 con la cotización del 6/10/2026",
    origen: { tipo: "oficial", url: BCU, detalle: "BCU, dólar billete del 6/10/2026: 40,166. 100 × 40,166 = 4.016,60." },
    fecha: "2026-10-06",
    entrada: { sentido: "a-pesos", monto: 100 },
    esperado: { cotizacion: 40.166, fecha: "2026-10-06", pesos: 4016.6, dolares: null },
  },
  {
    nombre: "$ 10.000 a dólares",
    origen: { tipo: "recalculado", detalle: "10.000 / 40,166 = 248,966 → 248,97." },
    fecha: "2026-10-06",
    entrada: { sentido: "a-dolares", monto: 10000 },
    esperado: { dolares: 248.97, pesos: null },
  },
  {
    nombre: "Domingo: usa el último día hábil",
    origen: { tipo: "oficial", url: BCU, detalle: "El domingo 4/10/2026 no hay cotización; vale la del viernes 2/10: 40,342." },
    fecha: "2026-10-04",
    entrada: { sentido: "a-pesos", monto: 1 },
    esperado: { cotizacion: 40.342, fecha: "2026-10-02", pesos: 40.34 },
  },
]);
