import { definirCasos } from "@/motor/calculo";
import proeidopoiisiApolysis from "./proeidopoiisi-apolysis";

const HLI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/atomikes-symvaseis/symvasi-aoristou-chronou/katangelia-symvasis-apo-ton-ergodoti/";

export default definirCasos(proeidopoiisiApolysis, [
  {
    nombre: "3 έτη: 2 μήνες",
    origen: { tipo: "oficial", url: HLI, detalle: "Από 2 έως 5 έτη: προειδοποίηση δύο μηνών. 15.11.2026 + 2 μήνες = 15.1.2027." },
    fecha: "2026-10-24",
    entrada: { eti: 3, imerominia: "2026-11-15" },
    esperado: { mines: 2, lixi: "2027-01-15" },
  },
  {
    nombre: "12 έτη: 4 μήνες, από τέλος μήνα",
    origen: { tipo: "recalculado", url: HLI, detalle: "10 έτη και άνω: 4 μήνες. 31.10.2026 + 4 μήνες = 28.2.2027 (ο Φεβρουάριος έχει 28 ημέρες)." },
    fecha: "2026-10-24",
    entrada: { eti: 12, imerominia: "2026-10-31" },
    esperado: { mines: 4, lixi: "2027-02-28" },
  },
  {
    nombre: "1 έτος: 1 μήνας",
    origen: { tipo: "oficial", url: HLI, detalle: "Από 12 μήνες έως 2 έτη: προειδοποίηση ενός μηνός." },
    fecha: "2026-10-24",
    entrada: { eti: 1, imerominia: "2026-10-24" },
    esperado: { mines: 1, lixi: "2026-11-24" },
  },
  {
    nombre: "Κάτω από ένα έτος",
    origen: { tipo: "oficial", url: HLI, detalle: "Δοκιμαστική περίοδος 12 μηνών: χωρίς προειδοποίηση." },
    fecha: "2026-10-24",
    entrada: { eti: 0, imerominia: "2026-10-24" },
    esperado: { mines: 0, lixi: null },
  },
]);
