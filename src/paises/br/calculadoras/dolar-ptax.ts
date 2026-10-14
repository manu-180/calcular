import { definirCalculadora } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.dolar-ptax",
  mercado: "br",
  concepto: "tipo-de-cambio",
  slug: "dolar-ptax",
  estado: "publicado",
  requiere: {
    "br.dolar-ptax": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "O que você quer converter",
      opciones: [
        { valor: "dolares-para-reais", etiqueta: "Dólares para reais" },
        { valor: "reais-para-dolares", etiqueta: "Reais para dólares" },
      ],
      porDefecto: "dolares-para-reais",
    },
    { id: "quantia", tipo: "numero", etiqueta: "Quantia", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const ptax = valores["br.dolar-ptax"].valor;
    return {
      ptax,
      data: valores["br.dolar-ptax"].fecha,
      reais: entrada.sentido === "dolares-para-reais" ? redondear(entrada.quantia * ptax) : null,
      dolares: entrada.sentido === "reais-para-dolares" ? redondear(entrada.quantia / ptax) : null,
      observaciones: ["A PTAX é a taxa oficial do Banco Central. Bancos, cartões e casas de câmbio cobram outra cotação, com spread e IOF."],
    };
  },
  resultado: [
    { clave: "ptax", etiqueta: "Dólar PTAX (venda)", formato: "numero", decimales: 4 },
    { clave: "data", etiqueta: "Cotação do dia", formato: "fecha" },
    { clave: "reais", etiqueta: "Valor em reais", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Valor em dólares", formato: "numero", decimales: 2, destacada: true },
  ],
});
