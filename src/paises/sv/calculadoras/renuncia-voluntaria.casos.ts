import { definirCasos } from "@/motor/calculo";
import renunciaVoluntaria from "./renuncia-voluntaria";

export default definirCasos(renunciaVoluntaria, [
  {
    nombre: "Salario mínimo de comercio con 5 años y fracción",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/64753625-5A99-425D-B845-BF2719C6A710.pdf",
      detalle: "Art. 8: 15 días por año. Del 4/1/2021 al 30/9/2026: 5 años completos. 408,80 / 30 = 13,6267, bajo el tope de 2 × 13,44 = 26,88. 75 días × 13,6267 = 1.022.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 408.8, inicio: "2021-01-04", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { tiempo: "5 años y 270 días", dias: 75, prestacion: 1022 },
  },
  {
    nombre: "Salario sobre el tope en comercio",
    origen: { tipo: "recalculado", detalle: "Tope 2 × 13,44 = 26,88. 1.200 / 30 = 40 lo pasa. 10 años: 150 días × 26,88 = 4.032." },
    fecha: "2026-10-07",
    entrada: { salario: 1200, inicio: "2016-10-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { diarioUsado: 26.88, dias: 150, prestacion: 4032 },
  },
  {
    nombre: "Tope en la maquila",
    origen: { tipo: "recalculado", detalle: "Tope 2 × 13,227 = 26,454. 900 / 30 = 30 lo pasa. 3 años: 45 días × 26,454 = 1.190,43." },
    fecha: "2026-10-07",
    entrada: { salario: 900, inicio: "2023-10-01", fin: "2026-09-30", region: "maquila" },
    esperado: { dias: 45, prestacion: 1190.43 },
  },
  {
    nombre: "Dos años justos: ya tiene derecho",
    origen: { tipo: "recalculado", detalle: "Art. 5: mínimo 2 años. Del 1/10/2024 al 30/9/2026 son 2 años: 30 días × 20 = 600." },
    fecha: "2026-10-07",
    entrada: { salario: 600, inicio: "2024-10-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { dias: 30, prestacion: 600 },
  },
  {
    nombre: "Un año y medio: todavía no tiene derecho",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2025 al 30/9/2026 es 1 año: no llega a los 2 años de la ley." },
    fecha: "2026-10-07",
    entrada: { salario: 600, inicio: "2025-03-01", fin: "2026-09-30", region: "comercio-servicios" },
    esperado: { dias: 0, prestacion: 0 },
  },
  {
    nombre: "Renuncia anterior al inicio",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { salario: 600, inicio: "2026-05-01", fin: "2026-04-30", region: "comercio-servicios" },
    esperaError: true,
  },
]);
