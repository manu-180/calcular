import { definirCasos } from "@/motor/calculo";
import calculadora from "./spk-self-employed-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Verified member pays BND 40",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/spk-self-employed-verified-member-contribution", detalle: "TAP scenario: 40.00 to the Retirement Account plus a 17.50 Match-Up." },
    fecha: "2026-10-29",
    entrada: { aporte: 40, estado: "verified" },
    esperado: { retiro: 40, match: 17.5, cuentaMiembro: 0, anualRetiro: 690 },
  },
  {
    nombre: "Verified member pays BND 50",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/spk-self-employed-verified-member-contribution", detalle: "TAP scenario: 40.00 to the Retirement Account, 17.50 Match-Up, 10.00 to the Member Account." },
    fecha: "2026-10-29",
    entrada: { aporte: 50, estado: "verified" },
    esperado: { retiro: 40, match: 17.5, cuentaMiembro: 10 },
  },
  {
    nombre: "Verified member pays BND 10",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/spk-self-employed-verified-member-contribution", detalle: "TAP scenario: below 17.50 there is no Match-Up and 10.00 goes to the Member Account." },
    fecha: "2026-10-29",
    entrada: { aporte: 10, estado: "verified" },
    esperado: { retiro: 0, match: 0, cuentaMiembro: 10 },
  },
  {
    nombre: "Verified member pays the minimum",
    origen: { tipo: "recalculado", detalle: "17.50 reaches the minimum, so 17.50 plus a 17.50 Match-Up." },
    fecha: "2026-10-29",
    entrada: { aporte: 17.5, estado: "verified" },
    esperado: { retiro: 17.5, match: 17.5, cuentaMiembro: 0 },
  },
  {
    nombre: "Unverified member pays BND 100",
    origen: { tipo: "recalculado", detalle: "All 100 goes to the Member Account, with no Match-Up." },
    fecha: "2026-10-29",
    entrada: { aporte: 100, estado: "unverified" },
    esperado: { retiro: 0, match: 0, cuentaMiembro: 100 },
  },
  {
    nombre: "Unverified member above the limit",
    origen: { tipo: "recalculado", detalle: "1,500 is above the 1,000 monthly limit." },
    fecha: "2026-10-29",
    entrada: { aporte: 1500, estado: "unverified" },
    esperaError: true,
  },
]);
