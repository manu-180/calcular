import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.multa-sri",
  mercado: "ec",
  concepto: "propio",
  slug: "multa-sri",
  estado: "publicado",
  requiere: {
    "ec.multa-declaracion": "numero",
    "ec.multa-declaracion-tope": "numero",
    "ec.multa-sin-impuesto": "numero",
    "ec.multa-sin-impuesto-tope": "numero",
    "ec.multa-recargo-cobro": "numero",
  },
  campos: [
    {
      id: "impuesto",
      tipo: "moneda",
      etiqueta: "Impuesto de la declaración",
      ayuda: "El impuesto causado. En el IVA, el valor a pagar después del crédito tributario. Si no tienes impuesto, deja 0.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ventas o ingresos del período",
      ayuda: "Solo se usa si la declaración no tiene impuesto a pagar.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Meses de retraso",
      ayuda: "Cada fracción de mes cuenta como un mes entero: 10 días de retraso son 1 mes.",
      min: 1,
      porDefecto: 1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const conImpuesto = entrada.impuesto > 0;
    const tasa = conImpuesto
      ? Math.min(valores["ec.multa-declaracion"] * entrada.meses, valores["ec.multa-declaracion-tope"])
      : Math.min(valores["ec.multa-sin-impuesto"] * entrada.meses, valores["ec.multa-sin-impuesto-tope"]);
    const multa = redondear(porcentaje(conImpuesto ? entrada.impuesto : entrada.ingresos, tasa));
    return {
      tasa,
      multa,
      conRecargo: redondear(multa + porcentaje(multa, valores["ec.multa-recargo-cobro"])),
      observaciones: [
        "La multa se paga junto con la declaración, sin esperar a que el SRI la cobre.",
        "Si hay impuesto a pagar, también corren intereses de mora desde el vencimiento. No están en este cálculo.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de multa", formato: "porcentaje" },
    { clave: "multa", etiqueta: "Multa si la pagas tú", formato: "moneda", destacada: true },
    { clave: "conRecargo", etiqueta: "Multa si la cobra el SRI", formato: "moneda" },
  ],
});
