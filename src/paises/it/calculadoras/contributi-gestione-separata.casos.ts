import { definirCasos } from "@/motor/calculo";
import contributiGestioneSeparata from "./contributi-gestione-separata";

export default definirCasos(contributiGestioneSeparata, [
  {
    nombre: "Contributo minimo del professionista (esempio INPS)",
    origen: {
      tipo: "oficial",
      url: "https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2026/02/Circolare_15153/Allegati/16573_Circolare-numero-8-del-03-02-2026.pdf",
      detalle: "Circolare INPS 8/2026, par. 6.2: con l'aliquota del 26,07% l'accredito dell'intero anno richiede 4.903,25 euro (18.808 × 26,07%).",
    },
    fecha: "2026-10-14",
    entrada: { profilo: "professionista", reddito: 18808 },
    esperado: { totale: 4903.25, aTuoCarico: 4903.25, mesi: 12 },
  },
  {
    nombre: "Pensionato o con altra previdenza sul minimale (esempio INPS)",
    origen: {
      tipo: "oficial",
      url: "https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2026/02/Circolare_15153/Allegati/16573_Circolare-numero-8-del-03-02-2026.pdf",
      detalle: "Circolare INPS 8/2026, par. 6.2: con l'aliquota del 24% il contributo annuo per l'accredito pieno è 4.513,92 euro.",
    },
    fecha: "2026-10-14",
    entrada: { profilo: "professionista-pensionato", reddito: 18808 },
    esperado: { totale: 4513.92, mesi: 12 },
  },
  {
    nombre: "Collaboratore con 30.000 euro di compensi",
    origen: { tipo: "recalculado", detalle: "30.000 × 35,03% = 10.509; un terzo a carico del collaboratore = 3.503; due terzi del committente = 7.006." },
    fecha: "2026-10-14",
    entrada: { profilo: "collaboratore", reddito: 30000 },
    esperado: { totale: 10509, aTuoCarico: 3503, committente: 7006, mesi: 12 },
  },
  {
    nombre: "Professionista con 9.405 euro: metà anno accreditato",
    origen: { tipo: "recalculado", detalle: "9.405 × 26,07% = 2.451,88, appena sopra metà di 4.903,25: 6 mesi." },
    fecha: "2026-10-14",
    entrada: { profilo: "professionista", reddito: 9405 },
    esperado: { totale: 2451.88, mesi: 6 },
  },
  {
    nombre: "Reddito sopra il massimale",
    origen: { tipo: "recalculado", detalle: "Base fermata a 122.295; × 26,07% = 31.882,31." },
    fecha: "2026-10-14",
    entrada: { profilo: "professionista", reddito: 150000 },
    esperado: { totale: 31882.31 },
  },
]);
