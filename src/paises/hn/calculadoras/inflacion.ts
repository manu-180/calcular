import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { actualizarPorIndice } from "../lib/inflacion";
import series from "../series.json";

// El motor entrega solo el último punto de una serie; para comparar dos meses hace falta la serie
// entera, que se lee del mismo series.json que actualiza el cron.
const PUNTOS = series.series.find((s) => s.id === "hn.ipc")!.puntos as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "hn.inflacion",
  mercado: "hn",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "hn.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a actualizar", min: 0, porDefecto: 1000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", min: "2020-12-01", porDefecto: "2021-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo quiere llevar", min: "2020-12-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = actualizarPorIndice(PUNTOS, valores["hn.ipc"], entrada.monto, entrada.desde, entrada.hasta, redondear, {
      antesDelInicio: (primerMes) => `La calculadora tiene datos desde ${primerMes}. Elija un mes desde ahí en adelante.`,
      destinoSinDato: (ultimoMes) => `El BCH todavía no publicó la inflación del mes que eligió. Se usó el último dato disponible, ${ultimoMes}.`,
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
    { clave: "indiceOrigen", etiqueta: "Índice del mes de origen (dic. 2020 = 100)", formato: "numero", decimales: 2 },
    { clave: "indiceDestino", etiqueta: "Índice del mes de destino (dic. 2020 = 100)", formato: "numero", decimales: 2 },
    { clave: "factor", etiqueta: "Factor de actualización", formato: "numero", decimales: 4 },
  ],
});
