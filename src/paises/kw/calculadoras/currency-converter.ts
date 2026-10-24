import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { codigo, OPCIONES_DIVISA, REQUIERE_FX, tasa } from "../lib/divisas";

export default definirCalculadora({
  id: "kw.currency-converter",
  mercado: "kw",
  concepto: "tipo-de-cambio",
  slug: "currency-converter",
  estado: "publicado",
  requiere: REQUIERE_FX,
  campos: [
    { id: "importe", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 100 },
    { id: "divisa", tipo: "opcion", etiqueta: "Other currency", opciones: OPCIONES_DIVISA, porDefecto: "usd" },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "from-kwd", etiqueta: "From Kuwaiti dinar to the other currency" },
        { valor: "to-kwd", etiqueta: "From the other currency to Kuwaiti dinar" },
      ],
      porDefecto: "from-kwd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    const t = tasa(v, entrada.divisa);
    const resultado = entrada.sentido === "from-kwd" ? entrada.importe / t.valor : entrada.importe * t.valor;
    return {
      resultado: redondear(resultado),
      moneda: entrada.sentido === "from-kwd" ? codigo(entrada.divisa) : "KWD",
      tasa: t.valor,
      inversa: 1 / t.valor,
      fecha: t.fecha,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 3, destacada: true },
    { clave: "moneda", etiqueta: "Currency", formato: "texto" },
    { clave: "tasa", etiqueta: "KWD for one unit (CBK rate)", formato: "numero", decimales: 6 },
    { clave: "inversa", etiqueta: "Units for one KWD", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "CBK rate date", formato: "fecha" },
  ],
});
