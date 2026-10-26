import { definirCasos } from "@/motor/calculo";
import subsidioDeNatal from "./subsidio-de-natal";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(subsidioDeNatal, [
  {
    nombre: "Ano completo com o mínimo legal",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 238.º, n.º 1, alínea b: 350 000 × 50 % = 175 000. INSS 3 % = 5 250." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, meses: 12, percentagem: 50 },
    esperado: { subsidio: 175000, inss: 5250, depoisInss: 169750 },
  },
  {
    nombre: "Entrou em março: 9 meses",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 238.º, n.º 3: 160 000 × 50 % × 9 / 12 = 60 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 160000, meses: 9, percentagem: 50 },
    esperado: { subsidio: 60000, inss: 1800 },
  },
  {
    nombre: "Meses fora do intervalo",
    origen: { tipo: "recalculado", url: LGT, detalle: "Zero meses não dá direito: erro." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 160000, meses: 0, percentagem: 50 },
    esperaError: true,
  },
]);
