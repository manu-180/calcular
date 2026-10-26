import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.calcular-iva",
  mercado: "ao",
  concepto: "iva",
  slug: "calcular-iva",
  estado: "publicado",
  requiere: {
    "ao.iva-geral": "numero",
  },
  campos: [
    {
      id: "operacao",
      tipo: "opcion",
      etiqueta: "O que quer fazer",
      opciones: [
        { valor: "somar", etiqueta: "Somar o IVA a um preço sem imposto" },
        { valor: "retirar", etiqueta: "Retirar o IVA de um preço com imposto" },
      ],
      porDefecto: "somar",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Valor", min: 0, porDefecto: 100000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxa = valores["ao.iva-geral"];
    if (entrada.operacao === "somar") {
      const iva = redondear(porcentaje(entrada.valor, taxa));
      return { semIva: entrada.valor, iva, comIva: redondear(entrada.valor + iva), taxa };
    }
    const semIva = redondear(entrada.valor / (1 + taxa / 100));
    return { semIva, iva: redondear(entrada.valor - semIva), comIva: entrada.valor, taxa };
  },
  resultado: [
    { clave: "comIva", etiqueta: "Preço com IVA", formato: "moneda", destacada: true },
    { clave: "semIva", etiqueta: "Preço sem IVA", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa aplicada", formato: "porcentaje" },
  ],
});
