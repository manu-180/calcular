import { definirCasos } from "@/motor/calculo";
import uma from "./uma";

export default definirCasos(uma, [
  {
    nombre: "Diez UMA diarias en 2026",
    origen: { tipo: "oficial", url: "https://dof.gob.mx/nota_detalle.php?codigo=5778072&fecha=09/01/2026", detalle: "UMA diaria 117.31 × 10 = 1173.10." },
    fecha: "2026-10-15",
    entrada: { sentido: "uma-a-pesos", cantidad: 10, valor: "diaria" },
    esperado: { uma: 117.31, pesos: 1173.1 },
  },
  {
    nombre: "UMA anual",
    origen: { tipo: "oficial", url: "https://dof.gob.mx/nota_detalle.php?codigo=5778072&fecha=09/01/2026", detalle: "El INEGI publica 42,794.64 = 3,566.22 × 12." },
    fecha: "2026-10-15",
    entrada: { sentido: "uma-a-pesos", cantidad: 1, valor: "anual" },
    esperado: { uma: 42794.64, pesos: 42794.64 },
  },
  {
    nombre: "Último día de la UMA 2025",
    origen: { tipo: "oficial", url: "https://dof.gob.mx/nota_detalle.php?codigo=5746930&fecha=10/01/2025", detalle: "Hasta el 31/01/2026 rige la UMA 2025: 113.14 diaria." },
    fecha: "2026-01-31",
    entrada: { sentido: "uma-a-pesos", cantidad: 1, valor: "diaria" },
    esperado: { uma: 113.14 },
  },
  {
    nombre: "Pesos a UMA mensuales",
    origen: { tipo: "recalculado", detalle: "7132.44 / 3566.22 = 2." },
    fecha: "2026-10-15",
    entrada: { sentido: "pesos-a-uma", cantidad: 7132.44, valor: "mensual" },
    esperado: { umas: 2 },
  },
]);
