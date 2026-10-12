import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.deposito-a-plazo",
  mercado: "cl",
  concepto: "plazo-fijo",
  slug: "deposito-a-plazo",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Monto a invertir", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa que te ofrece el banco", min: 0, max: 100 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "La tasa es",
      opciones: [
        { valor: "30-dias", etiqueta: "Mensual (base 30 días)" },
        { valor: "anual", etiqueta: "Anual (base 360 días)" },
      ],
      porDefecto: "30-dias",
    },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 30 },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.tasa > 100) throw new ErrorEntrada("Revisa la tasa: no puede pasar de 100 %.", "tasa");
    // Los bancos en Chile informan la tasa del depósito en base 30 días (mensual) o anual en base 360,
    // con interés simple para el plazo pactado.
    const tasa30 = entrada.base === "30-dias" ? entrada.tasa : entrada.tasa / 12;
    const tasaPeriodo = (tasa30 * entrada.dias) / 30;
    const interes = redondear(porcentaje(entrada.capital, tasaPeriodo));
    return {
      interes,
      total: entrada.capital + interes,
      tasaPeriodo,
      tasaAnual: tasa30 * 12,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Recibes al vencimiento", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Intereses ganados", formato: "moneda" },
    { clave: "tasaPeriodo", etiqueta: "Tasa del período", formato: "porcentaje", decimales: 3 },
    { clave: "tasaAnual", etiqueta: "Tasa anual equivalente (simple, base 360)", formato: "porcentaje", decimales: 2 },
  ],
});
