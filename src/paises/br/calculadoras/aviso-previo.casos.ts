import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Cinco anos de casa",
    origen: { tipo: "recalculado", detalle: "Lei nº 12.506/2011: 30 dias + 3 × 5 anos = 45 dias. 3000 / 30 × 45 = 4500." },
    fecha: "2026-10-14",
    entrada: { admissao: "2021-03-01", aviso: "2026-10-14", salario: 3000, quemPede: "empresa" },
    esperado: { anos: 5, dias: 45, valor: 4500, termino: "2026-11-28" },
  },
  {
    nombre: "Menos de um ano",
    origen: { tipo: "recalculado", detalle: "Sem ano completo, o aviso é de 30 dias." },
    fecha: "2026-10-14",
    entrada: { admissao: "2026-01-10", aviso: "2026-10-14", salario: 2400, quemPede: "empresa" },
    esperado: { anos: 0, dias: 30, valor: 2400 },
  },
  {
    nombre: "Teto de 90 dias",
    origen: { tipo: "recalculado", detalle: "25 anos: 30 + 75 = 105, limitado a 90 dias." },
    fecha: "2026-10-14",
    entrada: { admissao: "2000-05-02", aviso: "2026-10-14", salario: 6000, quemPede: "empresa" },
    esperado: { dias: 90, valor: 18000 },
  },
  {
    nombre: "Pedido de demissão com dez anos",
    origen: { tipo: "recalculado", detalle: "Quem pede demissão cumpre 30 dias." },
    fecha: "2026-10-14",
    entrada: { admissao: "2016-01-04", aviso: "2026-10-14", salario: 3000, quemPede: "empregado" },
    esperado: { anos: 10, dias: 30, valor: 3000 },
  },
]);
