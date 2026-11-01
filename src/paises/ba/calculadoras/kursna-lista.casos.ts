import { definirCasos } from "@/motor/calculo";
import kursnaLista from "./kursna-lista";

export default definirCasos(kursnaLista, [
  {
    nombre: "100 eura u KM",
    origen: { tipo: "oficial", url: "https://www.cbbh.ba/CurrencyExchange/", detalle: "Kursna lista 215: 1 EUR = 1,955830 KM; 100 x kurs = 195,58." },
    fecha: "2026-11-01",
    entrada: { valuta: "eur", smjer: "ukm", iznos: 100 },
    esperado: { rezultat: 195.58, kurs: 1.95583 },
  },
  {
    nombre: "1.000 KM u dolare",
    origen: { tipo: "recalculado", url: "https://www.cbbh.ba/CurrencyExchange/", detalle: "Lista 215: 1 USD = 1,750653 KM; 1.000 / kurs = 571,22." },
    fecha: "2026-11-01",
    entrada: { valuta: "usd", smjer: "uvalutu", iznos: 1000 },
    esperado: { rezultat: 571.22 },
  },
  {
    nombre: "1.000 dinara u KM",
    origen: { tipo: "recalculado", url: "https://www.cbbh.ba/CurrencyExchange/", detalle: "Lista 215: 100 RSD = 1,664016 KM; 1.000 RSD = 16,64." },
    fecha: "2026-11-01",
    entrada: { valuta: "rsd", smjer: "ukm", iznos: 1000 },
    esperado: { rezultat: 16.64 },
  },
  {
    nombre: "Iznos nula je greška",
    origen: { tipo: "recalculado", url: "https://www.cbbh.ba/CurrencyExchange/", detalle: "Bez iznosa nema obračuna." },
    fecha: "2026-11-01",
    entrada: { valuta: "eur", smjer: "ukm", iznos: 0 },
    esperaError: true,
  },
]);
