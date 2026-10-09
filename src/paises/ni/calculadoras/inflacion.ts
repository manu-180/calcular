import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { actualizarPorIndice } from "../lib/inflacion";
import series from "../series.json";

// El motor entrega solo el último punto de una serie; para comparar dos meses hace falta la serie
// entera, que se lee del mismo series.json.
const PUNTOS = series.series.find((s) => s.id === "ni.ipc")!.puntos as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "ni.inflacion",
  mercado: "ni",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "ni.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a actualizar", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", min: "2011-01-01", porDefecto: "2020-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo querés llevar", min: "2011-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = actualizarPorIndice(PUNTOS, valores["ni.ipc"], entrada.monto, entrada.desde, entrada.hasta, redondear, {
      antesDelInicio: (primerMes) => `La calculadora tiene el IPC desde ${primerMes}. Elegí un mes desde ahí en adelante.`,
      destinoSinDato: (ultimoMes) => `El INIDE todavía no publicó el IPC del mes que elegiste. Se usó el último disponible, ${ultimoMes}.`,
      haciaAtras: "El mes de destino es anterior al del monto: el resultado muestra cuánto valía esa plata en el pasado.",
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
