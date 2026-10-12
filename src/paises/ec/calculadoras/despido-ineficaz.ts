import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { textoTiempo, tiempoTrabajado } from "../lib/fechas";

export default definirCalculadora({
  id: "ec.despido-ineficaz",
  mercado: "ec",
  concepto: "propio",
  slug: "despido-ineficaz",
  estado: "publicado",
  requiere: {
    "ec.desahucio": "numero",
    "ec.despido-anios-base": "numero",
    "ec.despido-meses-minimo": "numero",
    "ec.despido-meses-maximo": "numero",
    "ec.despido-ineficaz-meses": "numero",
    "ec.recargo-ineficaz": "numero",
    "ec.despido-ineficaz-plazo-dias": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Por qué el despido es ineficaz o discriminatorio",
      opciones: [
        { valor: "embarazo", etiqueta: "Estaba embarazada o en período de lactancia" },
        { valor: "dirigente", etiqueta: "Era dirigente sindical" },
        { valor: "discriminacion", etiqueta: "Otra discriminación (edad, orientación sexual u otra)" },
      ],
      porDefecto: "embarazo",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "salida", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    { id: "remuneracion", tipo: "moneda", etiqueta: "Remuneración mensual al momento del despido", min: 0 },
    {
      id: "mesesPendientes",
      tipo: "numero",
      etiqueta: "Meses de sueldo que dejaste de cobrar desde el despido",
      ayuda: "Solo cuenta si el juez ordena que vuelvas al trabajo. Si no lo sabes, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salida < entrada.inicio) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la fecha en que empezaste.", "salida");
    const rem = entrada.remuneracion;
    const t = tiempoTrabajado(entrada.inicio, entrada.salida);
    const conFraccion = t.meses > 0 || t.dias > 0;
    const base = valores["ec.despido-anios-base"];
    const hastaBase = t.anios < base || (t.anios === base && !conFraccion);
    const mesesDespido = hastaBase ? valores["ec.despido-meses-minimo"] : Math.min(t.anios + (conFraccion ? 1 : 0), valores["ec.despido-meses-maximo"]);
    const despido = redondear(rem * mesesDespido);
    const desahucio = redondear(porcentaje(rem, valores["ec.desahucio"]) * t.anios);
    const adicional = redondear(rem * valores["ec.despido-ineficaz-meses"]);
    const conReintegro = entrada.motivo !== "discriminacion";
    const pendientes = redondear(rem * entrada.mesesPendientes);
    const reintegro = conReintegro ? redondear(pendientes + porcentaje(pendientes, valores["ec.recargo-ineficaz"])) : null;
    const observaciones: string[] = [];
    if (conReintegro) {
      observaciones.push(`Tienes ${valores["ec.despido-ineficaz-plazo-dias"]} días desde el despido para presentar la acción ante el juez del trabajo. Puedes pedir volver al trabajo o cobrar la indemnización.`);
    } else {
      observaciones.push("Por discriminación no hay reintegro: te corresponde la indemnización adicional, además de la del despido.");
    }
    return {
      antiguedad: textoTiempo(t),
      despido,
      desahucio,
      adicional,
      total: redondear(despido + desahucio + adicional),
      reintegro,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "despido", etiqueta: "Indemnización por despido intempestivo", formato: "moneda" },
    { clave: "desahucio", etiqueta: "Bonificación por desahucio", formato: "moneda", ocultarSiCero: true },
    { clave: "adicional", etiqueta: "Indemnización adicional (un año de remuneración)", formato: "moneda" },
    { clave: "total", etiqueta: "Total si no vuelves al trabajo", formato: "moneda", destacada: true },
    { clave: "reintegro", etiqueta: "Sueldos pendientes con el recargo, si vuelves", formato: "moneda", ocultarSiCero: true },
  ],
});
