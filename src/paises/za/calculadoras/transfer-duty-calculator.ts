import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.transfer-duty-calculator",
  mercado: "za",
  concepto: "propio",
  slug: "transfer-duty-calculator",
  estado: "publicado",
  requiere: {
    "za.transfer-duty": "escala",
  },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "Purchase price of the property", min: 0, porDefecto: 2000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the purchase price.", "valor");
    const escala = v["za.transfer-duty"];
    const derecho = redondear(aplicarEscala(escala, entrada.valor));
    const exento = escala[0].hasta ?? 0;
    return {
      derecho,
      efectiva: (derecho / entrada.valor) * 100,
      total: redondear(entrada.valor + derecho),
      exento,
      observaciones: derecho === 0 ? ["Properties up to this value pay no transfer duty."] : [],
    };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Transfer duty", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Transfer duty as a share of the price", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Price plus transfer duty", formato: "moneda" },
    { clave: "exento", etiqueta: "No duty up to", formato: "moneda" },
  ],
});
