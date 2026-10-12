import { definirCasos } from "@/motor/calculo";
import historico from "./salario-minimo-historico";

export default definirCasos(historico, [
  {
    nombre: "Salario mínimo de 2023",
    origen: {
      tipo: "oficial",
      url: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_2613_2022.htm",
      detalle: "Decreto 2613 de 2022: 1.160.000. Decreto 2614 de 2022: auxilio 140.606. Frente a 1.000.000 de 2022, sube 16 %.",
    },
    fecha: "2026-10-15",
    entrada: { anio: 2023 },
    esperado: { smmlv: 1160000, auxilio: 140606, total: 1300606, aumento: 16 },
  },
  {
    nombre: "Salario mínimo de 2026",
    origen: { tipo: "oficial", url: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_1469_2025.htm", detalle: "Decreto 1469 de 2025: 1.750.905, un 23 % más que 1.423.500." },
    fecha: "2026-10-15",
    entrada: { anio: 2026 },
    esperado: { smmlv: 1750905, auxilio: 249095, total: 2000000, aumento: 23 },
  },
  {
    nombre: "2020 no tiene año anterior cargado",
    origen: { tipo: "oficial", url: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_2360_2019.htm", detalle: "Decreto 2360 de 2019: 877.803. No cargamos 2019, así que el aumento no se muestra." },
    fecha: "2026-10-15",
    entrada: { anio: 2020 },
    esperado: { smmlv: 877803, aumento: null },
  },
  {
    nombre: "Año sin decreto",
    origen: { tipo: "recalculado", detalle: "El salario mínimo de 2027 todavía no se fijó." },
    fecha: "2026-10-15",
    entrada: { anio: 2027 },
    esperaError: true,
  },
]);
