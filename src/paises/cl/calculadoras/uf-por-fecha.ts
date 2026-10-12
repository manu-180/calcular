import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { fechaChilena } from "../lib/fechas";
import series from "../series.json";

const UF = (series.series.find((s) => s.id === "cl.uf")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "cl.uf-por-fecha",
  mercado: "cl",
  concepto: "propio",
  slug: "uf-por-fecha",
  estado: "publicado",
  requiere: {
    "cl.uf": "serie",
  },
  campos: [
    { id: "dia", tipo: "fecha", etiqueta: "Día", min: "2026-01-01", porDefecto: "hoy" },
    { id: "monto", tipo: "numero", etiqueta: "Monto en UF", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    // El último punto que entrega el motor marca hasta dónde se puede mirar la serie: así un caso
    // con fecha fija no ve valores publicados después.
    const ultimo = valores["cl.uf"];
    const primero = UF[0]?.[0];
    if (!primero || entrada.dia < primero) throw new ErrorEntrada(`Tenemos la UF desde el ${fechaChilena(primero ?? "2026-01-01")}.`, "dia");
    if (entrada.dia > ultimo.fecha) throw new ErrorEntrada(`El SII publicó la UF hasta el ${fechaChilena(ultimo.fecha)}.`, "dia");
    const punto = UF.find(([f]) => f === entrada.dia);
    if (!punto) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    return {
      valorUf: punto[1],
      pesos: redondear(entrada.monto * punto[1]),
      dia: entrada.dia,
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "valorUf", etiqueta: "Valor de la UF ese día", formato: "moneda", decimales: 2 },
    { clave: "dia", etiqueta: "Día", formato: "fecha" },
  ],
});
