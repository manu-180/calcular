import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "kw.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

export default definirCalculadora({
  id: "kw.inflation-calculator",
  mercado: "kw",
  concepto: "inflacion",
  slug: "inflation-calculator",
  estado: "publicado",
  requiere: {
    "kw.cpi": "serie",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    { id: "desde", tipo: "fecha", etiqueta: "Date of the original amount", min: "2023-07-01", porDefecto: "2023-07-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Date to bring it to", min: "2023-07-01", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    if (entrada.hasta <= entrada.desde) throw new ErrorEntrada("The second date has to be after the first one.", "hasta");
    const ultimo = v["kw.cpi"];
    const puntos = CPI.filter(([f]) => f <= ultimo.fecha);
    const buscar = (fecha: string) => {
      const mes = `${fecha.slice(0, 7)}-01`;
      let elegido: PuntoSerieTupla | undefined;
      for (const p of puntos) if (p[0] <= mes) elegido = p;
      return elegido;
    };
    const inicial = buscar(entrada.desde);
    const final = buscar(entrada.hasta);
    if (!inicial || !final) throw new ErrorEntrada("The CPI series in this calculator starts in July 2023.", "desde");
    const factor = final[1] / inicial[1];
    return {
      actualizado: redondear(entrada.importe * factor),
      diferencia: redondear(entrada.importe * (factor - 1)),
      acumulada: (factor - 1) * 100,
      periodo: `${nombreMes(inicial[0])} to ${nombreMes(final[0])}`,
      indiceInicial: inicial[1],
      indiceFinal: final[1],
    };
  },
  resultado: [
    { clave: "actualizado", etiqueta: "Amount adjusted for inflation", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Increase from inflation", formato: "moneda" },
    { clave: "acumulada", etiqueta: "CPI inflation over the period", formato: "porcentaje", decimales: 2 },
    { clave: "periodo", etiqueta: "Period", formato: "texto" },
    { clave: "indiceInicial", etiqueta: "CPI at the start (2013 = 100)", formato: "numero", decimales: 1 },
    { clave: "indiceFinal", etiqueta: "CPI at the end (2013 = 100)", formato: "numero", decimales: 1 },
  ],
});
