import { definirCasos } from "@/motor/calculo";
import calculadora from "./ajlaas-garakh-medegdel";

export default definirCasos(calculadora, [
  { nombre: "Ажилтан", origen: { tipo: "recalculado", detalle: "79.2: 30 хоногийн дараа." }, fecha: "2026-11-01", entrada: { ognoo: "2026-11-01", khen: "ajiltan", dundaj: null }, esperado: { duusakh: "2026-12-01", khonog: 30 } },
  { nombre: "Ажил олгогч, олговортой", origen: { tipo: "recalculado", detalle: "80.5: 1,500,000 / 30 × 30 = 1,500,000." }, fecha: "2026-11-01", entrada: { ognoo: "2026-11-15", khen: "olgogch", dundaj: 1500000 }, esperado: { duusakh: "2026-12-15", olgovor: 1500000 } },
]);
