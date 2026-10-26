import { definirCasos } from "@/motor/calculo";
import grundskyld from "./grundskyld";

const KOM = "https://svmn.dk/tal-og-metode/satser/oversigt-over-kommuneskatter";

export default definirCasos(grundskyld, [
  {
    nombre: "Grundværdi 1,5 mio. kr. i København",
    origen: { tipo: "recalculado", url: KOM, detalle: "80 % af 1.500.000 = 1.200.000; 5,10 promille = 6.120 om året, 510 pr. måned." },
    fecha: "2026-10-24",
    entrada: { kommune: "koebenhavn", type: "grundvaerdi", beloeb: 1500000 },
    esperado: { grundlag: 1200000, promille: 5.1, skat: 6120, maaned: 510 },
  },
  {
    nombre: "Beskatningsgrundlag 800.000 kr. i Lolland",
    origen: { tipo: "recalculado", url: KOM, detalle: "17,40 promille af 800.000 = 13.920." },
    fecha: "2026-10-24",
    entrada: { kommune: "lolland", type: "grundlag", beloeb: 800000 },
    esperado: { skat: 13920 },
  },
]);
