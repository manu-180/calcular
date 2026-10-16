import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave";

const MOM = "https://www.mom.gov.sg/employment-practices/leave/sick-leave/eligibility-and-entitlement";

export default definirCasos(calculadora, [
  {
    nombre: "6 months or more",
    origen: { tipo: "oficial", url: MOM, detalle: "6 months of service: 14 days outpatient and 60 days hospitalisation." },
    fecha: "2026-10-14",
    entrada: { meses: 24, usados: 0 },
    esperado: { ambulatoria: 14, hospitalizacion: 60 },
  },
  {
    nombre: "MOM example: 14 outpatient days already taken",
    origen: { tipo: "oficial", url: MOM, detalle: "After 14 days of outpatient sick leave, 60 − 14 = 46 days of hospitalisation leave are left." },
    fecha: "2026-10-14",
    entrada: { meses: 12, usados: 14 },
    esperado: { quedanAmbulatoria: 0, quedanHospitalizacion: 46 },
  },
  {
    nombre: "4 completed months",
    origen: { tipo: "oficial", url: MOM, detalle: "4 months: 8 days outpatient, 30 days hospitalisation." },
    fecha: "2026-10-14",
    entrada: { meses: 4, usados: 2 },
    esperado: { ambulatoria: 8, hospitalizacion: 30, quedanAmbulatoria: 6, quedanHospitalizacion: 28 },
  },
  {
    nombre: "Less than 3 months",
    origen: { tipo: "oficial", url: MOM, detalle: "At least 3 months of service are needed." },
    fecha: "2026-10-14",
    entrada: { meses: 2, usados: 0 },
    esperado: { ambulatoria: 0, hospitalizacion: 0 },
  },
]);
