import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { redondear as redondearA } from "@/motor/formato";

export default definirCalculadora({
  id: "co.vacaciones",
  mercado: "co",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "co.vacaciones-dias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual (sin auxilio de transporte)", min: 0 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados sin tomar vacaciones",
      ayuda: "Un año son 360 días (meses de 30 días).",
      min: 1,
      porDefecto: 360,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("Escribe al menos 1 día.", "dias");
    const diasVacaciones = (entrada.dias * valores["co.vacaciones-dias"]) / 360;
    return {
      diasVacaciones: redondearA(diasVacaciones, { decimales: 2, modo: "mitad-arriba" }),
      salarioDiario: redondear(entrada.salario / 30),
      valor: redondear((entrada.salario / 30) * diasVacaciones),
    };
  },
  resultado: [
    { clave: "diasVacaciones", etiqueta: "Días hábiles de vacaciones que llevas", formato: "dias", decimales: 2 },
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda", decimales: 0 },
    { clave: "valor", etiqueta: "Valor de esas vacaciones", formato: "moneda", decimales: 0, destacada: true },
  ],
});
