import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.decimo-tercer-sueldo",
  mercado: "ec",
  concepto: "bono-semestral",
  slug: "decimo-tercer-sueldo",
  estado: "publicado",
  requiere: { "ec.sbu": "numero" },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo mensual",
      ayuda: "Tu remuneración de cada mes, sin contar los décimos, las utilidades ni el fondo de reserva.",
      min: 0,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados del 1 de diciembre al 30 de noviembre",
      ayuda: "Si trabajaste el período completo, deja 12. Puedes usar decimales: 7,5 es siete meses y medio.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
    {
      id: "extras",
      tipo: "moneda",
      etiqueta: "Horas extra, comisiones y bonos del período",
      ayuda: "La suma de todo el período. Si no tuviste, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("El período tiene 12 meses como máximo.", "meses");
    const total = entrada.sueldo * entrada.meses + entrada.extras;
    const observaciones = ["Si lo cobras cada mes en tu rol de pagos, ya lo recibiste. Este cálculo es para quien lo cobra acumulado, hasta el 24 de diciembre."];
    if (entrada.sueldo > 0 && entrada.sueldo < valores["ec.sbu"]) observaciones.push("Tu sueldo está por debajo del salario básico. Con jornada completa, el mínimo legal es el básico.");
    return {
      total: redondear(total),
      mensual: redondear(entrada.sueldo / 12),
      decimo: redondear(total / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total ganado en el período", formato: "moneda" },
    { clave: "mensual", etiqueta: "Valor mensual (si lo cobras cada mes)", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercero a cobrar", formato: "moneda", destacada: true },
  ],
});
