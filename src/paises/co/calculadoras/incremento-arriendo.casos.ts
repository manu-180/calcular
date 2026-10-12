import { definirCasos } from "@/motor/calculo";
import arriendo from "./incremento-arriendo";

export default definirCasos(arriendo, [
  {
    nombre: "Reajuste en 2026 de un arriendo de 1.500.000",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 820 art. 20: hasta el 100 % del IPC de 2025. IPC dic-2025 152,27 / dic-2024 144,88 = 5,10 %. Aumento 76.512; nuevo canon 1.576.512.",
    },
    fecha: "2026-10-15",
    entrada: { canon: 1500000, fecha: "2026-10-15", valorComercial: null },
    esperado: { anioIpc: "2025", aumento: 76512, nuevoCanon: 1576512, topeCanon: null },
  },
  {
    nombre: "Tope del 1 % del valor comercial",
    origen: { tipo: "recalculado", detalle: "Ley 820 art. 18: 1 % de 150.000.000 = 1.500.000. El nuevo canon de 1.576.512 lo pasaría." },
    fecha: "2026-10-15",
    entrada: { canon: 1500000, fecha: "2026-03-01", valorComercial: 150000000 },
    esperado: { topeCanon: 1500000, nuevoCanon: 1576512 },
  },
  {
    nombre: "Reajuste de 2027 sin el IPC de diciembre de 2026",
    origen: { tipo: "recalculado", detalle: "Al 15/10/2026 el último IPC publicado es el de septiembre de 2026: falta diciembre." },
    fecha: "2026-10-15",
    entrada: { canon: 1500000, fecha: "2027-02-01", valorComercial: null },
    esperaError: true,
  },
]);
