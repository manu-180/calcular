import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const kaj = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "nakup" : "najem");
  return {
    h1: "Najem ali nakup stanovanja: kalkulator",
    title: tituloQueEntre(`Najem ali nakup stanovanja? (${ctx.nombrePais})`, "Najem ali nakup stanovanja: kaj se splača", "Najem ali nakup stanovanja"),
    description: "Primerjajte najem in nakup stanovanja na kredit za izbrano število let. Izračunajte, kaj se bolj splača, od katerega leta in za koliko.",
    intro: [
      "Ni dovolj, da obrok kredita primerjate z najemnino. Lastnik plačuje obresti, vzdrževanje in davek na nepremičnine, vendar mu na koncu stanovanje pripada. Kdor najema, ima lahko lastna sredstva naložena.",
      "Kalkulator vse to izračuna leto za letom in pokaže, pri kateri možnosti vam ostane večje premoženje.",
    ],
    comoSeCalcula: [
      "Nakup: vsak mesec plačujete obrok kredita in stroške lastnika. Vaše premoženje je vrednost stanovanja, zmanjšana za preostali dolg.",
      "Najem: lastna sredstva in stroški nakupa ostanejo naloženi z donosom druge naložbe, najemnina pa vsako leto raste.",
      "Vsak mesec možnost, ki stane manj, razliko naloži, zato obe izhajata iz enakega proračuna.",
      "Ugodnejša je možnost, pri kateri imate na koncu večje premoženje.",
    ],
    ejemplo: [
      `Stanovanje za ${m(precio)} z 20 % lastnih sredstev in kreditom po obrestni meri 7 % za 25 let v primerjavi z najemnino ${m(alquiler)} na mesec.`,
      `Po 10 letih se bolj splača ${kaj(a10)}, razlika znaša ${m(Math.abs(a10.comprar - a10.alquilar))}. Po 3 letih se bolj splača ${kaj(a3)}, razlika znaša ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Je najemnina vržen denar?",
        respuesta:
          "Ne povsem. Tudi lastnik plačuje nekaj, česar nikoli ne dobi nazaj: obresti, davek na nepremičnine in vzdrževanje. Pomembno je, koliko boste na koncu imeli pri vsaki možnosti.",
      },
      {
        pregunta: "Zakaj je rezultat odvisen od števila let?",
        respuesta:
          "Nakup ima visoke začetne stroške (provizije in obresti v prvih letih), ki se ne povrnejo takoj. Če se nameravate kmalu preseliti, je najem običajno boljša izbira.",
      },
      {
        pregunta: "Kaj najbolj vpliva na rezultat?",
        respuesta:
          "Razmerje med ceno stanovanja in najemnino, obrestna mera kredita in to, kako hitro se stanovanja dražijo. Spremenite rast cen in donos naložbe, pa boste videli, koliko se odgovor spremeni.",
      },
    ],
    glosario: [
      { termino: "Premoženje", definicion: "To, kar imate, zmanjšano za to, kar dolgujete." },
      { termino: "Rast cene stanovanja", definicion: "Koliko se stanovanje vsako leto podraži." },
      { termino: "Oportunitetni strošek", definicion: "Koliko bi lastna sredstva prinesla, če bi jih naložili." },
    ],
  };
};
