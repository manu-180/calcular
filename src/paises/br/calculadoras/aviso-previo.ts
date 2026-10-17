import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { anosCompletos } from "../lib/datas";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.aviso-previo",
  mercado: "br",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "br.aviso-previo-base": "numero",
    "br.aviso-previo-por-ano": "numero",
    "br.aviso-previo-maximo": "numero",
  },
  campos: [
    { id: "admissao", tipo: "fecha", etiqueta: "Data de admissão" },
    { id: "aviso", tipo: "fecha", etiqueta: "Data do aviso", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 3000 },
    {
      id: "quemPede",
      tipo: "opcion",
      etiqueta: "Quem encerra o contrato",
      opciones: [
        { valor: "empresa", etiqueta: "A empresa (demissão sem justa causa)" },
        { valor: "empregado", etiqueta: "Eu (pedido de demissão)" },
      ],
      porDefecto: "empresa",
    },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    if (entrada.aviso < entrada.admissao) throw new ErrorEntrada("A data do aviso tem que ser depois da admissão.", "aviso");
    const anos = anosCompletos(entrada.admissao, entrada.aviso);
    const base = valores["br.aviso-previo-base"];
    const proporcional = Math.min(valores["br.aviso-previo-maximo"], base + valores["br.aviso-previo-por-ano"] * anos);
    const dias = entrada.quemPede === "empresa" ? proporcional : base;
    const observaciones: string[] = [];
    if (entrada.quemPede === "empregado") {
      observaciones.push("Quando você pede demissão, o aviso não tem os dias a mais por ano de casa: eles são um direito de quem é demitido.");
      observaciones.push("Se você não cumprir o aviso, a empresa pode descontar esse valor da rescisão.");
    } else {
      observaciones.push("Se o aviso for indenizado, esses dias contam como tempo de serviço e aumentam o 13º e as férias proporcionais.");
      observaciones.push("No aviso trabalhado, você pode sair 2 horas mais cedo por dia ou faltar 7 dias corridos, sem desconto.");
    }
    return {
      anos,
      dias,
      valor: redondear((entrada.salario / 30) * dias),
      termino: sumarDias(entrada.aviso, dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "anos", etiqueta: "Anos completos de casa", formato: "anios" },
    { clave: "dias", etiqueta: "Dias de aviso prévio", formato: "dias", destacada: true },
    { clave: "valor", etiqueta: "Valor do aviso indenizado", formato: "moneda" },
    { clave: "termino", etiqueta: "Fim do contrato com o aviso", formato: "fecha" },
  ],
});
