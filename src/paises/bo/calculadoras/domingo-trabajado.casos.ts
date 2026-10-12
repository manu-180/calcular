import { definirCasos } from "@/motor/calculo";
import domingoTrabajado from "./domingo-trabajado";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(domingoTrabajado, [
  {
    nombre: "Un domingo con el salario mínimo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. IV: pago triple. 3.300 / 30 = 110; triple 330; ya pagado 110 en el sueldo, se suman 220." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 3300, domingos: 1 },
    esperado: { diario: 110, pagoTotal: 330, adicional: 220 },
  },
  {
    nombre: "Dos domingos con Bs 5.000",
    origen: { tipo: "recalculado", detalle: "5.000 / 30 = 166,666...; triple por 2 domingos = 1.000; adicional 666,67." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 5000, domingos: 2 },
    esperado: { diario: 166.67, pagoTotal: 1000, adicional: 666.67 },
  },
]);
