import { definirCasos } from "@/motor/calculo";
import fratraedelsesgodtgoerelse from "./fratraedelsesgodtgoerelse";

const FUNK = "https://www.retsinformation.dk/eli/lta/2017/1002";

export default definirCasos(fratraedelsesgodtgoerelse, [
  {
    nombre: "16 års ansættelse: 1 månedsløn",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2 a: mindst 12 år giver 1 måneds løn. 1. marts 2010 til 24. oktober 2026 = 16 hele år; 1 × 40.000." },
    fecha: "2026-10-24",
    entrada: { ansat: "2010-03-01", fratraeden: "2026-10-24", loen: 40000 },
    esperado: { aar: 16, maaneder: 1, beloeb: 40000 },
  },
  {
    nombre: "17 års ansættelse: 3 månedslønninger",
    origen: { tipo: "recalculado", url: FUNK, detalle: "§ 2 a: 17 år giver 3 måneders løn; 3 × 45.000 = 135.000." },
    fecha: "2026-10-24",
    entrada: { ansat: "2009-01-01", fratraeden: "2026-02-01", loen: 45000 },
    esperado: { aar: 17, maaneder: 3, beloeb: 135000 },
  },
  {
    nombre: "Dagen før 12 år",
    origen: { tipo: "recalculado", url: FUNK, detalle: "1. februar 2014 til 31. januar 2026 er 11 hele år: ingen godtgørelse." },
    fecha: "2026-10-24",
    entrada: { ansat: "2014-02-01", fratraeden: "2026-01-31", loen: 40000 },
    esperado: { aar: 11, maaneder: 0, beloeb: 0 },
  },
  {
    nombre: "Fratræden før ansættelse",
    origen: { tipo: "recalculado", url: FUNK, detalle: "Datoerne er byttet om." },
    fecha: "2026-10-24",
    entrada: { ansat: "2026-05-01", fratraeden: "2026-01-01", loen: 40000 },
    esperaError: true,
  },
]);
