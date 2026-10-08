import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const MT_8 = "https://mt.gob.do/ministerio-de-trabajo-llama-a-empresarios-a-cumplir-con-el-pago-del-aumento-del-8-del-salario-minimo/";
const MT_CNS = "https://mt.gob.do/presidente-luis-abinader-anuncia-aumento-salarial-de-20-para-el-sector-privado-no-sectorizado/";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Empresa grande, octubre de 2026",
    origen: { tipo: "oficial", url: MT_8, detalle: "Ministerio de Trabajo: grandes empresas 29,988.00 desde el 1/2/2026. Diario 29,988 ÷ 23.83 = 1,258.41; hora ÷ 8 = 157.30." },
    fecha: "2026-10-07",
    entrada: { sector: "empresa", tamano: "grande" },
    esperado: { mensual: 29988, quincenal: 14994, diario: 1258.41, hora: 157.3 },
  },
  {
    nombre: "Microempresa el 31 de enero de 2026",
    origen: { tipo: "oficial", url: MT_CNS, detalle: "Resolución CNS-01-2025: micro 15,860.32 desde el 1/4/2025." },
    fecha: "2026-01-31",
    entrada: { sector: "empresa", tamano: "micro" },
    esperado: { mensual: 15860.32 },
  },
  {
    nombre: "Microempresa el 1 de febrero de 2026",
    origen: { tipo: "oficial", url: MT_8, detalle: "Desde el 1/2/2026 la microempresa pasa a 16,993.20." },
    fecha: "2026-02-01",
    entrada: { sector: "empresa", tamano: "micro" },
    esperado: { mensual: 16993.2 },
  },
  {
    nombre: "Empresa mediana",
    origen: { tipo: "oficial", url: MT_8, detalle: "Medianas 27,489.60." },
    fecha: "2026-10-07",
    entrada: { sector: "empresa", tamano: "mediana" },
    esperado: { mensual: 27489.6, quincenal: 13744.8 },
  },
  {
    nombre: "Trabajo del hogar",
    origen: {
      tipo: "oficial",
      url: "https://mt.gob.do/gobierno-anuncia-aumento-salarial-del-30-para-las-trabajadoras-del-hogar/",
      detalle: "13,000 desde el 1/5/2025. Diario 13,000 ÷ 23.83 = 545.53; hora 68.19.",
    },
    fecha: "2026-10-07",
    entrada: { sector: "hogar", tamano: "grande" },
    esperado: { mensual: 13000, diario: 545.53, hora: 68.19 },
  },
]);
