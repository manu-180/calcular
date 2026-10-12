import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "co.indemnizacion-moratoria",
  mercado: "co",
  concepto: "propio",
  slug: "indemnizacion-moratoria",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.moratoria-meses": "numero",
    "co.moratoria-umbral": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Qué no te pagaron a tiempo",
      opciones: [
        { valor: "liquidacion", etiqueta: "Salarios y prestaciones al terminar el contrato" },
        { valor: "cesantias", etiqueta: "Las cesantías no consignadas en el fondo" },
      ],
      porDefecto: "liquidacion",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Último salario mensual", min: 0 },
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Fecha en que te tenían que pagar",
      ayuda: "El día en que terminó el contrato. Para cesantías, el 14 de febrero.",
    },
    { id: "pago", tipo: "fecha", etiqueta: "Fecha del pago (o de hoy, si no han pagado)", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.pago < entrada.desde) throw new ErrorEntrada("La fecha del pago tiene que ser posterior.", "pago");
    const diasRetraso = diasEntre(entrada.desde, entrada.pago);
    const conTope = entrada.motivo === "liquidacion" && entrada.salario > valores["co.moratoria-umbral"] * valores["co.smmlv"];
    const diasTope = diasEntre(entrada.desde, sumarMeses(entrada.desde, valores["co.moratoria-meses"]));
    const dias = conTope ? Math.min(diasRetraso, diasTope) : diasRetraso;
    const observaciones: string[] = [];
    if (conTope && diasRetraso > diasTope) {
      observaciones.push("Pasados 24 meses, la indemnización diaria se reemplaza por intereses de mora a la tasa máxima sobre lo adeudado. Ese valor no está en este cálculo.");
    }
    return {
      diasRetraso,
      dias,
      salarioDiario: redondear(entrada.salario / 30),
      total: redondear((entrada.salario / 30) * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasRetraso", etiqueta: "Días de retraso", formato: "dias" },
    { clave: "dias", etiqueta: "Días que se pagan", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Indemnización moratoria", formato: "moneda", decimales: 0, destacada: true },
  ],
});
