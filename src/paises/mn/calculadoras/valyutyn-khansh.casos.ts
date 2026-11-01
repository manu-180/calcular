import { definirCasos } from "@/motor/calculo";
import calculadora from "./valyutyn-khansh";

export default definirCasos(calculadora, [
  { nombre: "100 доллар", origen: { tipo: "oficial", url: "https://www.mongolbank.mn/mn/currency-rates", detalle: "2026-11-01 ханш 3,599.28; 100 × 3,599.28 = 359,928." }, fecha: "2026-11-01", entrada: { dun: 100, valyut: "usd", chiglel: "togrog" }, esperado: { togrogoor: 359928, khansh: 3599.28 } },
  { nombre: "Юань рүү", origen: { tipo: "recalculado", detalle: "54,076 / 540.76 = 100." }, fecha: "2026-11-01", entrada: { dun: 54076, valyut: "cny", chiglel: "valyut" }, esperado: { valyutaar: 100 } },
]);
