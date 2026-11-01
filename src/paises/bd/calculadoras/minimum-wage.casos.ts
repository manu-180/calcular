import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const LISTA = "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-mwb/2026/8/0b34c4f3-ed20-4111-8719-9b056eef81b0.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Confección (garments)",
    origen: { tipo: "oficial", url: LISTA, detalle: "Fila 29: básico 6,700 + alquiler 3,350 + médico 750 + transporte 450 + comida 1,250 = 12,500 (vigente desde el 1/12/2023)." },
    fecha: "2026-10-24",
    entrada: { sector: "garments", salario: null },
    esperado: { total: 12500, basico: 6700, otros: 5800, diferencia: null },
  },
  {
    nombre: "Farmacéutica con salario menor",
    origen: { tipo: "oficial", url: LISTA, detalle: "Fila 41: 7,500 + 3,750 + 1,500 + 1,000 = 13,750. Salario de 13,000: 750 por debajo." },
    fecha: "2026-10-24",
    entrada: { sector: "pharmaceuticals", salario: 13000 },
    esperado: { total: 13750, basico: 7500, diferencia: -750 },
  },
  {
    nombre: "Bomba de combustible",
    origen: { tipo: "oficial", url: LISTA, detalle: "Fila 44: 9,000 + 4,050 + 1,200 + 1,000 + 800 = 16,050 (6/8/2026)." },
    fecha: "2026-10-24",
    entrada: { sector: "petrol-pump", salario: null },
    esperado: { total: 16050, basico: 9000 },
  },
]);
