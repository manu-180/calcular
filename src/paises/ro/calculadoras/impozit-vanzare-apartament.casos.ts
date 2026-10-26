import { definirCasos } from "@/motor/calculo";
import impozitVanzareApartament from "./impozit-vanzare-apartament";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(impozitVanzareApartament, [
  {
    nombre: "Apartament deținut peste 3 ani, 500.000 lei",
    origen: { tipo: "recalculado", url: CF, detalle: "Codul fiscal, art. 111 alin. (1) lit. b): 1 % × 500.000 = 5.000 lei." },
    fecha: "2026-10-24",
    entrada: { pret: 500000, grila: null, detinere: "peste-3-ani" },
    esperado: { impozit: 5000, cota: 1, ramas: 495000 },
  },
  {
    nombre: "Apartament deținut până la 3 ani",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 111 alin. (1) lit. a): 3 % × 500.000 = 15.000 lei." },
    fecha: "2026-10-24",
    entrada: { pret: 500000, grila: null, detinere: "max-3-ani" },
    esperado: { impozit: 15000, cota: 3 },
  },
  {
    nombre: "Preț sub grila notarilor",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 111 alin. (4^1) lit. a): baza este valoarea minimă din studiul de piață, 450.000; 1 % = 4.500 lei." },
    fecha: "2026-10-24",
    entrada: { pret: 400000, grila: 450000, detinere: "peste-3-ani" },
    esperado: { baza: 450000, impozit: 4500 },
  },
  {
    nombre: "Preț zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără preț nu există calcul." },
    fecha: "2026-10-24",
    entrada: { pret: 0, grila: null, detinere: "peste-3-ani" },
    esperaError: true,
  },
]);
