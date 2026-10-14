import { definirCasos } from "@/motor/calculo";
import abonoSalarial from "./abono-salarial";

const MTE = "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/abono-salarial";

export default definirCasos(abonoSalarial, [
  {
    nombre: "Doze meses no ano-base",
    origen: { tipo: "oficial", url: MTE, detalle: "Tabela do calendário 2026: 12 meses = R$ 1.621,00." },
    fecha: "2026-10-14",
    entrada: { media: 2000, meses: 12, cadastro: true },
    esperado: { direito: "Sim", valor: 1621 },
  },
  {
    nombre: "Cinco meses no ano-base",
    origen: { tipo: "oficial", url: MTE, detalle: "Tabela do calendário 2026: 5 meses = R$ 675,00." },
    fecha: "2026-10-14",
    entrada: { media: 1500, meses: 5, cadastro: true },
    esperado: { valor: 675 },
  },
  {
    nombre: "Média acima do limite",
    origen: { tipo: "oficial", url: MTE, detalle: "Limite do calendário 2026: R$ 2.766,00 de média no ano-base 2024." },
    fecha: "2026-10-14",
    entrada: { media: 2800, meses: 12, cadastro: true },
    esperado: { direito: "Não", valor: 0 },
  },
]);
