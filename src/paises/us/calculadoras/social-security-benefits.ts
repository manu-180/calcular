import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// 20 CFR 404.409: edad plena de jubilación de 67 años para nacidos desde el 2/1/1960.
const EDAD_PLENA_MESES = 67 * 12;
// 20 CFR 404.410 y 404.313: 5/9 de 1 % por cada uno de los primeros 36 meses de adelanto, 5/12 de
// 1 % por los siguientes, y 2/3 de 1 % por mes de demora hasta los 70.
const ADELANTO_PRIMEROS = 5 / 9;
const ADELANTO_RESTO = 5 / 12;
const DEMORA = 2 / 3;

// La SSA redondea el PIA y los montos ajustados hacia abajo al múltiplo de 10 centavos, y el pago
// mensual hacia abajo al dólar. El 1e-7 evita que 2345.8 guardado como 2345.7999... baje un décimo.
const bajarADecimo = (x: number) => Math.floor(x * 10 + 1e-7) / 10;
const bajarADolar = (x: number) => Math.floor(x + 1e-7);

export default definirCalculadora({
  id: "us.social-security-benefits",
  mercado: "us",
  concepto: "jubilacion",
  slug: "social-security-benefits",
  estado: "publicado",
  requiere: {
    "us.pia-formula": "escala",
  },
  campos: [
    {
      id: "aime",
      tipo: "moneda",
      etiqueta: "Average indexed monthly earnings (AIME)",
      min: 0,
      porDefecto: 5000,
      ayuda: "Your top 35 years of earnings, indexed for wage growth, divided by 420 months. Your my Social Security account shows your earnings record.",
    },
    { id: "anios", tipo: "entero", etiqueta: "Age when you start benefits (years)", min: 62, max: 70, porDefecto: 67 },
    { id: "meses", tipo: "entero", etiqueta: "Plus months", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const inicio = entrada.anios * 12 + entrada.meses;
    if (inicio > 70 * 12) throw new ErrorEntrada("Benefits stop growing at 70. Choose an age up to 70 years and 0 months.", "meses");
    const pia = bajarADecimo(redondear(aplicarEscalaMarginal(valores["us.pia-formula"], entrada.aime)));
    const adelanto = Math.max(0, EDAD_PLENA_MESES - inicio);
    const demora = Math.max(0, inicio - EDAD_PLENA_MESES);
    const ajuste =
      adelanto > 0
        ? -(Math.min(36, adelanto) * ADELANTO_PRIMEROS + Math.max(0, adelanto - 36) * ADELANTO_RESTO)
        : demora * DEMORA;
    const ajustado = bajarADecimo(redondear(pia * (1 + ajuste / 100)));
    const mensual = bajarADolar(ajustado);
    return {
      pia,
      ajuste: redondear(ajuste),
      mensual,
      anual: mensual * 12,
      observaciones: [
        "Estimate for people born in 1960 or later, whose full retirement age is 67. It uses the benefit formula for people who turn 62 in 2026 and leaves out future cost-of-living increases.",
        "Medicare premiums are usually taken from the payment. Working while you collect before full retirement age can hold back part of it.",
      ],
    };
  },
  resultado: [
    { clave: "pia", etiqueta: "Benefit at full retirement age (PIA)", formato: "moneda" },
    { clave: "ajuste", etiqueta: "Adjustment for your starting age", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Estimated monthly benefit", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Per year", formato: "moneda" },
  ],
});
