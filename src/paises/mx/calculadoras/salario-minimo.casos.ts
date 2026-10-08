import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Salario mínimo general 2026",
    origen: {
      tipo: "oficial",
      url: "https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025",
      detalle: "Resolución CONASAMI: 315.04 pesos diarios. Semana 315.04 × 7 = 2205.28; quincena × 15 = 4725.60; mes × 30.4 = 9577.22.",
    },
    fecha: "2026-10-15",
    entrada: { region: "general", sueldo: null, periodo: "mensual" },
    esperado: { diario: 315.04, semanal: 2205.28, quincenal: 4725.6, mensual: 9577.22 },
  },
  {
    nombre: "Zona Libre de la Frontera Norte",
    origen: {
      tipo: "oficial",
      url: "https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025",
      detalle: "Resolución CONASAMI: 440.87 pesos diarios. Mes 440.87 × 30.4 = 13402.45.",
    },
    fecha: "2026-01-01",
    entrada: { region: "frontera-norte", sueldo: null, periodo: "mensual" },
    esperado: { diario: 440.87, quincenal: 6613.05, mensual: 13402.45 },
  },
  {
    nombre: "Sueldo por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "9000 / 30 = 300 diarios; 300 − 315.04 = −15.04." },
    fecha: "2026-10-15",
    entrada: { region: "general", sueldo: 9000, periodo: "mensual" },
    esperado: { diferencia: -15.04 },
  },
]);
