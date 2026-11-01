import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const ko = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "kupovina" : "najam");
  return {
    h1: "Najam ili kupovina stana: kalkulator",
    title: tituloQueEntre(`Najam ili kupovina stana? (${ctx.nombrePais})`, "Najam ili kupovina stana: što se isplati", "Najam ili kupovina stana"),
    description: "Uporedite život u najmu i kupovinu stana na kredit za izabrani broj godina. Saznajte što se više isplati, od koje godine i za koliko.",
    intro: [
      "Nije dovoljno uporediti ratu kredita s kirijom. Vlasnik plaća kamatu, održavanje i porez na nekretnine, ali mu na kraju stan pripada. Onaj ko plaća najam može držati učešće uložen.",
      "Kalkulator sve to računa godinu po godinu i pokazuje koja vam opcija ostavlja veću imovinu.",
    ],
    comoSeCalcula: [
      "Kupovina: svakog mjeseca plaćate ratu kredita i troškove vlasnika. Vaša imovina je vrijednost stana umanjena za preostali dug.",
      "Najam: učešće i troškovi kupovine ostaju uloženi uz alternativni prinos, a kirija svake godine raste.",
      "Svakog mjeseca opcija koja košta manje ulaže razliku, pa obje polaze od istog budžeta.",
      "Povoljnija je opcija s većom imovinom na kraju.",
    ],
    ejemplo: [
      `Stan od ${m(precio)} s učešćem od 20 % i kreditom uz kamatu od 7 % na 25 godina, u poređenju s kirijom od ${m(alquiler)} mjesečno.`,
      `Nakon 10 godina više se isplati ${ko(a10)}, a razlika je ${m(Math.abs(a10.comprar - a10.alquilar))}. Nakon 3 godine više se isplati ${ko(a3)}, a razlika je ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Da li je najam bačen novac?",
        respuesta:
          "Ne baš. I vlasnik plaća ono što mu se nikad ne vraća: kamatu, porez na nekretnine i održavanje. Važno je koliko ćete na kraju imati u svakoj od opcija.",
      },
      {
        pregunta: "Zašto rezultat ovisi o broju godina?",
        respuesta:
          "Kupovina ima visoke početne troškove (naknade i kamata u prvim godinama) koji se ne vraćaju odmah. Ako se planirate uskoro seliti, najam obično prolazi bolje.",
      },
      {
        pregunta: "Šta najviše utiče na rezultat?",
        respuesta:
          "Odnos cijene stana i kirije, kamatna stopa kredita i to koliko brzo stanovi poskupljuju. Promijenite rast cijena i prinos ulaganja i vidjet ćete koliko se odgovor mijenja.",
      },
    ],
    glosario: [
      { termino: "Imovina", definicion: "Ono što posjedujete, umanjeno za ono što dugujete." },
      { termino: "Rast cijene stana", definicion: "Koliko stan poskupljuje svake godine." },
      { termino: "Oportunitetni trošak", definicion: "Koliko bi učešće donijelo da ste ga uložili." },
    ],
  };
};
