import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "C$20,000 en el régimen integral, empresa de menos de 50 trabajadores",
    origen: { tipo: "recalculado", detalle: "Decreto 06-2019, art. 11: 12.50 % IVM + 1.50 % riesgos + 1.50 % víctimas de guerra + 6.00 % enfermedad y maternidad = 21.50 %. 20,000 × 21.5 % = 4,300; INATEC 2 % = 400; aguinaldo 20,000 / 12 = 1,666.67. Total 26,366.67; anual × 12 = 316,400.04." },
    fecha: "2026-10-08",
    entrada: { salario: 20000, regimen: "integral", tamano: "menos-50" },
    esperado: { tasaPatronal: 21.5, inssPatronal: 4300, inatec: 400, aguinaldo: 1666.67, mensual: 26366.67, anual: 316400.04 },
  },
  {
    nombre: "C$12,000 en el régimen IVM, empresa de 50 trabajadores o más",
    origen: { tipo: "recalculado", detalle: "IVM con 50 o más: 13.50 % + 1.50 % + 1.50 % = 16.50 %. 12,000 × 16.5 % = 1,980; INATEC 240; aguinaldo 1,000. Total 15,220; anual 182,640." },
    fecha: "2026-10-08",
    entrada: { salario: 12000, regimen: "ivm", tamano: "50-o-mas" },
    esperado: { tasaPatronal: 16.5, inssPatronal: 1980, inatec: 240, aguinaldo: 1000, mensual: 15220, anual: 182640 },
  },
  {
    nombre: "Salario cero no genera cargas",
    origen: { tipo: "recalculado", detalle: "Borde: todas las cargas son proporcionales al salario." },
    fecha: "2026-10-08",
    entrada: { salario: 0, regimen: "integral", tamano: "50-o-mas" },
    esperado: { inssPatronal: 0, inatec: 0, aguinaldo: 0, mensual: 0 },
  },
]);
