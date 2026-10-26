import { definirCasos } from "@/motor/calculo";
import ejendomsvaerdiskat from "./ejendomsvaerdiskat";

const EJD = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/ejendomsskatteloven";

export default definirCasos(ejendomsvaerdiskat, [
  {
    nombre: "Ejendomsværdi 3,5 mio. kr.",
    origen: { tipo: "recalculado", url: EJD, detalle: "Beskatningsgrundlag 80 % = 2.800.000; 5,1 promille = 14.280 om året, 1.190 pr. måned." },
    fecha: "2026-10-24",
    entrada: { vurdering: 3500000 },
    esperado: { grundlag: 2800000, skat: 14280, maaned: 1190, progressiv: 0 },
  },
  {
    nombre: "Ejendomsværdi 12 mio. kr. over progressionsgrænsen",
    origen: { tipo: "recalculado", url: EJD, detalle: "Grundlag 9.600.000. 5,1 promille af 9.007.000 = 45.935,70; 14 promille af 593.000 = 8.302; i alt 54.237,70." },
    fecha: "2026-10-24",
    entrada: { vurdering: 12000000 },
    esperado: { alm: 45935.7, progressiv: 8302, skat: 54237.7 },
  },
]);
