import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const ko = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "kupnja" : "najam");
  return {
    h1: "Najam ili kupnja stana: kalkulator",
    title: tituloQueEntre(`Najam ili kupnja stana? (${ctx.nombrePais})`, "Najam ili kupnja stana: što se isplati", "Najam ili kupnja stana"),
    description: "Usporedite život u najmu i kupnju stana na kredit za odabrani broj godina. Saznajte što se više isplati, od koje godine i za koliko.",
    intro: [
      "Nije dovoljno usporediti ratu kredita s najamninom. Vlasnik plaća kamatu, održavanje i porez na nekretnine, ali mu na kraju stan pripada. Onaj tko plaća najam može držati polog uložen.",
      "Kalkulator sve to računa godinu po godinu i pokazuje koja vam opcija ostavlja veću imovinu.",
    ],
    comoSeCalcula: [
      "Kupnja: svakog mjeseca plaćate ratu kredita i troškove vlasnika. Vaša imovina je vrijednost stana umanjena za preostali dug.",
      "Najam: polog i troškovi kupnje ostaju uloženi uz alternativni prinos, a najamnina svake godine raste.",
      "Svakog mjeseca opcija koja košta manje ulaže razliku, pa obje polaze od istog proračuna.",
      "Povoljnija je opcija s većom imovinom na kraju.",
    ],
    ejemplo: [
      `Stan od ${m(precio)} s pologom od 20 % i kreditom uz kamatu od 7 % na 25 godina, u usporedbi s najamninom od ${m(alquiler)} mjesečno.`,
      `Nakon 10 godina više se isplati ${ko(a10)}, a razlika je ${m(Math.abs(a10.comprar - a10.alquilar))}. Nakon 3 godine više se isplati ${ko(a3)}, a razlika je ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Je li najam bačen novac?",
        respuesta:
          "Ne baš. I vlasnik plaća ono što mu se nikad ne vraća: kamatu, porez na nekretnine i održavanje. Važno je koliko ćete na kraju imati u svakoj od opcija.",
      },
      {
        pregunta: "Zašto rezultat ovisi o broju godina?",
        respuesta:
          "Kupnja ima visoke početne troškove (naknade i kamata u prvim godinama) koji se ne vraćaju odmah. Ako se planirate uskoro seliti, najam obično prolazi bolje.",
      },
      {
        pregunta: "Što najviše utječe na rezultat?",
        respuesta:
          "Odnos cijene stana i najamnine, kamatna stopa kredita i to koliko brzo stanovi poskupljuju. Promijenite rast cijena i prinos ulaganja i vidjet ćete koliko se odgovor mijenja.",
      },
    ],
    glosario: [
      { termino: "Imovina", definicion: "Ono što posjedujete, umanjeno za ono što dugujete." },
      { termino: "Rast cijene stana", definicion: "Koliko stan poskupljuje svake godine." },
      { termino: "Oportunitetni trošak", definicion: "Koliko bi polog donio da ste ga uložili." },
    ],
  };
};
