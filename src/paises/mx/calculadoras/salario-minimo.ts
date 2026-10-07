import { definirCalculadora, porRegion } from "@/motor/calculo";
import { DIAS_PERIODO, salarioDiario, OPCIONES_PERIODO } from "../nomina";

export default definirCalculadora({
  id: "mx.salario-minimo",
  mercado: "mx",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo (opcional, para compararlo)", min: 0, requerido: false },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = porRegion(valores["mx.salario-minimo"], entrada.region);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.sueldo !== null) {
      const tuDiario = salarioDiario(entrada.sueldo, entrada.periodo);
      diferencia = redondear(tuDiario - diario);
      observaciones.push(
        diferencia < 0
          ? "Tu sueldo está por debajo del mínimo. Por una jornada completa, ninguna empresa puede pagarte menos."
          : "Tu sueldo está en el mínimo o por encima.",
      );
    }
    return {
      diario,
      semanal: redondear(diario * DIAS_PERIODO.semanal),
      quincenal: redondear(diario * DIAS_PERIODO.quincenal),
      mensual: redondear(diario * DIAS_PERIODO.mensual),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario mínimo diario", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Por semana (7 días)", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Por quincena (15 días)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Por mes (30.4 días)", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Diferencia diaria entre tu sueldo y el mínimo", formato: "moneda" },
  ],
});
