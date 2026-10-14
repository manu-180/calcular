import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.periculosidade",
  mercado: "br",
  concepto: "propio",
  slug: "adicional-de-periculosidade",
  estado: "publicado",
  requiere: {
    "br.periculosidade": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Salário-base (sem gratificações e prêmios)", min: 0, porDefecto: 3000 }],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const adicional = redondear(porcentaje(entrada.salario, valores["br.periculosidade"]));
    return {
      adicional,
      total: redondear(entrada.salario + adicional),
      observaciones: ["O adicional de periculosidade entra no 13º, nas férias, no FGTS e no INSS."],
    };
  },
  resultado: [
    { clave: "adicional", etiqueta: "Adicional de periculosidade", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Salário com o adicional", formato: "moneda" },
  ],
});
