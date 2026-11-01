import { definirCasos } from "@/motor/calculo";
import horasExtraordinarias from "./horas-extraordinarias";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(horasExtraordinarias, [
  {
    nombre: "10 horas no mês",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 237.º, n.º 7: hora = 350 000 × 12 / (52 × 44) = 1 835,66. Artigo 188.º, n.º 1: 10 × 1 835,6643 × 1,5 = 27 534,97." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, horasSemanais: 44, horas: 10, minutos: 0 },
    esperado: { hora: 1835.66, pagas: 10, total: 27534.97 },
  },
  {
    nombre: "Acima das 30 horas, com fracção de 20 minutos",
    origen: {
      tipo: "recalculado",
      url: LGT,
      detalle: "Artigo 188.º, n.º 4: 20 minutos contam meia hora, 35,5 horas. 30 × 1 835,6643 × 1,5 = 82 604,90 e 5,5 × 1 835,6643 × 1,75 = 17 668,27. Total 100 273,16.",
    },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, horasSemanais: 44, horas: 35, minutos: 20 },
    esperado: { pagas: 35.5, valor1: 82604.9, valor2: 17668.27, total: 100273.16 },
  },
  {
    nombre: "Menos de 15 minutos não contam",
    origen: { tipo: "recalculado", url: LGT, detalle: "Hora = 200 000 × 12 / (52 × 40) = 1 153,85. 8 horas e 10 minutos pagam 8 horas: 8 × 1 153,8462 × 1,5 = 13 846,15." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 200000, horasSemanais: 40, horas: 8, minutos: 10 },
    esperado: { pagas: 8, total: 13846.15 },
  },
  {
    nombre: "45 minutos contam uma hora",
    origen: { tipo: "recalculado", url: LGT, detalle: "10 horas e 50 minutos pagam 11 horas." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 200000, horasSemanais: 40, horas: 10, minutos: 50 },
    esperado: { pagas: 11 },
  },
]);
