import { definirCasos } from "@/motor/calculo";
import trabajadorasDeCasaParticular from "./trabajadoras-de-casa-particular";

export default definirCasos(trabajadorasDeCasaParticular, [
  {
    nombre: "Departamento de Guatemala",
    origen: {
      tipo: "recalculado",
      detalle: "Acuerdo 1235 art. 71: sobre el mínimo no agrícola 4002.28: empleador 2.529 % = 101.22; trabajadora 1.2645 % = 50.61; trimestre (151.83) × 3 = 455.49.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3500, region: "ce1" },
    esperado: { base: 4002.28, cuotaEmpleador: 101.22, cuotaTrabajadora: 50.61, trimestre: 455.49, aguinaldo: 3500, bono14: 3500 },
  },
  {
    nombre: "Resto del país",
    origen: { tipo: "recalculado", detalle: "Mínimo no agrícola 3816.90: 96.53 y 48.26." },
    fecha: "2026-10-12",
    entrada: { salario: 3000, region: "ce2" },
    esperado: { base: 3816.9, cuotaEmpleador: 96.53, cuotaTrabajadora: 48.26 },
  },
]);
