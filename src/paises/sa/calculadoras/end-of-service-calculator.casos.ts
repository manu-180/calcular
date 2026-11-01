import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Siete años con contrato terminado por el empleador",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 84: 2.557 días / 365 = 7,005479 años. Medio sueldo x 5 = 2,5 + 1 x 2,005479 = 4,505479 sueldos x 12.000 = 54.065,75.",
    },
    fecha: "2026-01-01",
    entrada: { salario: 12000, inicio: "2019-01-01", fin: "2026-01-01", motivo: "termination", ausencias: 0 },
    esperado: { mkafaa: 54065.75, completa: 54065.75, parte: 100, dias: 2557 },
  },
  {
    nombre: "Renuncia con cuatro años: un tercio",
    origen: { tipo: "recalculado", detalle: "1.461 días = 4,00274 años. Completa 2,00137 x 9.000 = 18.012,33; art. 85 un tercio = 6.004,11." },
    fecha: "2026-06-01",
    entrada: { salario: 9000, inicio: "2022-06-01", fin: "2026-06-01", motivo: "resignation", ausencias: 0 },
    esperado: { completa: 18012.33, mkafaa: 6004.11 },
  },
  {
    nombre: "Renuncia con ocho años: dos tercios",
    origen: { tipo: "recalculado", detalle: "2.922 días = 8,005479 años. Completa 5,505479 x 10.000 = 55.054,79; dos tercios = 36.703,20." },
    fecha: "2026-01-01",
    entrada: { salario: 10000, inicio: "2018-01-01", fin: "2026-01-01", motivo: "resignation", ausencias: 0 },
    esperado: { completa: 55054.79, mkafaa: 36703.2 },
  },
  {
    nombre: "Renuncia con once años: entera",
    origen: { tipo: "recalculado", detalle: "4.018 días = 11,008219 años. 8,508219 x 8.000 = 68.065,75, sin reducción." },
    fecha: "2026-01-01",
    entrada: { salario: 8000, inicio: "2015-01-01", fin: "2026-01-01", motivo: "resignation", ausencias: 0 },
    esperado: { mkafaa: 68065.75 },
  },
  {
    nombre: "Renuncia antes de dos años: nada",
    origen: { tipo: "recalculado", detalle: "546 días = 1,4959 años: menos de dos años, art. 85 no da parte." },
    fecha: "2026-07-01",
    entrada: { salario: 10000, inicio: "2025-01-01", fin: "2026-07-01", motivo: "resignation", ausencias: 0 },
    esperado: { mkafaa: 0, completa: 7479.45 },
  },
  {
    nombre: "Fuerza mayor: entera aunque sea renuncia",
    origen: { tipo: "recalculado", detalle: "Art. 87: misma cuenta que el despido. 1.461 días con 9.000 = 18.012,33." },
    fecha: "2026-06-01",
    entrada: { salario: 9000, inicio: "2022-06-01", fin: "2026-06-01", motivo: "full-exception", ausencias: 0 },
    esperado: { mkafaa: 18012.33 },
  },
  {
    nombre: "Artículo 80: sin مكافأة",
    origen: { tipo: "recalculado", detalle: "Art. 80: rescisión sin مكافأة." },
    fecha: "2026-06-01",
    entrada: { salario: 9000, inicio: "2022-06-01", fin: "2026-06-01", motivo: "article-80", ausencias: 0 },
    esperado: { mkafaa: 0 },
  },
  {
    nombre: "Fecha de fin anterior al inicio",
    origen: { tipo: "recalculado", detalle: "Fin antes del inicio." },
    fecha: "2026-06-01",
    entrada: { salario: 9000, inicio: "2026-06-01", fin: "2022-06-01", motivo: "termination", ausencias: 0 },
    esperaError: true,
  },
]);
