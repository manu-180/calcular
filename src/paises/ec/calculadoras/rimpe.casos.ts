import { definirCasos } from "@/motor/calculo";
import rimpe from "./rimpe";

const SRI = "https://www.sri.gob.ec/rimpe";

export default definirCasos(rimpe, [
  {
    nombre: "Negocio popular con USD 12.000 en el año",
    origen: { tipo: "oficial", url: SRI, detalle: "Tabla de negocios populares 2024 en adelante: de 10.000,01 a 15.000 la cuota es USD 35." },
    fecha: "2026-10-08",
    entrada: { tipo: "natural", ingresos: 12000 },
    esperado: { categoria: "Negocio popular", impuesto: 35, mensual: 2.92 },
  },
  {
    nombre: "Emprendedor con USD 60.000",
    origen: { tipo: "recalculado", detalle: "Tabla de emprendedores: 360 + 1,25 % × (60.000 − 50.000) = 485." },
    fecha: "2026-10-08",
    entrada: { tipo: "natural", ingresos: 60000 },
    esperado: { categoria: "Emprendedor", impuesto: 485, mensual: 40.42 },
  },
  {
    nombre: "Justo en el tope de negocio popular",
    origen: { tipo: "oficial", url: SRI, detalle: "Hasta USD 20.000 es negocio popular: cuota USD 60." },
    fecha: "2026-10-08",
    entrada: { tipo: "natural", ingresos: 20000 },
    esperado: { categoria: "Negocio popular", impuesto: 60 },
  },
  {
    nombre: "Tope del RIMPE",
    origen: { tipo: "recalculado", detalle: "2.797,52 + 2 % × (300.000 − 200.000) = 4.797,52." },
    fecha: "2026-10-08",
    entrada: { tipo: "sociedad", ingresos: 300000 },
    esperado: { impuesto: 4797.52 },
  },
  {
    nombre: "Más de USD 300.000",
    origen: { tipo: "oficial", url: SRI, detalle: "Con ingresos superiores a USD 300.000 no se está en el RIMPE." },
    fecha: "2026-10-08",
    entrada: { tipo: "natural", ingresos: 350000 },
    esperaError: true,
  },
  {
    nombre: "Sociedad con menos de USD 20.000",
    origen: { tipo: "recalculado", detalle: "Las sociedades no son negocios populares y la tabla de emprendedores empieza en 20.000: no se calcula." },
    fecha: "2026-10-08",
    entrada: { tipo: "sociedad", ingresos: 15000 },
    esperado: { impuesto: null },
  },
]);
