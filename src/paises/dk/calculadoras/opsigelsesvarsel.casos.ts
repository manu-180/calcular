import { definirCasos } from "@/motor/calculo";
import opsigelsesvarsel from "./opsigelsesvarsel";

const FUNK = "https://www.retsinformation.dk/eli/lta/2017/1002";

export default definirCasos(opsigelsesvarsel, [
  {
    nombre: "Opsagt i den femte måned: 1 måneds varsel",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2, stk. 2, nr. 1: ansat 1. januar, opsagt 20. maj, fratræden 30. juni (inden for de første 6 måneder)." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbejdsgiver", ansat: "2026-01-01", opsagt: "2026-05-20" },
    esperado: { maaneder: 1, fratraeden: "2026-06-30" },
  },
  {
    nombre: "Opsagt i juni efter ansættelse 1. januar: 3 måneder",
    origen: { tipo: "recalculado", url: FUNK, detalle: "Med 1 måneds varsel ville fratræden være 31. juli, efter 6 måneder. Derfor § 2, stk. 2, nr. 2: 3 måneder til 30. september." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbejdsgiver", ansat: "2026-01-01", opsagt: "2026-06-05" },
    esperado: { maaneder: 3, fratraeden: "2026-09-30" },
  },
  {
    nombre: "2 år og 9 måneder: varslet bliver 4 måneder",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2, stk. 3: med 3 måneder er fratræden 31. januar 2026 efter 3 år, så varslet forhøjes til 4 måneder: fratræden 28. februar 2026." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbejdsgiver", ansat: "2023-01-01", opsagt: "2025-10-15" },
    esperado: { maaneder: 4, fratraeden: "2026-02-28", anciennitet: "3 år og 1 måned" },
  },
  {
    nombre: "2 år og 8 måneder: stadig 3 måneder",
    origen: { tipo: "recalculado", url: FUNK, detalle: "Fratræden 31. december 2025 ligger før 3 års ansættelse: 3 måneder." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbejdsgiver", ansat: "2023-01-01", opsagt: "2025-09-15" },
    esperado: { maaneder: 3, fratraeden: "2025-12-31" },
  },
  {
    nombre: "Over 9 år: højst 6 måneder",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2, stk. 3: højst 6 måneder. Opsagt 24. oktober 2026, fratræden 30. april 2027." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbejdsgiver", ansat: "2010-01-01", opsagt: "2026-10-24" },
    esperado: { maaneder: 6, fratraeden: "2027-04-30" },
  },
  {
    nombre: "Funktionæren siger selv op",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2, stk. 6: 1 måneds varsel til en måneds udgang." },
    fecha: "2026-10-24",
    entrada: { hvem: "funktionaer", ansat: "2010-01-01", opsagt: "2026-10-24" },
    esperado: { maaneder: 1, fratraeden: "2026-11-30" },
  },
]);
