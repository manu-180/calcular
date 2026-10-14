import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.insalubridade",
  mercado: "br",
  concepto: "propio",
  slug: "adicional-de-insalubridade",
  estado: "publicado",
  requiere: {
    "br.insalubridade": "mapa",
    "br.salario-minimo": "numero",
  },
  campos: [
    { id: "grau", tipo: "opcion-dato", dato: "br.insalubridade", etiqueta: "Grau de insalubridade (laudo técnico)", porDefecto: "medio" },
    { id: "salario", tipo: "moneda", etiqueta: "Seu salário (opcional)", min: 0, requerido: false, ayuda: "Para somar o adicional ao salário." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const percentual = enMapa(valores["br.insalubridade"], entrada.grau);
    const adicional = redondear(porcentaje(valores["br.salario-minimo"], percentual));
    return {
      percentual,
      adicional,
      total: entrada.salario === null ? null : redondear(entrada.salario + adicional),
      observaciones: [
        "A CLT manda calcular sobre o salário mínimo. Convenção coletiva ou sentença podem usar outra base, como o salário-base.",
        "Insalubridade e periculosidade não se acumulam: quem tem direito às duas escolhe uma.",
      ],
    };
  },
  resultado: [
    { clave: "percentual", etiqueta: "Percentual do grau", formato: "porcentaje" },
    { clave: "adicional", etiqueta: "Adicional de insalubridade por mês", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Salário com o adicional", formato: "moneda" },
  ],
});
