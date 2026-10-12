import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { montoDuodecimas } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.prima-anual",
  mercado: "bo",
  concepto: "reparto-utilidades",
  slug: "prima-anual",
  estado: "publicado",
  requiere: {
    "bo.prima-utilidades": "numero",
    "bo.prima-meses-minimos": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Usted es",
      opciones: [
        { valor: "empleado", etiqueta: "Empleada o empleado" },
        { valor: "obrero", etiqueta: "Obrera u obrero" },
      ],
      porDefecto: "empleado",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos que trabajó en la gestión", min: 0, max: 12, porDefecto: 12 },
    { id: "dias", tipo: "entero", etiqueta: "Días sueltos además de esos meses", min: 0, max: 29, porDefecto: 0 },
    {
      id: "utilidad",
      tipo: "moneda",
      etiqueta: "Utilidad neta de la empresa en la gestión (opcional)",
      ayuda: "Sirve para ver si la parte de las utilidades destinada a primas alcanza para pagarlas todas.",
      min: 0,
      requerido: false,
    },
    {
      id: "primasTotales",
      tipo: "moneda",
      etiqueta: "Suma de las primas de todo el personal (opcional)",
      min: 0,
      requerido: false,
    },
    { id: "trabajadores", tipo: "entero", etiqueta: "Cantidad de trabajadores (opcional)", min: 1, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses === 12 && entrada.dias > 0) throw new ErrorEntrada("Con 12 meses completos ya no quedan días sueltos.", "dias");
    const minimo = enMapa(valores["bo.prima-meses-minimos"], entrada.tipo);
    // La guía del Ministerio dice "más de tres meses" (empleados) o de un mes (obreros): el mínimo
    // justo no alcanza, hace falta al menos un día más.
    const alcanza = entrada.meses > minimo || (entrada.meses === minimo && entrada.dias > 0);
    let prima = alcanza ? montoDuodecimas(entrada.sueldo, { meses: entrada.meses, dias: entrada.dias }, redondear) : 0;
    const fondo = entrada.utilidad === null ? null : redondear(porcentaje(entrada.utilidad, valores["bo.prima-utilidades"]));
    const observaciones: string[] = [];
    if (!alcanza) observaciones.push(`Para cobrar la prima hay que trabajar más de ${minimo} ${minimo === 1 ? "mes" : "meses"} seguidos.`);
    if (fondo !== null && entrada.primasTotales !== null && fondo < entrada.primasTotales) {
      if (entrada.trabajadores !== null && alcanza) {
        prima = redondear(fondo / entrada.trabajadores);
        observaciones.push("El fondo no alcanza para pagar un sueldo a cada uno: se reparte en partes iguales entre todo el personal.");
      } else {
        observaciones.push("El fondo no alcanza para pagar todas las primas. Escriba la cantidad de trabajadores para ver el reparto en partes iguales.");
      }
    }
    observaciones.push("La prima corresponde solo si la empresa tuvo utilidades. Si no lleva contabilidad para mostrarlo, igual la tiene que pagar.");
    return { prima, fondo, observaciones };
  },
  resultado: [
    { clave: "fondo", etiqueta: "Fondo para primas (parte de las utilidades)", formato: "moneda" },
    { clave: "prima", etiqueta: "Su prima anual", formato: "moneda", destacada: true },
  ],
});
