import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import series from "../series.json";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// El motor entrega solo el último punto de una serie y la variación entre dos meses necesita la serie
// entera: se lee de series.json (lo actualiza scripts/paises/do/actualizar_ipc.ts). El requisito "serie" sigue en
// `requiere` para que la calculadora deje de publicarse si el IPC se queda sin actualizar.
const puntos = (series.series.find((s) => s.id === "do.ipc")?.puntos ?? []) as unknown as readonly (readonly [string, number])[];
const indice = new Map(puntos.map(([f, v]) => [f.slice(0, 7), v]));
const opciones = [...puntos].reverse().map(([f]) => ({ valor: f.slice(0, 7), etiqueta: `${MESES[Number(f.slice(5, 7)) - 1]} de ${f.slice(0, 4)}` }));

function mesAnterior(mes: string, meses: number): string {
  const total = Number(mes.slice(0, 4)) * 12 + Number(mes.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`;
}

export default definirCalculadora({
  id: "do.inflacion",
  mercado: "do",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "do.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto en pesos", min: 0, porDefecto: 10000 },
    { id: "desde", tipo: "opcion", etiqueta: "Mes de origen del monto", opciones, porDefecto: opciones[12]?.valor ?? opciones[opciones.length - 1]?.valor },
    { id: "hasta", tipo: "opcion", etiqueta: "Mes al que lo quieres actualizar", opciones, porDefecto: opciones[0]?.valor },
  ],
  calcular(entrada, valores, { redondear }) {
    const ultimo = valores["do.ipc"].fecha.slice(0, 7);
    const inicial = indice.get(entrada.desde);
    const final = indice.get(entrada.hasta);
    if (inicial === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    if (final === undefined || entrada.hasta > ultimo) throw new ErrorEntrada("Ese mes todavía no tiene IPC publicado.", "hasta");
    if (entrada.desde >= entrada.hasta) throw new ErrorEntrada("El mes de origen tiene que ser anterior al mes al que quieres actualizar.", "desde");
    const factor = final / inicial;
    const actualizado = redondear(entrada.monto * factor);
    const previo = indice.get(mesAnterior(entrada.hasta, 1));
    const haceUnAnio = indice.get(mesAnterior(entrada.hasta, 12));
    return {
      actualizado,
      diferencia: redondear(actualizado - entrada.monto),
      acumulada: redondear((factor - 1) * 100),
      mensual: previo === undefined ? null : redondear((final / previo - 1) * 100),
      interanual: haceUnAnio === undefined ? null : redondear((final / haceUnAnio - 1) * 100),
      indiceInicial: inicial,
      indiceFinal: final,
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Monto actualizado", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Diferencia por inflación", formato: "moneda" },
    { clave: "acumulada", etiqueta: "Inflación acumulada entre los dos meses", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Inflación del mes final (contra el mes anterior)", formato: "porcentaje" },
    { clave: "interanual", etiqueta: "Inflación interanual del mes final", formato: "porcentaje" },
    { clave: "indiceInicial", etiqueta: "IPC del mes de origen", formato: "numero", decimales: 2 },
    { clave: "indiceFinal", etiqueta: "IPC del mes final", formato: "numero", decimales: 2 },
  ],
});
