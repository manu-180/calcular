import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.impuesto-al-salario",
  mercado: "cr",
  concepto: "impuesto-renta",
  slug: "impuesto-al-salario",
  estado: "publicado",
  requiere: {
    "cr.impuesto-salario": "escala",
    "cr.credito-hijo": "numero",
    "cr.credito-conyuge": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto del mes", ayuda: "Con horas extra y comisiones, sin el aguinaldo.", min: 0 },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos que declara para el crédito fiscal", min: 0, max: 20, porDefecto: 0 },
    { id: "conyuge", tipo: "si-no", etiqueta: "Declara el crédito por cónyuge", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const bruto = redondear(aplicarEscalaMarginal(valores["cr.impuesto-salario"], entrada.salario));
    const creditos = redondear(entrada.hijos * valores["cr.credito-hijo"] + (entrada.conyuge ? valores["cr.credito-conyuge"] : 0));
    const impuesto = Math.max(0, redondear(bruto - creditos));
    return {
      bruto,
      creditos: Math.min(creditos, bruto),
      impuesto,
      tasaEfectiva: entrada.salario > 0 ? redondear((impuesto / entrada.salario) * 100) : 0,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Impuesto según los tramos", formato: "moneda" },
    { clave: "creditos", etiqueta: "Créditos fiscales por hijos y cónyuge", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Impuesto al salario del mes", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje real sobre su salario", formato: "porcentaje" },
  ],
});
