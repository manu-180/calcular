import { definirCasos } from "@/motor/calculo";
import contribuicoesInps from "./contribuicoes-inps";

const PORTARIA = "https://boe.incv.cv/Bulletins/Download/5858";

export default definirCasos(contribuicoesInps, [
  {
    nombre: "100 000$00 de remuneração",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "8,5 % = 8 500 do trabalhador. 16 % = 16 000 da entidade empregadora. Total 24 500, ou 24,5 %." },
    fecha: "2026-10-29",
    entrada: { remuneracao: 100000 },
    esperado: { trabalhador: 8500, empregador: 16000, total: 24500, taxaGlobal: 24.5 },
  },
  {
    nombre: "Salário mínimo de 17 000$00",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "17 000 × 8,5 % = 1 445. 17 000 × 16 % = 2 720. Total 4 165." },
    fecha: "2026-10-29",
    entrada: { remuneracao: 17000 },
    esperado: { trabalhador: 1445, empregador: 2720, total: 4165 },
  },
  {
    nombre: "Remuneração com cêntimos",
    origen: { tipo: "recalculado", url: PORTARIA, detalle: "45 250 × 8,5 % = 3 846,25. 45 250 × 16 % = 7 240. Total 11 086,25." },
    fecha: "2026-10-29",
    entrada: { remuneracao: 45250 },
    esperado: { trabalhador: 3846.25, empregador: 7240, total: 11086.25 },
  },
]);
