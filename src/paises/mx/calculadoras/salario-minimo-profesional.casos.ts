import { definirCasos } from "@/motor/calculo";
import profesional from "./salario-minimo-profesional";

const CONASAMI = "https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025";

export default definirCasos(profesional, [
  {
    nombre: "Oficial de albañilería, zona general",
    origen: { tipo: "oficial", url: CONASAMI, detalle: "Tabla de la CONASAMI 2026, oficio 1: 363.44 diarios. × 30.4 = 11048.58; 363.44 − 315.04 = 48.40." },
    fecha: "2026-10-15",
    entrada: { oficio: "albanileria-oficial-de", region: "general" },
    esperado: { diario: 363.44, semanal: 2544.08, quincenal: 5451.6, mensual: 11048.58, sobreGeneral: 48.4 },
  },
  {
    nombre: "Oficial de albañilería, frontera norte",
    origen: { tipo: "oficial", url: CONASAMI, detalle: "En la Zona Libre de la Frontera Norte todos los oficios valen 440.87, salvo reporteros." },
    fecha: "2026-10-15",
    entrada: { oficio: "albanileria-oficial-de", region: "frontera-norte" },
    esperado: { diario: 440.87, sobreGeneral: 0 },
  },
  {
    nombre: "Reportero en prensa diaria impresa",
    origen: { tipo: "oficial", url: CONASAMI, detalle: "Oficio 47: 705.46 en las dos zonas." },
    fecha: "2026-10-15",
    entrada: { oficio: "reportero-en-prensa-diaria-impresa", region: "frontera-norte" },
    esperado: { diario: 705.46, sobreGeneral: 264.59 },
  },
]);
