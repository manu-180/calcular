import { definirCasos } from "@/motor/calculo";
import honorarios from "./retencion-honorarios";

export default definirCasos(honorarios, [
  {
    nombre: "Persona natural con 10 millones al mes",
    origen: {
      tipo: "recalculado",
      detalle:
        "ET art. 383 par. 2. Aportes sobre el 40 % (4.000.000): 12,5 % + 16 % = 1.140.000. Neto 8.860.000; exenta 25 % = 2.215.000. Base 6.645.000. Retención (6.645.000 − 95 × 52.374) × 19 % = 317.199.",
    },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000000, quien: "natural", superaUmbral: false, dependiente: false },
    esperado: { aportes: 1140000, base: 6645000, retencion: 317199, neto: 9682801 },
  },
  {
    nombre: "Honorarios bajos: no hay retención",
    origen: { tipo: "recalculado", detalle: "3.000.000: aportes sobre el mínimo 1.750.905 × 28,5 % = 499.008. Base 1.875.744, menos de 95 UVT: retención 0." },
    fecha: "2026-10-15",
    entrada: { honorarios: 3000000, quien: "natural", superaUmbral: false, dependiente: false },
    esperado: { aportes: 499008, retencion: 0 },
  },
  {
    nombre: "Persona natural con trabajadores, sin pasar el umbral",
    origen: { tipo: "oficial", url: "https://normograma.dian.gov.co/dian/compilacion/docs/decreto_1625_2016.htm", detalle: "Decreto 1625 de 2016, art. 1.2.4.3.1: 10 % de 10.000.000 = 1.000.000." },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000000, quien: "natural-empleador", superaUmbral: false, dependiente: false },
    esperado: { tarifa: 10, retencion: 1000000 },
  },
  {
    nombre: "Persona natural con trabajadores que pasa 3.300 UVT",
    origen: { tipo: "oficial", url: "https://normograma.dian.gov.co/dian/compilacion/docs/decreto_1625_2016.htm", detalle: "Art. 1.2.4.3.1, literal b: 11 % de 10.000.000 = 1.100.000." },
    fecha: "2026-10-15",
    entrada: { honorarios: 10000000, quien: "natural-empleador", superaUmbral: true, dependiente: false },
    esperado: { tarifa: 11, retencion: 1100000 },
  },
  {
    nombre: "Persona jurídica",
    origen: { tipo: "oficial", url: "https://normograma.dian.gov.co/dian/compilacion/docs/decreto_1625_2016.htm", detalle: "Art. 1.2.4.3.1, inciso 1: 11 % de 4.000.000 = 440.000." },
    fecha: "2026-10-15",
    entrada: { honorarios: 4000000, quien: "juridica", superaUmbral: false, dependiente: false },
    esperado: { tarifa: 11, retencion: 440000, neto: 3560000 },
  },
]);
