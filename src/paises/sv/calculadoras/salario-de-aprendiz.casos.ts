import { definirCasos } from "@/motor/calculo";
import aprendiz from "./salario-de-aprendiz";

export default definirCasos(aprendiz, [
  {
    nombre: "Primer año en comercio y servicios",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 69: al menos 50 % del mínimo el primer año. 50 % de 408,80 = 204,40.",
    },
    fecha: "2026-10-12",
    entrada: { region: "comercio-servicios", anio: "primer-anio" },
    esperado: { minimo: 408.8, tasa: 50, mensual: 204.4, quincenal: 102.2 },
  },
  {
    nombre: "Segundo año en la maquila",
    origen: { tipo: "recalculado", detalle: "75 % de 402,32 = 301,74." },
    fecha: "2026-10-12",
    entrada: { region: "maquila", anio: "segundo-anio" },
    esperado: { tasa: 75, mensual: 301.74 },
  },
  {
    nombre: "Tercer año en el sector agropecuario",
    origen: { tipo: "recalculado", detalle: "Desde el tercer año, el mínimo completo: 272,53." },
    fecha: "2026-10-12",
    entrada: { region: "agropecuario", anio: "tercer-anio" },
    esperado: { mensual: 272.53 },
  },
]);
