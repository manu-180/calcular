import { definirCalculadora } from "@/motor/calculo";
import { actualizarPorIndice } from "../lib/inflacion";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

// El motor entrega solo el último punto de una serie; para comparar dos meses hace falta la serie
// entera, que se lee del mismo series.json que actualiza el cron.
const PUNTOS = series.series.find((s) => s.id === "sv.ipc")!.puntos as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "sv.inflacion",
  mercado: "sv",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "sv.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a actualizar", min: 0, porDefecto: 100 },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", min: "2009-12-01", porDefecto: "2020-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo quiere llevar", min: "2009-12-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = actualizarPorIndice(PUNTOS, valores["sv.ipc"], entrada.monto, entrada.desde, entrada.hasta, redondear, {
      antesDelInicio: (primerMes) => `La serie del IPC empieza en ${primerMes}. Elija un mes desde ahí en adelante.`,
      destinoSinDato: (ultimoMes) => `Todavía no hay IPC publicado para el mes que eligió. Se usó el último disponible, ${ultimoMes}.`,
      haciaAtras: "El mes de destino es anterior al del monto: el resultado muestra cuánto valía ese dinero en el pasado.",
    });
    return { ...r };
  },
  resultado: [
    { clave: "montoActualizado", etiqueta: "Monto actualizado", formato: "moneda", destacada: true },
    { clave: "variacionAcumulada", etiqueta: "Inflación entre los dos meses", formato: "porcentaje" },
    { clave: "mesOrigen", etiqueta: "Mes de origen", formato: "texto" },
    { clave: "mesDestino", etiqueta: "Mes de destino", formato: "texto" },
    { clave: "variacionMensual", etiqueta: "Inflación mensual del mes de destino", formato: "porcentaje" },
    { clave: "variacionInteranual", etiqueta: "Inflación interanual del mes de destino", formato: "porcentaje" },
    { clave: "indiceOrigen", etiqueta: "IPC del mes de origen", formato: "numero", decimales: 2 },
    { clave: "indiceDestino", etiqueta: "IPC del mes de destino", formato: "numero", decimales: 2 },
    { clave: "factor", etiqueta: "Factor de actualización", formato: "numero", decimales: 4 },
  ],
});
