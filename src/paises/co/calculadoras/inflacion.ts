import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreMes, variacionEntreMeses } from "../lib/indice-precios";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "co.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "co.inflacion",
  mercado: "co",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "co.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto en pesos", min: 0, porDefecto: 1000000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", min: "2000-01-01", ayuda: "Se usa el IPC de ese mes. El día no importa." },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo quieres llevar", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variacionEntreMeses(IPC, valores["co.ipc"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    return {
      montoActualizado: redondear(entrada.monto * v.factor),
      diferencia: redondear(entrada.monto * v.factor - entrada.monto),
      acumulada: v.acumulada,
      factor: v.factor,
      mensual: v.mensual,
      interanual: v.interanual,
      mesInicial: nombreMes(v.mesInicial),
      indiceInicial: v.indiceInicial,
      mesFinal: nombreMes(v.mesFinal),
      indiceFinal: v.indiceFinal,
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "montoActualizado", etiqueta: "Monto actualizado", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Aumento por inflación", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Inflación acumulada en el periodo", formato: "porcentaje", decimales: 2 },
    { clave: "factor", etiqueta: "Factor de actualización", formato: "numero", decimales: 4 },
    { clave: "mensual", etiqueta: "Inflación mensual del mes final", formato: "porcentaje", decimales: 2 },
    { clave: "interanual", etiqueta: "Inflación anual (12 meses)", formato: "porcentaje", decimales: 2 },
    { clave: "mesInicial", etiqueta: "Mes inicial", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "IPC del mes inicial", formato: "numero", decimales: 2 },
    { clave: "mesFinal", etiqueta: "Mes final", formato: "texto" },
    { clave: "indiceFinal", etiqueta: "IPC del mes final", formato: "numero", decimales: 2 },
  ],
});
