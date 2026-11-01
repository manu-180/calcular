import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const ko = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "kupovina" : "kirija");
  return {
    h1: "Kirija ili kupovina stana: kalkulator",
    title: tituloQueEntre(`Kirija ili kupovina stana? (${ctx.nombrePais})`, "Kirija ili kupovina stana: šta se isplati", "Kirija ili kupovina stana"),
    description: "Uporedite život pod kirijom i kupovinu stana na kredit za izabrani broj godina. Saznajte šta se više isplati, od koje godine i za koliko.",
    intro: [
      "Nije dovoljno uporediti ratu kredita sa kirijom. Vlasnik plaća kamatu, održavanje i porez na imovinu, ali mu na kraju stan pripada. Onaj ko plaća kiriju može da drži učešće uloženo.",
      "Kalkulator sve to računa godinu po godinu i pokazuje koja opcija vam ostavlja veću imovinu.",
    ],
    comoSeCalcula: [
      "Kupovina: svakog meseca plaćate ratu kredita i troškove vlasnika. Vaša imovina je vrednost stana minus preostali dug.",
      "Kirija: učešće i troškovi kupovine ostaju uloženi uz alternativni prinos, a kirija svake godine poskupljuje.",
      "Svakog meseca opcija koja košta manje ulaže razliku, pa obe polaze od istog budžeta.",
      "Povoljnija je opcija sa većom imovinom na kraju.",
    ],
    ejemplo: [
      `Stan od ${m(precio)} sa 20% učešća i kreditom uz kamatu od 7% na 25 godina, u poređenju sa kirijom od ${m(alquiler)} mesečno.`,
      `Posle 10 godina bolje prolazi ${ko(a10)}, a razlika je ${m(Math.abs(a10.comprar - a10.alquilar))}. Posle 3 godine bolje prolazi ${ko(a3)}, a razlika je ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Da li je kirija bačen novac?",
        respuesta:
          "Ne baš. I vlasnik plaća ono što mu se nikad ne vraća: kamatu, porez na imovinu i održavanje. Važno je koliko ćete na kraju imati u svakoj od opcija.",
      },
      {
        pregunta: "Zašto rezultat zavisi od broja godina?",
        respuesta:
          "Kupovina ima visoke početne troškove (naknade i kamata u prvim godinama) koji se ne vraćaju odmah. Ako planirate da se uskoro selite, kirija obično prolazi bolje.",
      },
      {
        pregunta: "Šta najviše utiče na rezultat?",
        respuesta:
          "Odnos cene stana i kirije, kamatna stopa kredita i to koliko brzo stanovi poskupljuju. Promenite rast cena i prinos ulaganja i videćete koliko se odgovor menja.",
      },
    ],
    glosario: [
      { termino: "Imovina", definicion: "Ono što posedujete, minus ono što dugujete." },
      { termino: "Rast cene stana", definicion: "Koliko stan poskupljuje svake godine." },
      { termino: "Oportunitetni trošak", definicion: "Koliko bi učešće donelo da ste ga uložili." },
    ],
  };
};
