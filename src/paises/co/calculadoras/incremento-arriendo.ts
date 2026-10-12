import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "co.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "co.incremento-arriendo",
  mercado: "co",
  concepto: "propio",
  slug: "incremento-arriendo",
  estado: "publicado",
  requiere: {
    "co.ipc": "serie",
    "co.arriendo-reajuste": "numero",
    "co.arriendo-tope-canon": "numero",
  },
  campos: [
    { id: "canon", tipo: "moneda", etiqueta: "Arriendo que pagas hoy", min: 0 },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha del reajuste", ayuda: "Cuando se cumplen los 12 meses con el mismo precio.", min: "2001-01-01", porDefecto: "hoy" },
    {
      id: "valorComercial",
      tipo: "moneda",
      etiqueta: "Valor comercial del inmueble (opcional)",
      ayuda: "Para revisar el tope del canon. No puede pasar del doble del avalúo catastral.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const anio = Number(entrada.fecha.slice(0, 4)) - 1;
    const ultimo = valores["co.ipc"].fecha;
    const indice = new Map<string, number>(IPC.filter(([f]) => f <= ultimo));
    const final = indice.get(`${anio}-12-01`);
    const inicial = indice.get(`${anio - 1}-12-01`);
    if (final === undefined || inicial === undefined) {
      throw new ErrorEntrada(`Todavía no está publicado el IPC de diciembre de ${anio}, que es el que fija el reajuste.`, "fecha");
    }
    const ipcAnual = (final / inicial - 1) * 100;
    const maximo = porcentaje(ipcAnual, valores["co.arriendo-reajuste"]);
    const aumento = redondear(porcentaje(entrada.canon, maximo));
    const nuevoCanon = entrada.canon + aumento;
    const topeCanon = entrada.valorComercial === null ? null : redondear(porcentaje(entrada.valorComercial, valores["co.arriendo-tope-canon"]));
    const observaciones: string[] = [];
    if (topeCanon !== null && nuevoCanon > topeCanon) observaciones.push("El nuevo canon pasaría el tope del 1 % del valor comercial. El arriendo no puede subir por encima de ese tope.");
    return {
      anioIpc: String(anio),
      ipcAnual,
      aumento,
      nuevoCanon,
      topeCanon,
      observaciones,
    };
  },
  resultado: [
    { clave: "anioIpc", etiqueta: "IPC que se usa (año calendario anterior)", formato: "texto" },
    { clave: "ipcAnual", etiqueta: "Inflación de ese año", formato: "porcentaje", decimales: 2 },
    { clave: "aumento", etiqueta: "Aumento máximo", formato: "moneda", decimales: 0 },
    { clave: "nuevoCanon", etiqueta: "Nuevo arriendo máximo", formato: "moneda", decimales: 0, destacada: true },
    { clave: "topeCanon", etiqueta: "Tope del canon por el valor del inmueble", formato: "moneda", decimales: 0 },
  ],
});
