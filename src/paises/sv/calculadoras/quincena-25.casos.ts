import { definirCasos } from "@/motor/calculo";
import quincena25 from "./quincena-25";

export default definirCasos(quincena25, [
  {
    nombre: "Ejemplo del MTPS: gana $1,000 y recibe $500",
    origen: {
      tipo: "oficial",
      url: "https://www.mtps.gob.sv/2026/01/15/quincena-25-no-afectara-ningun-derecho-adquirido-por-los-trabajadores/",
      detalle: "«Si una persona gana mil dólares, le van a entregar $500, sin ningún tipo de retención.» Art. 2 de la ley: 50 % del salario mensual.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 1000, anioCompleto: true, diasTrabajados: null },
    esperado: { completa: 500, quincena: 500 },
  },
  {
    nombre: "Salario de $1,500 justos: todavía le corresponde",
    origen: { tipo: "recalculado", detalle: "Art. 2: salario igual o inferior a 1.500. 50 % = 750." },
    fecha: "2026-10-07",
    entrada: { salario: 1500, anioCompleto: true, diasTrabajados: null },
    esperado: { quincena: 750 },
  },
  {
    nombre: "Salario de $1,500.01: ya no le corresponde",
    origen: { tipo: "recalculado", detalle: "Pasa el límite del art. 2." },
    fecha: "2026-10-07",
    entrada: { salario: 1500.01, anioCompleto: true, diasTrabajados: null },
    esperado: { completa: 0, quincena: 0 },
  },
  {
    nombre: "Menos de un año: 200 días",
    origen: { tipo: "recalculado", detalle: "Art. 3, proporcional como el aguinaldo. 600 × 50 % = 300; 300 × 200 / 365 = 164,38." },
    fecha: "2026-10-07",
    entrada: { salario: 600, anioCompleto: false, diasTrabajados: 200 },
    esperado: { completa: 300, quincena: 164.38 },
  },
  {
    nombre: "Menos de un año sin días",
    origen: { tipo: "recalculado", detalle: "Sin los días no se puede calcular el proporcional: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { salario: 600, anioCompleto: false, diasTrabajados: null },
    esperaError: true,
  },
]);
