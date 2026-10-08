import type { Mercado } from "@/motor/tipos";

// Las "regiones" son los sectores del decreto de salario mínimo: en El Salvador el mínimo no cambia
// por zona sino por actividad económica, y de ese mínimo salen los topes de indemnización y renuncia.
export const mercado: Mercado = {
  codigo: "sv",
  pais: "SV",
  nombre: "El Salvador",
  locale: "es-SV",
  idioma: "es",
  trato: "usted",
  monedas: ["USD"],
  zonaHoraria: "America/El_Salvador",
  estado: "publicado",
  regiones: [
    { id: "comercio-servicios", nombre: "Comercio y servicios" },
    { id: "industria", nombre: "Industria (incluye ingenios azucareros y agroindustria)" },
    { id: "maquila", nombre: "Maquila textil y confección" },
    { id: "beneficios-cafe", nombre: "Beneficios de café" },
    { id: "cana-azucar", nombre: "Recolección de caña de azúcar" },
    { id: "agropecuario", nombre: "Agropecuario, pesca y otras actividades agrícolas" },
    { id: "recoleccion-cafe", nombre: "Recolección de café" },
  ],
  redondeo: { decimales: 2, modo: "mitad-arriba" },
};
