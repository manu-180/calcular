import { definirCasos } from "@/motor/calculo";
import pensionIgss from "./pension-igss";

export default definirCasos(pensionIgss, [
  {
    nombre: "300 meses cotizados y un beneficiario",
    origen: {
      tipo: "recalculado",
      detalle: "Acuerdo 1124 art. 16: 50 % + 0.5 % × (300 − 120) / 6 = 65 % de 6000 = 3900; asignación 10 % = 390; total 4290 (tope 80 % = 4800).",
    },
    fecha: "2026-10-12",
    entrada: { promedio: 6000, meses: 300, edad: 62, beneficiarios: 1 },
    esperado: { derecho: "Sí, cumple la edad y las cuotas.", remuneracion: 6000, porcentajeBase: 65, pension: 3900, asignacion: 390, total: 4290 },
  },
  {
    nombre: "Salario por encima del máximo y tope del 80 %",
    origen: {
      tipo: "recalculado",
      detalle: "Remuneración base máxima 9000 (art. 29). 240 meses: 60 % = 5400. Cinco asignaciones de 540 = 2700, pero el total no pasa 80 % de 9000 = 7200: asignación 1800.",
    },
    fecha: "2026-10-12",
    entrada: { promedio: 12000, meses: 240, edad: 60, beneficiarios: 5 },
    esperado: { remuneracion: 9000, porcentajeBase: 60, pension: 5400, asignacion: 1800, total: 7200 },
  },
  {
    nombre: "Sin las cuotas suficientes",
    origen: { tipo: "recalculado", detalle: "Art. 15: hacen falta 240 contribuciones; con 200 faltan 40." },
    fecha: "2026-10-12",
    entrada: { promedio: 5000, meses: 200, edad: 61, beneficiarios: 0 },
    esperado: { derecho: "Todavía no: le faltan 40 meses de cotización.", porcentajeBase: 56.5 },
  },
]);
