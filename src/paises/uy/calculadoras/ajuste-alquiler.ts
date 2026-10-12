import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { historialIpc, mesDe, mesesAtras, nombreMes, primerMes, variacion } from "../lib/ipc";

export default definirCalculadora({
  id: "uy.ajuste-alquiler",
  mercado: "uy",
  concepto: "propio",
  slug: "ajuste-alquiler",
  estado: "publicado",
  requiere: {
    "uy.ipc": "serie",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquiler actual", min: 0 },
    { id: "ultimo", tipo: "fecha", etiqueta: "Mes del último ajuste (o del inicio del contrato)", min: "2001-01-01" },
    { id: "nuevo", tipo: "fecha", etiqueta: "Mes del nuevo ajuste", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const ultimoIpc = valores["uy.ipc"];
    const ipc = historialIpc(ultimoIpc);
    const mesUltimoIpc = mesDe(ultimoIpc.fecha);
    // Se usa el IPC del mes anterior a cada ajuste: es el último publicado cuando se ajusta.
    const desde = mesesAtras(mesDe(entrada.ultimo), 1);
    const pedido = mesesAtras(mesDe(entrada.nuevo), 1);
    const hasta = pedido > mesUltimoIpc ? mesUltimoIpc : pedido;
    if (desde < primerMes()) throw new ErrorEntrada("Tenemos el IPC desde enero de 2000. Elegí un ajuste desde febrero de 2000.", "ultimo");
    if (desde >= hasta) throw new ErrorEntrada("El nuevo ajuste tiene que ser posterior al último.", "nuevo");
    const inicial = ipc.get(desde);
    const final = ipc.get(hasta);
    if (inicial === undefined || final === undefined) throw new ErrorEntrada("No hay IPC publicado para ese mes.", "ultimo");
    const observaciones: string[] = [];
    if (pedido > mesUltimoIpc) observaciones.push("El INE todavía no publicó el IPC que corresponde. Usamos el último disponible.");
    observaciones.push("Revisá tu contrato: puede ajustar por IPC, por UI o por el coeficiente oficial de alquileres. Esta cuenta es por IPC.");
    const nuevoAlquiler = redondear((entrada.alquiler * final) / inicial);
    return {
      nuevoAlquiler,
      aumento: redondear(nuevoAlquiler - entrada.alquiler),
      variacionIpc: variacion(final, inicial),
      mesDesde: nombreMes(desde),
      mesHasta: nombreMes(hasta),
      observaciones,
    };
  },
  resultado: [
    { clave: "nuevoAlquiler", etiqueta: "Nuevo alquiler", formato: "moneda", destacada: true },
    { clave: "aumento", etiqueta: "Aumento por mes", formato: "moneda" },
    { clave: "variacionIpc", etiqueta: "Variación del IPC", formato: "porcentaje" },
    { clave: "mesDesde", etiqueta: "IPC de partida", formato: "texto" },
    { clave: "mesHasta", etiqueta: "IPC de llegada", formato: "texto" },
  ],
});
