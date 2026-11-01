import { definirCasos } from "@/motor/calculo";
import porezNaPromet from "./porez-na-promet-nepokretnosti";

const ZAKON = "https://www.gov.me/clanak/izmjene-i-dopune-zakona-o-porezu-na-promet-nepokretnosti-u-primjeni-od-01012024";

export default definirCasos(porezNaPromet, [
  {
    nombre: "Stan od 120.000 eura",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "3 % x 120.000 = 3.600." },
    fecha: "2026-10-31",
    entrada: { cijena: 120000, novogradnja: false },
    esperado: { porez: 3600, ukupno: 123600 },
  },
  {
    nombre: "Kuća od 300.000 eura",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Zakon: 4.500 + 5 % na iznos preko 150.000 = 12.000." },
    fecha: "2026-10-31",
    entrada: { cijena: 300000, novogradnja: false },
    esperado: { porez: 12000 },
  },
  {
    nombre: "Vila od 700.000 eura",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Zakon: 22.000 + 6 % na iznos preko 500.000 = 34.000." },
    fecha: "2026-10-31",
    entrada: { cijena: 700000, novogradnja: false },
    esperado: { porez: 34000 },
  },
  {
    nombre: "Novogradnja sa PDV",
    origen: { tipo: "recalculado", url: "https://www.sluzbenilist.me/propisi/391611", detalle: "Član 6 ne smatra prometom novoizgrađene objekte i građevinsko zemljište koji se oporezuju PDV-om." },
    fecha: "2026-10-31",
    entrada: { cijena: 120000, novogradnja: true },
    esperado: { porez: 0 },
  },
  {
    nombre: "Vrijednost nula je greška",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Bez vrijednosti nema osnovice." },
    fecha: "2026-10-31",
    entrada: { cijena: 0, novogradnja: false },
    esperaError: true,
  },
]);
