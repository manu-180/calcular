import { definirCasos } from "@/motor/calculo";
import reciboVerde from "./recibo-verde";

const CIRS101 = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs101.aspx";

export default definirCasos(reciboVerde, [
  {
    nombre: "Profissão do artigo 151.º, com IVA, no continente",
    origen: { tipo: "recalculado", url: CIRS101, detalle: "IVA 1000 × 23 % = 230; retenção 1000 × 23 % = 230. Recebe 1000 + 230 − 230 = 1000." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, atividade: "artigo-151", isentoIva: false, regiao: "continente", clienteRetem: true, dispensa: false },
    esperado: { total: 1230, iva: 230, retencao: 230, recebe: 1000 },
  },
  {
    nombre: "Outro serviço, isento de IVA",
    origen: { tipo: "recalculado", url: CIRS101, detalle: "Retenção 11,5 %: 800 × 11,5 % = 92. Recebe 708." },
    fecha: "2026-10-14",
    entrada: { valor: 800, atividade: "outros", isentoIva: true, regiao: "continente", clienteRetem: true, dispensa: false },
    esperado: { iva: 0, retencao: 92, recebe: 708 },
  },
  {
    nombre: "Cliente particular nos Açores",
    origen: { tipo: "recalculado", url: CIRS101, detalle: "Sem retenção (cliente sem contabilidade organizada). IVA 16 %: 500 × 16 % = 80." },
    fecha: "2026-10-14",
    entrada: { valor: 500, atividade: "artigo-151", isentoIva: false, regiao: "acores", clienteRetem: false, dispensa: false },
    esperado: { iva: 80, retencao: 0, recebe: 580 },
  },
  {
    nombre: "Com dispensa de retenção",
    origen: { tipo: "recalculado", detalle: "Dispensa do artigo 101.º-B: sem retenção." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, atividade: "artigo-151", isentoIva: true, regiao: "continente", clienteRetem: true, dispensa: true },
    esperado: { retencao: 0, recebe: 1000 },
  },
]);
