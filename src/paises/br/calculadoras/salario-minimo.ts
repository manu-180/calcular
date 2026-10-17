import { definirCalculadora } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.salario-minimo",
  mercado: "br",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "br.salario-minimo": "numero",
    "br.salario-minimo-diario": "numero",
    "br.salario-minimo-hora": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Seu salário (opcional)", min: 0, requerido: false, ayuda: "Para ver a quantos salários mínimos ele equivale." },
    { id: "quantidade", tipo: "numero", etiqueta: "Quantos salários mínimos quer converter", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const mensal = valores["br.salario-minimo"];
    const observaciones: string[] = ["Alguns estados têm piso regional maior que o nacional para certas categorias."];
    if (entrada.salario !== null && entrada.salario < mensal) observaciones.push("Para uma jornada completa, nenhum salário pode ficar abaixo do mínimo nacional.");
    return {
      mensal,
      diario: valores["br.salario-minimo-diario"],
      hora: valores["br.salario-minimo-hora"],
      anual: redondear(mensal * 13),
      convertido: redondear(mensal * entrada.quantidade),
      emMinimos: entrada.salario === null ? null : entrada.salario / mensal,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Salário mínimo mensal", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Valor por dia", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor por hora", formato: "moneda" },
    { clave: "anual", etiqueta: "No ano, com o 13º", formato: "moneda" },
    { clave: "convertido", etiqueta: "Valor dos salários mínimos informados", formato: "moneda" },
    { clave: "emMinimos", etiqueta: "Seu salário em salários mínimos", formato: "numero", decimales: 2 },
  ],
});
