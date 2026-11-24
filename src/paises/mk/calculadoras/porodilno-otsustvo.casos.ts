import { definirCasos } from "@/motor/calculo";
import porodilnoOtsustvo from "./porodilno-otsustvo";

const ZRO = "https://portal.mdt.gov.mk/post-body-files/zakoni-met-file-LaRm.pdf";

export default definirCasos(porodilnoOtsustvo, [
  {
    nombre: "Едно дете, 45 дена пред раѓање",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 165: раѓање 1.6.2027, почеток 17.4.2027, девет месеци до 16.1.2028; член 166: враќање по 45 дена, 16.7.2027." },
    fecha: "2026-11-01",
    entrada: { raganje: "2027-06-01", pred: 45, poveke: false },
    esperado: { pocetok: "2027-04-17", kraj: "2028-01-16", meseci: 9, najranoVrakjanje: "2027-07-16" },
  },
  {
    nombre: "Близнаци, 28 дена пред раѓање",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 165: 15 месеци од 4.5.2027 до 3.8.2028." },
    fecha: "2026-11-01",
    entrada: { raganje: "2027-06-01", pred: 28, poveke: true },
    esperado: { pocetok: "2027-05-04", kraj: "2028-08-03", meseci: 15 },
  },
  {
    nombre: "Почеток надвор од законскиот опсег",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 165, став 2: најрано 45 дена." },
    fecha: "2026-11-01",
    entrada: { raganje: "2027-06-01", pred: 60, poveke: false },
    esperaError: true,
  },
]);
