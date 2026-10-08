import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Comercio y servicios desde el 1 de junio de 2025",
    origen: {
      tipo: "oficial",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/05/10A4DA.PDF",
      detalle: "Decreto Ejecutivo 11 de 2025, art. 2: mensual $408.80, diario $13.440, hora ordinaria $1.680.",
    },
    fecha: "2026-10-07",
    entrada: { region: "comercio-servicios" },
    esperado: { mensual: 408.8, quincenal: 204.4, diario: 13.44, hora: 1.68 },
  },
  {
    nombre: "Maquila textil y confección",
    origen: {
      tipo: "oficial",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/05/10A4DA.PDF",
      detalle: "Art. 2: maquila textil y confección $402.32 al mes, $13.227 por día y $1.653 por hora. Rige desde el 1/6/2025 (art. 15).",
    },
    fecha: "2026-10-07",
    entrada: { region: "maquila" },
    esperado: { mensual: 402.32, quincenal: 201.16, diario: 13.227, hora: 1.653 },
    tolerancia: 0.0005,
  },
  {
    nombre: "Recolección de caña de azúcar",
    origen: {
      tipo: "oficial",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/05/10A4DA.PDF",
      detalle: "Art. 2: $305.23 al mes, $10.035 por día y $1.254 por hora.",
    },
    fecha: "2026-10-07",
    entrada: { region: "cana-azucar" },
    esperado: { mensual: 305.23, diario: 10.035, hora: 1.254 },
    tolerancia: 0.0005,
  },
  {
    nombre: "Agropecuario y pesca",
    origen: {
      tipo: "oficial",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/05/10A4DA.PDF",
      detalle: "Art. 2: $272.53 al mes, $8.960 por día y $1.120 por hora.",
    },
    fecha: "2026-10-07",
    entrada: { region: "agropecuario" },
    esperado: { mensual: 272.53, diario: 8.96, hora: 1.12 },
  },
]);
