import { definirCalculadora } from "@/motor/calculo";
import { limpo } from "../lib/folha";

type Pedido = "primeiro" | "segundo" | "terceiro";

// Quantidade de parcelas pelos meses trabalhados nos 36 meses antes da dispensa (página do
// seguro-desemprego formal do MTE). O mínimo para ter direito muda conforme o número do pedido.
function parcelas(pedido: Pedido, meses: number): number {
  const minimo = pedido === "primeiro" ? 12 : pedido === "segundo" ? 9 : 6;
  if (meses < minimo) return 0;
  if (meses >= 24) return 5;
  if (meses >= 12) return 4;
  return 3;
}

export default definirCalculadora({
  id: "br.seguro-desemprego",
  mercado: "br",
  concepto: "propio",
  slug: "seguro-desemprego",
  estado: "publicado",
  requiere: {
    "br.sd-limite-faixa-1": "numero",
    "br.sd-limite-faixa-2": "numero",
    "br.sd-fator-faixa-1": "numero",
    "br.sd-fator-faixa-2": "numero",
    "br.sd-base-faixa-2": "numero",
    "br.sd-teto": "numero",
    "br.salario-minimo": "numero",
  },
  campos: [
    { id: "salario1", tipo: "moneda", etiqueta: "Último salário antes da dispensa", min: 0, porDefecto: 3000 },
    { id: "salario2", tipo: "moneda", etiqueta: "Penúltimo salário", min: 0, requerido: false },
    { id: "salario3", tipo: "moneda", etiqueta: "Antepenúltimo salário", min: 0, requerido: false },
    {
      id: "pedido",
      tipo: "opcion",
      etiqueta: "Qual pedido de seguro-desemprego é este",
      opciones: [
        { valor: "primeiro", etiqueta: "Primeiro" },
        { valor: "segundo", etiqueta: "Segundo" },
        { valor: "terceiro", etiqueta: "Terceiro ou mais" },
      ],
      porDefecto: "primeiro",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabalhados com carteira nos últimos 36 meses", min: 0, max: 36, porDefecto: 24 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const salarios = [entrada.salario1, entrada.salario2, entrada.salario3].filter((s): s is number => s !== null && s > 0);
    const media = salarios.length ? redondear(salarios.reduce((a, b) => a + b, 0) / salarios.length) : 0;
    const limite1 = valores["br.sd-limite-faixa-1"];
    let parcela: number;
    if (media <= limite1) parcela = media * valores["br.sd-fator-faixa-1"];
    else if (media <= valores["br.sd-limite-faixa-2"]) parcela = valores["br.sd-base-faixa-2"] + (media - limite1) * valores["br.sd-fator-faixa-2"];
    else parcela = valores["br.sd-teto"];
    parcela = redondear(limpo(Math.min(valores["br.sd-teto"], Math.max(valores["br.salario-minimo"], parcela))));
    const quantidade = parcelas(entrada.pedido, entrada.meses);
    const observaciones: string[] = [];
    if (quantidade === 0) {
      observaciones.push(
        entrada.pedido === "primeiro"
          ? "No primeiro pedido é preciso ter recebido pelo menos 12 salários nos 18 meses antes da dispensa."
          : entrada.pedido === "segundo"
            ? "No segundo pedido é preciso ter recebido pelo menos 9 salários nos 12 meses antes da dispensa."
            : "A partir do terceiro pedido é preciso ter recebido salário nos 6 meses antes da dispensa.",
      );
    }
    observaciones.push("O seguro-desemprego é para quem foi demitido sem justa causa e não tem outra renda. Quem sai por acordo não tem direito.");
    return {
      media,
      parcela,
      quantidade,
      total: redondear(parcela * quantidade),
      observaciones,
    };
  },
  resultado: [
    { clave: "media", etiqueta: "Média salarial considerada", formato: "moneda" },
    { clave: "parcela", etiqueta: "Valor de cada parcela", formato: "moneda", destacada: true },
    { clave: "quantidade", etiqueta: "Número de parcelas", formato: "numero", decimales: 0 },
    { clave: "total", etiqueta: "Total a receber", formato: "moneda" },
  ],
});
