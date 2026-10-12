import { definirCasos } from "@/motor/calculo";
import licenciaDePaternidad from "./licencia-de-paternidad";

export default definirCasos(licenciaDePaternidad, [
  {
    nombre: "Nacimiento un jueves",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 27 de 2017: tres días hábiles desde el nacimiento. Jueves 15/10/2026, viernes 16 y lunes 19. Vuelve el martes 20. Aviso una semana antes: 8/10.",
    },
    fecha: "2026-10-12",
    entrada: { fechaNacimiento: "2026-10-15" },
    esperado: { avisarAntesDe: "2026-10-08", inicio: "2026-10-15", ultimoDia: "2026-10-19", regreso: "2026-10-20" },
  },
  {
    nombre: "Nacimiento un sábado",
    origen: { tipo: "recalculado", detalle: "Sábado 17/10/2026: los días hábiles son lunes 19, martes 20 y miércoles 21." },
    fecha: "2026-10-12",
    entrada: { fechaNacimiento: "2026-10-17" },
    esperado: { inicio: "2026-10-19", ultimoDia: "2026-10-21", regreso: "2026-10-22" },
  },
  {
    nombre: "Nacimiento un viernes",
    origen: { tipo: "recalculado", detalle: "Viernes 23/10/2026, lunes 26 y martes 27. Vuelve el miércoles 28." },
    fecha: "2026-10-12",
    entrada: { fechaNacimiento: "2026-10-23" },
    esperado: { inicio: "2026-10-23", ultimoDia: "2026-10-27", regreso: "2026-10-28" },
  },
]);
