import { definirCasos } from "@/motor/calculo";
import irtGrupoC from "./irt-grupo-c";

const OGE = "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf";

export default definirCasos(irtGrupoC, [
  {
    nombre: "Pequeno comerciante com 6 milhões",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 21.º, n.º 1: facturação até 10 000 000, taxa 6,5 % sobre as vendas. 6 000 000 × 6,5 % = 390 000." },
    fecha: "2026-10-24",
    entrada: { facturacao: 6000000, vendas: 6000000, agricola: false },
    esperado: { imposto: 390000, taxa: 6.5 },
  },
  {
    nombre: "Exactamente no limite",
    origen: { tipo: "recalculado", url: OGE, detalle: "Igual a 10 000 000 ainda está no regime: 10 000 000 × 6,5 % = 650 000." },
    fecha: "2026-10-24",
    entrada: { facturacao: 10000000, vendas: 10000000, agricola: false },
    esperado: { imposto: 650000 },
  },
  {
    nombre: "Agricultor acima do limite",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 21.º, n.º 4: taxa de 10 %. 15 000 000 × 10 % = 1 500 000." },
    fecha: "2026-10-24",
    entrada: { facturacao: 15000000, vendas: 15000000, agricola: true },
    esperado: { imposto: 1500000, taxa: 10 },
  },
  {
    nombre: "Comércio acima do limite",
    origen: { tipo: "recalculado", url: OGE, detalle: "Fora do n.º 1 e não agrícola: não há taxa sobre as vendas." },
    fecha: "2026-10-24",
    entrada: { facturacao: 15000000, vendas: 15000000, agricola: false },
    esperaError: true,
  },
]);
