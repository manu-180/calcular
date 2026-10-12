import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { nombreMes, variacionEntreMeses } from "../lib/indice-precios";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "cl.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "cl.reajuste-de-arriendo",
  mercado: "cl",
  concepto: "propio",
  slug: "reajuste-de-arriendo",
  estado: "publicado",
  requiere: {
    "cl.ipc": "serie",
  },
  campos: [
    { id: "arriendo", tipo: "moneda", etiqueta: "Arriendo actual", min: 0 },
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Mes del IPC inicial",
      ayuda: "El mes del IPC que se usó en el último reajuste (o el del inicio del contrato). El día no importa.",
      min: "2024-01-01",
    },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes del IPC final", ayuda: "Normalmente, el último IPC publicado.", min: "2024-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variacionEntreMeses(IPC, valores["cl.ipc"], entrada.desde, entrada.hasta, { desde: "desde", hasta: "hasta" });
    const nuevo = redondear(entrada.arriendo * v.factor);
    return {
      nuevo,
      aumento: nuevo - entrada.arriendo,
      variacion: v.acumulada,
      mesInicial: nombreMes(v.mesInicial),
      mesFinal: nombreMes(v.mesFinal),
      observaciones: v.observaciones,
    };
  },
  resultado: [
    { clave: "nuevo", etiqueta: "Nuevo arriendo", formato: "moneda", destacada: true },
    { clave: "aumento", etiqueta: "Aumento", formato: "moneda" },
    { clave: "variacion", etiqueta: "Variación del IPC", formato: "porcentaje", decimales: 2 },
    { clave: "mesInicial", etiqueta: "Desde el IPC de", formato: "texto" },
    { clave: "mesFinal", etiqueta: "Hasta el IPC de", formato: "texto" },
  ],
});
