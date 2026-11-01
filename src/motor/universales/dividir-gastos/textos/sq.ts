import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosSq: TextosUi<UiDividirGastos> = {
  slug: "ndarje-shpenzimesh",
  ui: () => ({
    persona: (n) => `Personi ${n}`,
    personaAyuda: "Vendosni sa ka paguar secili person. Nëse dikush nuk ka paguar asgjë, por merr pjesë në shpenzim, vendosni 0. Lini bosh fushat e tjera.",
    total: "Totali i shpenzuar",
    personas: "Persona",
    cuota: "Pjesa e secilit",
    transferencias: "Pagesa për të mbyllur llogaritë",
    tabla: "Kush i paguan kujt",
    colDe: "Paguan",
    colPara: "Merr",
    colMonto: "Shuma",
    errorPocas: "Për të ndarë një shpenzim duhen të paktën dy persona.",
    aMano: "Jeni të barabartë: të gjithë kanë paguar njësoj.",
  }),
};
