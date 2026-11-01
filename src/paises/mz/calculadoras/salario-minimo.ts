import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.salario-minimo",
  mercado: "mz",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "borrador",
  requiere: {
    "mz.salario-minimo": "mapa",
  },
  campos: [
    { id: "sector", tipo: "opcion-dato", etiqueta: "Sector de actividade", dato: "mz.salario-minimo", porDefecto: "servicos" },
    { id: "salario", tipo: "moneda", etiqueta: "Salário que recebe ou vai oferecer", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = enMapa(valores["mz.salario-minimo"], entrada.sector);
    const diferenca = entrada.salario === null ? null : redondear(entrada.salario - minimo);
    return {
      minimo,
      diaria: redondear(minimo / 30),
      diferenca,
      observaciones: diferenca !== null && diferenca < 0 ? ["O salário indicado fica abaixo do mínimo do sector."] : [],
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salário mínimo mensal do sector", formato: "moneda", destacada: true },
    { clave: "diaria", etiqueta: "Equivalente por dia (÷ 30)", formato: "moneda" },
    { clave: "diferenca", etiqueta: "Diferença para o mínimo", formato: "moneda" },
  ],
});
