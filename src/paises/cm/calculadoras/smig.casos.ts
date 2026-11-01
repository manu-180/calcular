import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

export default definirCasos(calculadora, [
  {
    nombre: "Autres secteurs en 2026",
    origen: { tipo: "oficial", url: "https://spm.gov.cm/site/sites/default/files/dpm_2023-00338_s.pdf", detalle: "Décret n° 2023/00338/PM, article 1 : 60 000 F CFA pour les autres secteurs." },
    fecha: "2026-10-26",
    entrada: { secteur: "general", salaire: 55000 },
    esperado: { smig: 60000, annuel: 720000, ecart: -5000 },
  },
  {
    nombre: "Secteur agricole",
    origen: { tipo: "oficial", url: "https://spm.gov.cm/site/sites/default/files/dpm_2023-00338_s.pdf", detalle: "45 000 F CFA pour le secteur agricole et assimilé." },
    fecha: "2026-10-26",
    entrada: { secteur: "agricole", salaire: null },
    esperado: { smig: 45000, ecart: null },
  },
  {
    nombre: "Agents de l'État, la veille du décret de 2024",
    origen: { tipo: "oficial", url: "https://spm.gov.cm/site/sites/default/files/dpm_2023-00338_s.pdf", detalle: "41 875 F CFA jusqu'au 22 février 2024." },
    fecha: "2024-02-22",
    entrada: { secteur: "etat", salaire: null },
    esperado: { smig: 41875 },
  },
  {
    nombre: "Agents de l'État depuis le 23 février 2024",
    origen: { tipo: "oficial", url: "https://www.spm.gov.cm/site/sites/default/files/decret_ndeg_2024_0168.pdf", detalle: "Décret n° 2024/0168/PM, article 1 : 43 969 F CFA." },
    fecha: "2024-02-23",
    entrada: { secteur: "etat", salaire: 50000 },
    esperado: { smig: 43969, ecart: 6031 },
  },
]);
