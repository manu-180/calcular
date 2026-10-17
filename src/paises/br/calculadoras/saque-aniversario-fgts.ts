import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.saque-aniversario-fgts",
  mercado: "br",
  concepto: "propio",
  slug: "saque-aniversario-fgts",
  estado: "publicado",
  requiere: {
    "br.saque-aniversario": "escala",
  },
  campos: [{ id: "saldo", tipo: "moneda", etiqueta: "Saldo total do FGTS (todas as contas)", min: 0, porDefecto: 3000 }],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const tabela = valores["br.saque-aniversario"];
    let faixa = tabela[0];
    for (const f of tabela) if (entrada.saldo >= f.desde) faixa = f;
    const parteAliquota = redondear(porcentaje(entrada.saldo, faixa.tasa));
    const adicional = entrada.saldo > 0 ? (faixa.cuotaFija ?? 0) : 0;
    const saque = redondear(Math.min(entrada.saldo, parteAliquota + adicional));
    return {
      aliquota: faixa.tasa,
      parteAliquota,
      adicional,
      saque,
      restante: redondear(entrada.saldo - saque),
      observaciones: [
        "Quem escolhe o saque-aniversário, se for demitido, saca a multa rescisória, mas não o resto do saldo.",
        "A volta para o saque-rescisão só vale no primeiro dia do 25º mês depois do pedido.",
      ],
    };
  },
  resultado: [
    { clave: "aliquota", etiqueta: "Alíquota da faixa", formato: "porcentaje" },
    { clave: "parteAliquota", etiqueta: "Valor pela alíquota", formato: "moneda" },
    { clave: "adicional", etiqueta: "Parcela adicional", formato: "moneda", ocultarSiCero: true },
    { clave: "saque", etiqueta: "Saque-aniversário", formato: "moneda", destacada: true },
    { clave: "restante", etiqueta: "Fica na conta", formato: "moneda" },
  ],
});
