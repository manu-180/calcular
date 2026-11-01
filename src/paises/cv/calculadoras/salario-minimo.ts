import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "cv.salario-minimo",
  mercado: "cv",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "cv.salario-minimo": "numero",
    "cv.inps-trabalhador": "numero",
    "cv.inps-empregador": "numero",
    "cv.horas-semanais": "numero",
    "cv.semanas-ano": "numero",
    "cv.irps-limite-retencao": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Salário mensal a comparar", min: 0, porDefecto: 20000 }],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["cv.salario-minimo"];
    const inps = redondear(porcentaje(minimo, valores["cv.inps-trabalhador"]));
    const observaciones: string[] = [
      "A retribuição mínima vale para quem cumpre o período normal de trabalho. Há reduções para algumas situações do trabalhador, previstas no artigo 6.º do Decreto-Lei n.º 6/2014.",
    ];
    if (entrada.salario > 0 && entrada.salario < minimo) {
      observaciones.push("O salário indicado está abaixo do mínimo para um trabalhador a tempo inteiro.");
    }
    if (minimo > valores["cv.irps-limite-retencao"]) {
      observaciones.push("O mínimo passou o limite de retenção do IRPS, que não está descontado no líquido indicado.");
    }
    return {
      minimo,
      diferenca: redondear(entrada.salario - minimo),
      percentagem: minimo > 0 ? (entrada.salario / minimo) * 100 : 0,
      hora: redondear(salarioHora(minimo, valores["cv.horas-semanais"], valores["cv.semanas-ano"])),
      liquido: redondear(minimo - inps),
      custo: redondear(minimo + porcentaje(minimo, valores["cv.inps-empregador"])),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Retribuição mínima mensal garantida", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Diferença do salário indicado para o mínimo", formato: "moneda" },
    { clave: "percentagem", etiqueta: "Salário indicado em percentagem do mínimo", formato: "porcentaje", decimales: 1 },
    { clave: "hora", etiqueta: "Valor da hora no mínimo, com o período normal máximo", formato: "moneda" },
    { clave: "liquido", etiqueta: "Líquido do mínimo, depois do INPS", formato: "moneda" },
    { clave: "custo", etiqueta: "Custo do mínimo para a empresa", formato: "moneda" },
  ],
});
