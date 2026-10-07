import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { dias360, indemnizacionIndefinido } from "../reglas";

export default definirCalculadora({
  id: "co.indemnizacion-por-despido",
  mercado: "co",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-despido",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.indemnizacion-dias": "mapa",
    "co.indemnizacion-umbral": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indefinido", etiqueta: "A término indefinido" },
        { valor: "fijo", etiqueta: "A término fijo" },
      ],
      porDefecto: "indefinido",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaDespido", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "finContrato",
      tipo: "fecha",
      etiqueta: "Fecha en que terminaba el contrato",
      ayuda: "Solo para contrato a término fijo.",
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaDespido < entrada.fechaIngreso) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la de ingreso.", "fechaDespido");
    const diasServicio = dias360(entrada.fechaIngreso, entrada.fechaDespido);
    if (entrada.contrato === "fijo") {
      const fin = entrada.finContrato;
      if (fin === null) throw new ErrorEntrada("Escribe la fecha en que terminaba tu contrato.", "finContrato");
      if (fin <= entrada.fechaDespido) throw new ErrorEntrada("La fecha de fin del contrato tiene que ser posterior al despido.", "finContrato");
      const diasFaltantes = dias360(sumarDias(entrada.fechaDespido, 1), fin);
      return {
        diasServicio,
        diasIndemnizacion: diasFaltantes,
        salarioDiario: redondear(entrada.salario / 30),
        indemnizacion: redondear((entrada.salario / 30) * diasFaltantes),
        observaciones: ["En un contrato a término fijo te pagan los salarios del tiempo que faltaba para terminar el contrato."],
      };
    }
    const ind = indemnizacionIndefinido(
      entrada.salario,
      diasServicio,
      valores["co.smmlv"],
      valores["co.indemnizacion-dias"],
      valores["co.indemnizacion-umbral"],
      redondear,
    );
    const d = valores["co.indemnizacion-dias"];
    const umbral = valores["co.indemnizacion-umbral"];
    const tabla = ind.tablaAlta
      ? `Ganas ${umbral} salarios mínimos o más: se pagan ${d["primer-anio-mayor"]} días por el primer año y ${d["anio-adicional-mayor"]} por cada año siguiente.`
      : `Ganas menos de ${umbral} salarios mínimos: se pagan ${d["primer-anio-menor"]} días por el primer año y ${d["anio-adicional-menor"]} por cada año siguiente.`;
    return {
      diasServicio,
      diasIndemnizacion: ind.dias,
      salarioDiario: redondear(entrada.salario / 30),
      indemnizacion: ind.valor,
      observaciones: [tabla],
    };
  },
  resultado: [
    { clave: "diasServicio", etiqueta: "Tiempo trabajado", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda", decimales: 0 },
    { clave: "diasIndemnizacion", etiqueta: "Días de salario de indemnización", formato: "dias", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", decimales: 0, destacada: true },
  ],
});
