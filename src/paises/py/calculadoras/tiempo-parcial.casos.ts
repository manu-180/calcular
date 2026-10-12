import { definirCasos } from "@/motor/calculo";
import tiempoParcial from "./tiempo-parcial";

export default definirCasos(tiempoParcial, [
  {
    nombre: "80 horas al mínimo diurno",
    origen: {
      tipo: "oficial",
      url: "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf",
      detalle: "Res. MTESS 670/2026, art. 2: hora mínima a tiempo parcial diurna Gs. 14.635. 80 × 14.635 = 1.170.800; IPS 9 % = 105.372; neto 1.065.428.",
    },
    fecha: "2026-10-12",
    entrada: { jornada: "diurna", horasMes: 80, horasSemana: 20, convenido: null },
    esperado: { hora: 14635, bruto: 1170800, ips: 105372, neto: 1065428 },
  },
  {
    nombre: "Salario pactado mayor al mínimo",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/8905/ley-n-6339-que-regula-el-empleo-a-tiempo-parcial",
      detalle: "Ley 6339 art. 6: 4.160.000 / 26 / 8 = 20.000 por hora. 100 horas = 2.000.000; IPS 180.000.",
    },
    fecha: "2026-10-12",
    entrada: { jornada: "diurna", horasMes: 100, horasSemana: 24, convenido: 4160000 },
    esperado: { hora: 20000, bruto: 2000000, ips: 180000, neto: 1820000 },
  },
  {
    nombre: "Horario nocturno",
    origen: { tipo: "recalculado", detalle: "Hora mínima nocturna a tiempo parcial Gs. 21.743 (art. 2 de la Res. 670). 60 horas = 1.304.580; IPS 117.412,2 (117.412)." },
    fecha: "2026-10-12",
    entrada: { jornada: "nocturna", horasMes: 60, horasSemana: null, convenido: null },
    esperado: { hora: 21743, bruto: 1304580, ips: 117412 },
  },
]);
