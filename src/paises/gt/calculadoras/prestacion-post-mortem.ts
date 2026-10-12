import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosCumplidos } from "../prestaciones";

export default definirCalculadora({
  id: "gt.prestacion-post-mortem",
  mercado: "gt",
  concepto: "propio",
  slug: "prestacion-post-mortem",
  estado: "publicado",
  requiere: {
    "gt.post-mortem-meses-por-anio": "numero",
    "gt.post-mortem-tope-meses": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del trabajador", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fechaFallecimiento", tipo: "fecha", etiqueta: "Fecha de fallecimiento" },
    { id: "empresa", tipo: "opcion-dato", dato: "gt.post-mortem-tope-meses", etiqueta: "Tamaño de la empresa", porDefecto: "20-o-mas" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaFallecimiento) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior al fallecimiento.", "fechaIngreso");
    const anios = aniosCumplidos(entrada.fechaIngreso, entrada.fechaFallecimiento);
    const tope = enMapa(valores["gt.post-mortem-tope-meses"], entrada.empresa);
    const meses = Math.min(anios * valores["gt.post-mortem-meses-por-anio"], tope);
    const observaciones = [
      "La paga el patrono a los familiares que dependían del trabajador, en cuotas mensuales iguales a su salario.",
      "Si el trabajador estaba en el IGSS y sus familiares reciben pensión, el patrono solo paga la diferencia si la pensión es menor.",
    ];
    if (anios * valores["gt.post-mortem-meses-por-anio"] > tope) observaciones.push("Se aplicó el máximo de meses según el tamaño de la empresa.");
    return { anios, meses, total: redondear(entrada.salario * meses), observaciones };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años completos de servicio", formato: "anios" },
    { clave: "meses", etiqueta: "Meses de salario", formato: "meses" },
    { clave: "total", etiqueta: "Prestación total", formato: "moneda", destacada: true },
  ],
});
