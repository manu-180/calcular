import { definirCasos } from "@/motor/calculo";
import feriadosPagos from "./feriados-pagos";

export default definirCasos(feriadosPagos, [
  {
    nombre: "Mensual que trabaja dos feriados pagos",
    origen: {
      tipo: "oficial",
      url: "https://www.gub.uy/ministerio-trabajo-seguridad-social/institucional/derecho-laboral-uruguayo/feriados",
      detalle: "MTSS: el mensual que trabaja un feriado pago cobra el mes más un día (sueldo / 30). 45.000 / 30 = 1.500; por 2 = 3.000.",
    },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", monto: 45000, trabajados: 2, noTrabajados: 0 },
    esperado: { dia: 1500, porTrabajados: 3000, porNoTrabajados: null, total: 3000 },
  },
  {
    nombre: "Jornalero: uno trabajado y dos no trabajados",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/12590-1958/18", detalle: "Ley 12.590, art. 18: doble paga si trabaja (2 × 2.000 = 4.000) y paga normal si no (2 × 2.000 = 4.000). Total 8.000." },
    fecha: "2026-10-12",
    entrada: { modalidad: "jornalero", monto: 2000, trabajados: 1, noTrabajados: 2 },
    esperado: { porTrabajados: 4000, porNoTrabajados: 4000, total: 8000 },
  },
  {
    nombre: "Mensual que no trabaja ningún feriado",
    origen: { tipo: "recalculado", detalle: "Sin feriados trabajados no hay nada extra." },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", monto: 45000, trabajados: 0, noTrabajados: 0 },
    esperado: { total: 0 },
  },
]);
