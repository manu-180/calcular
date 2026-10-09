import { definirCasos } from "@/motor/calculo";
import trabajadora from "./trabajadora-de-casa-particular";

export default definirCasos(trabajadora, [
  {
    nombre: "Sueldo de 600 mil en AFP Modelo, octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Quien trabaja: AFP 10 % + comisión Modelo 0,58 % = 63.480; salud 7 % = 42.000; base del impuesto 494.520 (6,85 UTM, exenta). Líquido 494.520. Empleador: cesantía 3 % = 18.000 (Ley 19.728 art. 5), indemnización 1,11 % = 6.660 (CT art. 163), cotización reforma 3,5 % = 21.000, accidentes 0,90 % + SANNA 0,03 % = 5.580. Costo total 651.240.",
    },
    fecha: "2026-10-09",
    entrada: { sueldo: 600000, afp: "modelo", jornadaCompleta: true, masDeOnceAnios: false },
    esperado: {
      afp: 63480,
      salud: 42000,
      impuesto: 0,
      liquido: 494520,
      cesantia: 18000,
      indemnizacion: 6660,
      pensiones: 21000,
      accidentes: 5580,
      aportesEmpleador: 51240,
      costoTotal: 651240,
    },
  },
  {
    nombre: "Sueldo sobre el tope imponible y con más de 11 años",
    origen: {
      tipo: "recalculado",
      detalle:
        "UF 9/10/2026 = 41.130,94. Tope 90 UF = 3.701.785; tope cesantía 135,2 UF = 5.560.903. AFP 10,58 % del tope = 391.649; salud 259.125; base del impuesto 3.349.226 = 46,42 UTM (UTM octubre 72.151): 0,66 + (46,42 − 30) × 8 % = 1,9736 UTM = 142.395. Empleador: cesantía 3 % de 4.000.000 = 120.000; indemnización 0 (más de 11 años); 3,5 % del tope = 129.562; 0,93 % del tope = 34.427.",
    },
    fecha: "2026-10-09",
    entrada: { sueldo: 4000000, afp: "modelo", jornadaCompleta: true, masDeOnceAnios: true },
    esperado: {
      afp: 391649,
      salud: 259125,
      impuesto: 142395,
      liquido: 3206831,
      cesantia: 120000,
      indemnizacion: 0,
      pensiones: 129562,
      accidentes: 34427,
      costoTotal: 4283989,
    },
  },
  {
    nombre: "Jornada completa bajo el ingreso mínimo",
    origen: { tipo: "recalculado", detalle: "400.000 es menor que el ingreso mínimo de 553.553 (Ley 21.830): se calcula igual y se avisa. AFP 42.320, salud 28.000, líquido 329.680." },
    fecha: "2026-10-09",
    entrada: { sueldo: 400000, afp: "modelo", jornadaCompleta: true, masDeOnceAnios: false },
    esperado: { liquido: 329680, minimo: 553553 },
  },
]);
