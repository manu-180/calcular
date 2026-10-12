import { definirCasos } from "@/motor/calculo";
import descuentos from "./descuentos-isss-afp";

export default definirCasos(descuentos, [
  {
    nombre: "Salario de $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/942D37A6-2092-4347-A68C-2542389B481D.pdf",
      detalle: "Art. 29 LSS y art. 16 LISP. AFP 7,25 % = 43,50; ISSS 3 % = 18. Patrono: AFP 8,75 % = 52,50; ISSS 7,5 % = 45.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600 },
    esperado: { afpTrabajador: 43.5, isssTrabajador: 18, totalTrabajador: 61.5, afpPatrono: 52.5, isssPatrono: 45, totalPatrono: 97.5 },
  },
  {
    nombre: "Salario de $1,000 justos: techo del ISSS",
    origen: { tipo: "recalculado", detalle: "ISSS 3 % de 1.000 = 30 y 7,5 % = 75. AFP 72,50 y 87,50." },
    fecha: "2026-10-12",
    entrada: { salario: 1000 },
    esperado: { isssTrabajador: 30, isssPatrono: 75, afpTrabajador: 72.5, afpPatrono: 87.5 },
  },
  {
    nombre: "Salario de $2,500: el ISSS no sube",
    origen: { tipo: "recalculado", detalle: "ISSS sobre 1.000: 30 y 75. AFP sobre 2.500: 181,25 y 218,75." },
    fecha: "2026-10-12",
    entrada: { salario: 2500 },
    esperado: { isssTrabajador: 30, isssPatrono: 75, afpTrabajador: 181.25, afpPatrono: 218.75, totalTrabajador: 211.25 },
  },
]);
