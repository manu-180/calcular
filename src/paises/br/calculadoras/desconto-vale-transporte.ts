import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.vale-transporte",
  mercado: "br",
  concepto: "propio",
  slug: "desconto-vale-transporte",
  estado: "publicado",
  requiere: {
    "br.vale-transporte-desconto": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário básico mensal", min: 0, porDefecto: 2000, ayuda: "Sem horas extras e adicionais." },
    { id: "custoDia", tipo: "moneda", etiqueta: "Gasto com transporte por dia (ida e volta)", min: 0, porDefecto: 10 },
    { id: "dias", tipo: "entero", etiqueta: "Dias de trabalho no mês", min: 0, max: 31, porDefecto: 22 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const custo = redondear(entrada.custoDia * entrada.dias);
    const limite = redondear(porcentaje(entrada.salario, valores["br.vale-transporte-desconto"]));
    const desconto = Math.min(custo, limite);
    const observaciones: string[] = [];
    if (custo <= limite) observaciones.push("O custo do transporte é menor que o limite de desconto, então pode não valer a pena pedir o vale.");
    return {
      custo,
      limite,
      desconto,
      empresa: redondear(custo - desconto),
      observaciones,
    };
  },
  resultado: [
    { clave: "custo", etiqueta: "Custo do transporte no mês", formato: "moneda" },
    { clave: "limite", etiqueta: "Limite de desconto no salário", formato: "moneda" },
    { clave: "desconto", etiqueta: "Desconto no seu salário", formato: "moneda", destacada: true },
    { clave: "empresa", etiqueta: "Parte paga pela empresa", formato: "moneda" },
  ],
});
