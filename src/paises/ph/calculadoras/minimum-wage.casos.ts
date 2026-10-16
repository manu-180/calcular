import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const NCR28 = "https://nwpc.dole.gov.ph/wp-content/uploads/2026/09/Wage-Order-No.-NCR-28.pdf" as const;
const NWPC = "https://nwpc.dole.gov.ph/" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NCR under Wage Order NCR-28",
    origen: { tipo: "oficial", url: NCR28, detalle: "Non-agriculture ₱755.00; agriculture, small retail and small manufacturing ₱718.00. 755 × 22 = 16,610; 755 / 8 = 94.38." },
    fecha: "2026-10-16",
    entrada: { region: "ncr", dias: 22, diario: null },
    esperado: { alto: 755, bajo: 718, mensualAlto: 16610, mensualBajo: 15796, horaAlto: 94.38, diferencia: null },
  },
  {
    nombre: "Central Luzon after the second tranche",
    origen: { tipo: "oficial", url: NWPC, detalle: "WO No. RBIII-26: ₱515.00 to ₱600.00 from 16 April 2026." },
    fecha: "2026-10-16",
    entrada: { region: "central-luzon", dias: 26, diario: 500 },
    esperado: { alto: 600, bajo: 515, diferencia: -15 },
  },
  {
    nombre: "Central Luzon on the day before the second tranche",
    origen: { tipo: "oficial", url: NWPC, detalle: "WO No. RBIII-26: ₱475.00 to ₱570.00 from 30 October 2025." },
    fecha: "2026-04-15",
    entrada: { region: "central-luzon", dias: 26, diario: null },
    esperado: { alto: 570, bajo: 475 },
  },
  {
    nombre: "CALABARZON before Wage Order IVA-23",
    origen: { tipo: "oficial", url: "https://nwpc.dole.gov.ph/wp-content/uploads/2026/10/Wage-Order-No.-IVA-CALABARZON-23.pdf", detalle: "IVA-22 rates in the IVA-23 tables: ₱508.00 to ₱600.00." },
    fecha: "2026-10-16",
    entrada: { region: "calabarzon", dias: 22, diario: null },
    esperado: { alto: 600, bajo: 508 },
  },
  {
    nombre: "CALABARZON from 26 October 2026",
    origen: { tipo: "oficial", url: NWPC, detalle: "WO No. IVA-23: ₱550.00 to ₱645.00." },
    fecha: "2026-10-26",
    entrada: { region: "calabarzon", dias: 22, diario: null },
    esperado: { alto: 645, bajo: 550 },
  },
  {
    nombre: "Bicol before and after December 2026",
    origen: { tipo: "oficial", url: NWPC, detalle: "WO No. RBV-23: ₱455.00 from 8 April 2026, ₱480.00 from 1 December 2026." },
    fecha: "2026-12-01",
    entrada: { region: "bicol", dias: 26, diario: null },
    esperado: { alto: 480, bajo: 480 },
  },
  {
    nombre: "Too many days",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { region: "ncr", dias: 40, diario: null },
    esperaError: true,
  },
]);
