import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "cr.contrato-a-plazo-fijo",
  mercado: "cr",
  concepto: "propio",
  slug: "contrato-a-plazo-fijo",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.contrato-plazo-fijo": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaInicio", tipo: "fecha", etiqueta: "Fecha de inicio del contrato" },
    { id: "fechaFinPactada", tipo: "fecha", etiqueta: "Fecha en que debía terminar el contrato" },
    { id: "fechaTerminacion", tipo: "fecha", etiqueta: "Último día que trabajó", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fechaInicio, fechaFinPactada, fechaTerminacion } = entrada;
    if (fechaFinPactada < fechaInicio) throw new ErrorEntrada("La fecha pactada de fin tiene que ser posterior al inicio.", "fechaFinPactada");
    if (fechaTerminacion < fechaInicio) throw new ErrorEntrada("El último día trabajado no puede ser anterior al inicio.", "fechaTerminacion");
    if (fechaTerminacion >= fechaFinPactada) throw new ErrorEntrada("Si trabajó hasta la fecha pactada, el contrato terminó en su plazo y no hay indemnización.", "fechaTerminacion");
    const reglas = valores["cr.contrato-plazo-fijo"];
    const trabajados = diasEntre(fechaInicio, fechaTerminacion) + 1;
    // Art. 31: un día por cada siete trabajados «o fracción de tiempo menor», así que la fracción cuenta entera.
    const porDias = Math.ceil(trabajados / enMapa(reglas, "dias-trabajados-por-dia"));
    const seisMesesOMas = sumarMeses(fechaInicio, 6) <= fechaFinPactada;
    const minimo = enMapa(reglas, seisMesesOMas ? "minimo-seis-meses" : "minimo");
    const dias = Math.max(porDias, minimo);
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    return {
      diasTrabajados: trabajados,
      dias,
      salarioDiario: redondear(diario),
      indemnizacion: redondear(diario * dias),
      observaciones: [
        "Esto es lo mínimo que el patrono debe pagar el mismo día en que termina el contrato. Además, un juez puede ordenar daños y perjuicios.",
      ],
    };
  },
  resultado: [
    { clave: "diasTrabajados", etiqueta: "Días trabajados", formato: "dias" },
    { clave: "dias", etiqueta: "Días de salario de indemnización", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización mínima", formato: "moneda", destacada: true },
  ],
});
