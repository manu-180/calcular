import { definirCasos } from "@/motor/calculo";
import declaracion from "./declaracion-de-renta";

export default definirCasos(declaracion, [
  {
    nombre: "Salarios de $12,000 con cotizaciones estimadas",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/E198E77D-2027-47AA-A8F6-1D70E2F46431.pdf",
      detalle: "AFP 7,25 % = 870; ISSS 3 % de 12.000 = 360. Imponible 10.770, tramo III del art. 37: (10.770 − 9.142,86) × 20 % + 720 = 1.045,43. Retenido 1.000: faltan 45,43.",
    },
    fecha: "2026-10-12",
    entrada: { salarios: 12000, cotizaciones: null, otrasDeducciones: 0, retenido: 1000 },
    esperado: { cotizaciones: 1230, deducciones: 0, imponible: 10770, impuesto: 1045.43, aPagar: 45.43, aDevolver: 0 },
  },
  {
    nombre: "Salarios de $8,400: deducción fija y saldo a favor",
    origen: { tipo: "recalculado", detalle: "Cotizaciones 609 + 252 = 861. Hasta 9.100: deducción fija 1.600. Imponible 5.939, exento. Retenido 120: saldo a favor 120." },
    fecha: "2026-10-12",
    entrada: { salarios: 8400, cotizaciones: null, otrasDeducciones: 500, retenido: 120 },
    esperado: { cotizaciones: 861, deducciones: 1600, imponible: 5939, impuesto: 0, aPagar: 0, aDevolver: 120 },
  },
  {
    nombre: "Salarios de $30,000 con cotizaciones de la constancia y gastos médicos",
    origen: { tipo: "recalculado", detalle: "30.000 − 2.535 − 800 = 26.665. Tramo IV: (26.665 − 22.857,14) × 30 % + 3.462,86 = 4.605,22. Retenido 4.500: faltan 105,22." },
    fecha: "2026-10-12",
    entrada: { salarios: 30000, cotizaciones: 2535, otrasDeducciones: 800, retenido: 4500 },
    esperado: { imponible: 26665, impuesto: 4605.22, aPagar: 105.22 },
  },
]);
