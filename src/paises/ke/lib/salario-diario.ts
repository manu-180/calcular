// La Employment Act habla de "días de paga" sin decir cómo se saca el salario diario. Se deja elegir
// el divisor (30 días corridos o 26 laborables) y se avisa en el resultado.
export const DIVISORES = [
  { valor: "30", etiqueta: "Monthly pay ÷ 30 (calendar days)" },
  { valor: "26", etiqueta: "Monthly pay ÷ 26 (working days)" },
] as const;

export const NOTA_DIVISOR = "The Employment Act does not say how to work out a day's pay. Use the divisor in your contract or the one your employer uses.";
