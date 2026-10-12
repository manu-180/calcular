import { definirCasos } from "@/motor/calculo";
import muerteDelTrabajador from "./muerte-del-trabajador";

export default definirCasos(muerteDelTrabajador, [
  {
    nombre: "Ocho años de servicio, más de B/. 1,500",
    origen: {
      tipo: "recalculado",
      detalle:
        "Prima 2,400 (art. 224, por cualquier causa). Vacaciones 590.91. Décimo 255.08. Salarios pendientes 400. Total 3,645.99: pasa el límite del art. 155 y va con edicto.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2018-10-13", fechaFallecimiento: "2026-10-12", indefinido: true, mesesVacaciones: 5, salariosPendientes: 400 },
    esperado: { prima: 2400, vacaciones: 590.91, decimo: 255.08, total: 3645.99 },
  },
  {
    nombre: "Seis meses de servicio, menos de B/. 1,500",
    origen: {
      tipo: "recalculado",
      detalle: "Prima 600 × 12 ÷ 52 × 0.5 = 69.23. Vacaciones 600 × 6 ÷ 11 = 327.27. Décimo (600 × 1.9 + 327.27) ÷ 12 = 122.27. Total 518.77.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, fechaIngreso: "2026-04-13", fechaFallecimiento: "2026-10-12", indefinido: true, mesesVacaciones: 6, salariosPendientes: 0 },
    esperado: { prima: 69.23, vacaciones: 327.27, decimo: 122.27, total: 518.77, tramite: "El juez de trabajo lo entrega sin juicio de sucesión ni edicto." },
  },
]);
