import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Renuncia con aviso de 15 días",
    origen: { tipo: "recalculado", detalle: "Art. 222: 15 días desde el 12/10/2026 = 27/10/2026. Semana de salario: 1,300 × 12 ÷ 52 = 300." },
    fecha: "2026-10-12",
    entrada: { tipo: "general", fechaAviso: "2026-10-12", salario: 1300 },
    esperado: { plazo: "15 días", fechaSalida: "2026-10-27", descuento: 300 },
  },
  {
    nombre: "Trabajador técnico",
    origen: { tipo: "recalculado", detalle: "Art. 222: dos meses desde el 12/10/2026 = 12/12/2026." },
    fecha: "2026-10-12",
    entrada: { tipo: "tecnico", fechaAviso: "2026-10-12", salario: 1300 },
    esperado: { plazo: "2 meses", fechaSalida: "2026-12-12", descuento: 300 },
  },
  {
    nombre: "Trabajo doméstico",
    origen: { tipo: "recalculado", detalle: "Art. 231, numeral 3: aviso de 30 días, sin descuento. 1/11/2026 + 30 = 1/12/2026." },
    fecha: "2026-10-12",
    entrada: { tipo: "domestico", fechaAviso: "2026-11-01", salario: 350 },
    esperado: { plazo: "30 días", fechaSalida: "2026-12-01", descuento: 0 },
  },
]);
