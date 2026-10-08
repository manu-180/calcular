import { definirCasos } from "@/motor/calculo";
import salarioVacacional from "./salario-vacacional";

export default definirCasos(salarioVacacional, [
  {
    nombre: "$ 60.000, año completo, 20 días",
    origen: {
      tipo: "recalculado",
      url: "https://www.gub.uy/ministerio-trabajo-seguridad-social/institucional/preguntas-frecuentes/materia-laboral",
      detalle:
        "Criterio del MTSS: al sueldo mensual se le hacen los descuentos, se divide entre 30 y se multiplica por los días. Líquido 48.240 (montepío 9.000, Fonasa 2.700, FRL 60, IRPF 0) / 30 = 1.608 × 20 = 32.160. Licencia: 60.000 / 30 × 20 = 40.000.",
    },
    fecha: "2026-10-07",
    entrada: { nominal: 60000, antiguedad: 1, meses: 12, hijos: 0, conyuge: false },
    esperado: { dias: 20, jornalNominal: 2000, pagoLicencia: 40000, jornalLiquido: 1608, salarioVacacional: 32160 },
  },
  {
    nombre: "Justo 5 años: un día más",
    origen: { tipo: "recalculado", detalle: "Ley 12.590, artículo 2: 5 años dan 1 día extra. 21 días × 1.608 = 33.768." },
    fecha: "2026-10-07",
    entrada: { nominal: 60000, antiguedad: 5, meses: 12, hijos: 0, conyuge: false },
    esperado: { diasAnuales: 21, diasPorAntiguedad: 1, dias: 21, salarioVacacional: 33768 },
  },
  {
    nombre: "4 años: todavía sin días extra",
    origen: { tipo: "recalculado", detalle: "Con menos de 5 años no hay complemento: 20 días." },
    fecha: "2026-10-07",
    entrada: { nominal: 60000, antiguedad: 4, meses: 12, hijos: 0, conyuge: false },
    esperado: { diasAnuales: 20, diasPorAntiguedad: 0 },
  },
  {
    nombre: "8 años y $ 100.000",
    origen: {
      tipo: "recalculado",
      detalle: "8 años: 2 días extra, 22 días. Líquido 75.207,20 / 30 = 2.506,91 × 22 = 55.152,02. Licencia 3.333,33 × 22 = 73.333,26.",
    },
    fecha: "2026-10-07",
    entrada: { nominal: 100000, antiguedad: 8, meses: 12, hijos: 0, conyuge: false },
    esperado: { dias: 22, jornalNominal: 3333.33, pagoLicencia: 73333.26, jornalLiquido: 2506.91, salarioVacacional: 55152.02 },
  },
  {
    nombre: "Medio año trabajado",
    origen: { tipo: "recalculado", detalle: "20 × 6 / 12 = 10 días. Salario vacacional 1.608 × 10 = 16.080." },
    fecha: "2026-10-07",
    entrada: { nominal: 60000, antiguedad: 0, meses: 6, hijos: 0, conyuge: false },
    esperado: { dias: 10, salarioVacacional: 16080 },
  },
]);
