import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const voitja = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${anios} aasta jooksul ${a.comprar >= a.alquilar ? "on ostmine kasulikum" : "on üürimine kasulikum"} ja vahe on ${m(Math.abs(a.comprar - a.alquilar))}.`;
  return {
    h1: "Üürikodu või oma kodu",
    title: tituloQueEntre(
      `Üür või oma kodu: arvuta, kumb on kasulikum | ${ctx.nombrePais}`,
      `Üür või oma kodu | ${ctx.nombrePais}`,
      "Üür või oma kodu",
    ),
    description: "Võrdle üürimist ja kodu ostmist sinu valitud aastate jooksul. Näed, kumb on lõpuks kasulikum, millisest aastast alates ja kui palju.",
    intro: [
      "Laenu kuumakse võrdlemisest üüriga ei piisa. Ostja maksab intresse, remonti ja muid kulusid, kuid omab lõpuks kodu. Üürnik saab oma säästud investeerida ja lasta neil kasvada.",
      "Kalkulaator liidab selle kõik aasta aastalt kokku ja näitab, kumb valik jätab sulle suurema vara.",
    ],
    comoSeCalcula: [
      "Ostmine: maksad iga kuu laenu ja omaniku kulusid. Sinu vara on kodu väärtus miinus laenujääk.",
      "Üürimine: sissemakse ja ostukulud investeeritakse selle asemel muude investeeringute tootlusega ning üür tõuseb igal aastal.",
      "See, kelle kulud on kuus väiksemad, investeerib vahe. Nii on mõlemal valikul sama eelarve.",
      "Parem valik on see, mis annab lõpus suurema vara.",
    ],
    ejemplo: [
      `Kodu maksab ${m(precio)}, sissemakse on 20% ja kodulaenu intress 7%, laenuperiood 25 aastat. Võrdluseks on üür kuus ${m(alquiler)}.`,
      `${voitja(a10, "10")} ${voitja(a3, "3")}`,
    ],
    faq: [
      {
        pregunta: "Kas üürimine on raha tuulde loopimine?",
        respuesta:
          "Tegelikult mitte. Ka ostjal on kulusid, mis kunagi tagasi ei tule, näiteks intressid, ostukulud ja remont. Otsustav on see, kui palju sul mõlemal juhul lõpuks alles on.",
      },
      {
        pregunta: "Miks vastus aastate järgi muutub?",
        respuesta:
          "Ostmisel on alguses suured kulud (ostukulud ja esimeste aastate suured intressid), mille tasakaalustamine võtab aega. Kui plaanid peagi kolida, on üürimine tavaliselt kasulikum.",
      },
      {
        pregunta: "Milline näitaja mõjutab kõige rohkem?",
        respuesta:
          "Hinna ja üüri suhe, kodulaenu intress ja see, kui kiiresti kodude hinnad tõusevad. Proovi muuta väärtuse kasvu ja tootlust, siis näed, kui palju vastus muutub.",
      },
    ],
    glosario: [
      { termino: "Vara", definicion: "See, mis sul on, miinus see, mille oled võlgu." },
      { termino: "Väärtuse kasv", definicion: "Kui palju kodu väärtus aastas tõuseb." },
      { termino: "Alternatiivkulu", definicion: "See, mida sissemakse oleks teeninud, kui oleksid selle investeerinud." },
    ],
  };
};
