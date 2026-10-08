import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { actualizarPorIndice } from "../lib/inflacion";
import series from "../series.json";

// El motor entrega solo el último punto de una serie; para comparar dos meses hace falta la serie
// entera, que se lee del mismo series.json que actualiza el cron.
const PUNTOS = series.series.find((s) => s.id === "ve.inpc")!.puntos as unknown as readonly PuntoSerieTupla[];

// Desde octubre 2021 rige la expresión monetaria del Decreto 4.553 (G.O. 42.185, un bolívar = un millón
// de los anteriores): un monto anterior está en otra unidad y habría que
// dividirlo por la reconversión antes de actualizarlo. Por eso el campo no deja elegir meses previos.
const PRIMER_MES = "2021-10-01";

export default definirCalculadora({
  id: "ve.inflacion",
  mercado: "ve",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "ve.inpc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a actualizar (en bolívares)", min: 0, porDefecto: 1000, moneda: "VES" },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", min: PRIMER_MES, porDefecto: "2025-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo quieres llevar", min: PRIMER_MES, porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = actualizarPorIndice(
      PUNTOS,
      valores["ve.inpc"],
      entrada.monto,
      entrada.desde,
      entrada.hasta,
      redondear,
      {
        antesDelInicio: () => "Elige un mes desde octubre de 2021, cuando empezó el bolívar digital. Los montos anteriores están en otra unidad monetaria.",
        destinoSinDato: (ultimoMes) => `El BCV todavía no publicó el INPC del mes que elegiste. Se usó el último disponible, ${ultimoMes}.`,
        haciaAtras: "El mes de destino es anterior al del monto: el resultado muestra cuánto valía ese dinero en el pasado.",
      },
      PRIMER_MES,
    );
    return { ...r };
  },
  resultado: [
    { clave: "montoActualizado", etiqueta: "Monto actualizado", formato: "moneda", destacada: true },
    { clave: "variacionAcumulada", etiqueta: "Inflación entre los dos meses", formato: "porcentaje" },
    { clave: "mesOrigen", etiqueta: "Mes de origen", formato: "texto" },
    { clave: "mesDestino", etiqueta: "Mes de destino", formato: "texto" },
    { clave: "variacionMensual", etiqueta: "Inflación mensual del mes de destino", formato: "porcentaje" },
    { clave: "variacionInteranual", etiqueta: "Inflación interanual del mes de destino", formato: "porcentaje" },
    { clave: "factor", etiqueta: "Factor de actualización", formato: "numero", decimales: 4 },
  ],
});
