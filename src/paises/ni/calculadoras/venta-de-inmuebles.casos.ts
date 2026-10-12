import { definirCasos } from "@/motor/calculo";
import ventaDeInmuebles from "./venta-de-inmuebles";

export default definirCasos(ventaDeInmuebles, [
  {
    nombre: "Casa vendida en US$80,000",
    origen: {
      tipo: "recalculado",
      detalle: "LCT art. 87 numeral 4 (Ley 987): de US$50,000.01 a US$100,000, 2 %. Tipo de cambio oficial 36.6243: 80000 × 36.6243 = 2929944; 2 % = 58598.88 (US$1,600).",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "usd", valor: 80000 },
    esperado: { tipoCambio: 36.6243, enCordobas: 2929944, tasa: 2, irCordobas: 58598.88, irDolares: 1600 },
  },
  {
    nombre: "Terreno de C$1,500,000",
    origen: { tipo: "recalculado", detalle: "1500000 / 36.6243 = US$40,956.41: primer tramo, 1 %. 1500000 × 1 % = 15000." },
    fecha: "2026-10-12",
    entrada: { moneda: "nio", valor: 1500000 },
    esperado: { tasa: 1, irCordobas: 15000 },
  },
  {
    nombre: "Propiedad de más de US$500,000",
    origen: { tipo: "recalculado", detalle: "Último tramo, 7 % sobre todo el valor. 600000 × 36.6243 = 21974580; 7 % = 1538220.60." },
    fecha: "2026-10-12",
    entrada: { moneda: "usd", valor: 600000 },
    esperado: { tasa: 7, irCordobas: 1538220.6 },
  },
]);
