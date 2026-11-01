import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Družinski proračun po pravilu 50/30/20",
    title: tituloQueEntre(
      `Družinski proračun 50/30/20 ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Družinski proračun po pravilu 50/30/20",
      "Družinski proračun 50/30/20",
    ),
    description: "Razdelite neto mesečni dohodek po pravilu 50/30/20: koliko za osnovne stroške, koliko za želje in koliko za varčevanje. Odstotke lahko spremenite.",
    intro: [
      "Pravilo 50/30/20 je preprost način za načrtovanje meseca. Polovica gre za osnovne stroške, 30 % za to, kar vas veseli, in 20 % za varčevanje.",
      "Vnesite neto dohodek in videli boste, koliko pripada vsakemu delu. Če so vaše razmere drugačne, na primer zaradi visoke najemnine, prilagodite odstotke.",
    ],
    comoSeCalcula: [
      "Osnovni stroški = dohodek × 50 %.",
      "Želje in užitki = dohodek × 30 %.",
      "Varčevanje = dohodek × 20 %. Vsi trije odstotki skupaj morajo dati 100 %.",
    ],
    ejemplo: [
      `Pri dohodku ${m(ingreso)} na mesec: ${m(ingreso * 0.5)} za osnovne stroške, ${m(ingreso * 0.3)} za želje in užitke in ${m(ingreso * 0.2)} za varčevanje.`,
      `V enem letu teh 20 % skupaj znese ${m(ingreso * 0.2 * 12)} prihrankov.`,
    ],
    faq: [
      {
        pregunta: "Kaj spada med osnovne stroške in kaj med želje?",
        respuesta:
          "Osnovni stroški so tisti, ki jih morate plačati: stanovanje, osnovna živila, računi, prevoz, zdravje in obvezni obroki. Želje in užitki so stvari, brez katerih bi v sili zdržali.",
      },
      {
        pregunta: "Kaj, če osnovni stroški presegajo 50 %?",
        respuesta: "To je pogosto, zlasti če je najemnina visoka. Poskusite z razdelitvijo 60/20/20 ali 70/20/10 in varčevanja ne spustite na nič.",
      },
      {
        pregunta: "Ali odplačilo dolgov šteje kot varčevanje?",
        respuesta: "Obvezni obroki spadajo med osnovne stroške. Kar odplačate poleg tega, da bi se dolga znebili prej, šteje kot varčevanje, ker vaše finančno stanje izboljša enako kot prihranek.",
      },
    ],
    glosario: [
      { termino: "Neto dohodek", definicion: "Koliko prejmete po odbitku davkov in prispevkov." },
      { termino: "Pravilo 50/30/20", definicion: "Način razdelitve dohodka na osnovne stroške, želje in varčevanje." },
    ],
  };
};
