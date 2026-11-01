import { definirCasos } from "@/motor/calculo";
import calculadora from "./mas-hachnasa";

export default definirCasos(calculadora, [
  {
    nombre: "20.000 por mes, hombre",
    origen: {
      tipo: "recalculado",
      detalle: "701 + 3.050 x 14 % + 8.940 x 20 % + 1.000 x 31 % = 3.226; menos 2,25 x 242 = 544,5: 2.681,5. Marginal 31 %.",
    },
    fecha: "2026-10-24",
    entrada: { hachnasa: 20000, tkufa: "chodshi", min: "gever", nekudotNosafot: 0 },
    esperado: { lifneiZikui: 3226, zikui: 544.5, mas: 2681.5, shiurShuli: 31 },
  },
  {
    nombre: "240.000 por año: el mismo caso por 12",
    origen: { tipo: "recalculado", detalle: "Escala anual = mensual x 12: 2.681,5 x 12 = 32.178." },
    fecha: "2026-10-24",
    entrada: { hachnasa: 240000, tkufa: "shnati", min: "gever", nekudotNosafot: 0 },
    esperado: { mas: 32178, lifneiZikui: 38712 },
  },
  {
    nombre: "7.000 por mes, mujer",
    origen: { tipo: "recalculado", detalle: "7.000 x 10 % = 700; menos 2,75 x 242 = 665,5: 34,5." },
    fecha: "2026-10-24",
    entrada: { hachnasa: 7000, tkufa: "chodshi", min: "isha", nekudotNosafot: 0 },
    esperado: { mas: 34.5, nekudot: 2.75 },
  },
  {
    nombre: "Sin ingreso",
    origen: { tipo: "recalculado", detalle: "Ingreso 0." },
    fecha: "2026-10-24",
    entrada: { hachnasa: 0, tkufa: "chodshi", min: "gever", nekudotNosafot: 0 },
    esperaError: true,
  },
]);
