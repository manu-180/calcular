import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.reserva-laboral",
  mercado: "hn",
  concepto: "fondo-cesantia",
  slug: "reserva-laboral",
  estado: "publicado",
  requiere: {
    "hn.reserva-laboral-tasa": "numero",
    "hn.reserva-laboral-techo-salarios": "numero",
    "hn.salario-minimo-mensual": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario ordinario mensual", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses de aportes", min: 1, max: 600, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimos = Object.values(valores["hn.salario-minimo-mensual"]);
    if (minimos.length === 0) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    // El techo usa el salario mínimo «en su nivel más alto»: el mayor de toda la tabla vigente.
    const techo = redondear(Math.max(...minimos) * valores["hn.reserva-laboral-techo-salarios"]);
    const base = Math.min(entrada.salario, techo);
    const mensual = redondear(porcentaje(base, valores["hn.reserva-laboral-tasa"]));
    const observaciones = [
      "El acumulado no incluye la rentabilidad que el RAP le suma a la cuenta.",
      "Si lo despiden sin causa, lo acumulado se descuenta de la cesantía. Si la reserva es mayor, la diferencia también es suya.",
      "Si se va por otra causa, recibe el saldo como prima de antigüedad.",
    ];
    if (entrada.salario > techo) observaciones.unshift("Su salario pasa del techo, así que el aporte se calcula sobre el techo.");
    return { techo, base: redondear(base), mensual, acumulado: redondear(mensual * entrada.meses), observaciones };
  },
  resultado: [
    { clave: "techo", etiqueta: "Techo del aporte", formato: "moneda" },
    { clave: "base", etiqueta: "Salario sobre el que se aporta", formato: "moneda" },
    { clave: "mensual", etiqueta: "Aporte mensual del patrono", formato: "moneda", destacada: true },
    { clave: "acumulado", etiqueta: "Acumulado en el período", formato: "moneda" },
  ],
});
