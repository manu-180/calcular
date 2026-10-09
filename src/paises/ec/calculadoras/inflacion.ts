import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { historialIpc, mesDe, mesesAtras, nombreMes, primerMes, variacion } from "../lib/ipc";

export default definirCalculadora({
  id: "ec.inflacion",
  mercado: "ec",
  concepto: "inflacion",
  slug: "inflacion",
  estado: "publicado",
  requiere: {
    "ec.ipc": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a actualizar", min: 0, porDefecto: 10000 },
    { id: "desde", tipo: "fecha", etiqueta: "Mes del monto original", ayuda: "Cualquier día del mes sirve: se usa el IPC de ese mes.", min: "2000-01-01" },
    { id: "hasta", tipo: "fecha", etiqueta: "Mes al que lo quieres llevar", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const ultimo = valores["ec.ipc"];
    const ipc = historialIpc(ultimo);
    const mesUltimo = mesDe(ultimo.fecha);
    const desde = mesDe(entrada.desde);
    const pedido = mesDe(entrada.hasta);
    const hasta = pedido > mesUltimo ? mesUltimo : pedido;
    if (desde < primerMes()) throw new ErrorEntrada("Tenemos el IPC desde enero de 2000. Elige un mes desde ahí.", "desde");
    if (desde > hasta) throw new ErrorEntrada("El mes del monto original tiene que ser anterior al mes al que lo quieres llevar.", "desde");
    const indiceDesde = ipc.get(desde);
    const indiceHasta = ipc.get(hasta);
    if (indiceDesde === undefined || indiceHasta === undefined) throw new ErrorEntrada("No hay IPC publicado para ese mes.", "desde");
    const observaciones: string[] = [];
    if (pedido > mesUltimo) observaciones.push("El INEC todavía no publicó el IPC del mes que elegiste. Usamos el último disponible.");
    return {
      montoActualizado: redondear((entrada.monto * indiceHasta) / indiceDesde),
      variacionPeriodo: variacion(indiceHasta, indiceDesde),
      mesDesde: nombreMes(desde),
      mesHasta: nombreMes(hasta),
      indiceDesde,
      indiceHasta,
      variacionMensual: variacion(indiceHasta, ipc.get(mesesAtras(hasta, 1))),
      variacionAnio: variacion(indiceHasta, ipc.get(`${Number(hasta.slice(0, 4)) - 1}-12-01`)),
      variacionInteranual: variacion(indiceHasta, ipc.get(mesesAtras(hasta, 12))),
      observaciones,
    };
  },
  resultado: [
    { clave: "montoActualizado", etiqueta: "Monto actualizado", formato: "moneda", destacada: true },
    { clave: "variacionPeriodo", etiqueta: "Inflación entre los dos meses", formato: "porcentaje" },
    { clave: "mesDesde", etiqueta: "Mes de origen", formato: "texto" },
    { clave: "mesHasta", etiqueta: "Mes de destino", formato: "texto" },
    { clave: "indiceDesde", etiqueta: "IPC del mes de origen", formato: "numero", decimales: 2 },
    { clave: "indiceHasta", etiqueta: "IPC del mes de destino", formato: "numero", decimales: 2 },
    { clave: "variacionMensual", etiqueta: "Inflación del mes de destino", formato: "porcentaje" },
    { clave: "variacionAnio", etiqueta: "Acumulada en el año hasta ese mes", formato: "porcentaje" },
    { clave: "variacionInteranual", etiqueta: "Últimos 12 meses hasta ese mes", formato: "porcentaje" },
  ],
});
