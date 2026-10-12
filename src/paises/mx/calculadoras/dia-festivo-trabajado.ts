import { definirCalculadora } from "@/motor/calculo";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.dia-festivo-trabajado",
  mercado: "mx",
  concepto: "propio",
  slug: "dia-festivo-trabajado",
  estado: "publicado",
  requiere: {
    "mx.pago-descanso-trabajado": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué día trabajaste",
      opciones: [
        { valor: "festivo", etiqueta: "Un día de descanso obligatorio (festivo oficial)" },
        { valor: "descanso", etiqueta: "Mi día de descanso semanal" },
      ],
      porDefecto: "festivo",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "dias", tipo: "entero", etiqueta: "Cuántos de esos días trabajaste", min: 1, max: 60, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const factor = valores["mx.pago-descanso-trabajado"];
    const adicionalPorDia = redondear(diario * factor);
    const observaciones = [
      entrada.tipo === "festivo"
        ? "El salario normal de ese día ya va en tu sueldo; el pago doble es aparte."
        : "Si tu día de descanso es domingo, además te toca la prima dominical.",
    ];
    return {
      diario,
      adicionalPorDia,
      totalPorDia: redondear(diario + adicionalPorDia),
      adicional: redondear(adicionalPorDia * entrada.dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "adicionalPorDia", etiqueta: "Pago extra por cada día", formato: "moneda" },
    { clave: "totalPorDia", etiqueta: "Lo que cobras en total por cada día", formato: "moneda" },
    { clave: "adicional", etiqueta: "Pago extra total", formato: "moneda", destacada: true },
  ],
});
