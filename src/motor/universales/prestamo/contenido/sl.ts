import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator kredita in mesečnega obroka",
    title: tituloQueEntre(`Kalkulator kredita ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Kalkulator kredita in mesečnega obroka", "Kalkulator kredita"),
    description: "Izračunajte mesečni obrok kredita, skupne obresti in celoten načrt odplačila. Videli boste tudi, koliko prihranite, če kredit odplačate hitreje.",
    intro: [
      "Preden podpišete kreditno pogodbo, sta pomembni dve številki: koliko boste plačevali vsak mesec in koliko boste skupaj plačali za obresti.",
      "Vnesite znesek kredita, letno obrestno mero in dobo odplačila. Če nameravate vsak mesec plačati nekaj več, dodajte tudi ta znesek in videli boste, koliko prej končate odplačilo.",
    ],
    comoSeCalcula: [
      "Računa se z enakimi mesečnimi obroki (anuitetno odplačilo), kot se odplačujejo gotovinski, avtomobilski in stanovanjski krediti.",
      "Mesečna obrestna mera = letna obrestna mera ÷ 12.",
      "Obrok = znesek kredita × mesečna obrestna mera ÷ (1 − (1 + mesečna obrestna mera) na minus število obrokov).",
      "Obresti se vsak mesec računajo od tega, kar še dolgujete. Preostanek obroka zmanjša glavnico.",
    ],
    ejemplo: [
      `Kredit ${m(monto)} z obrestno mero 12 % na leto za 36 mesecev ima obrok ${m(cuota36)}. Za obresti skupaj plačate ${m(interesesTotales(monto, 12, 36))}.`,
      `Če dobo podaljšate na 60 mesecev, se obrok zniža na ${m(cuota60)}, obresti pa se povečajo na ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračuna obrok kredita?",
        respuesta:
          "Po formuli za anuitetno odplačilo. Vsi obroki so enaki, vendar na začetku največji del obroka predstavljajo obresti, proti koncu pa glavnica. Zato se dolg v prvih letih počasi zmanjšuje.",
      },
      {
        pregunta: "Ali se predčasno odplačilo kredita splača?",
        respuesta:
          "Najpogosteje da, če banka za to ne zaračuna visokega nadomestila. Dodatni denar gre neposredno na glavnico, od tega dela pa se obresti ne računajo več. Prej ko plačate, več prihranite.",
      },
      {
        pregunta: "Ali je daljša doba odplačila ugodnejša?",
        respuesta: "Obrok je nižji, vendar skupaj plačate veliko več obresti. Pred odločitvijo primerjajte obe številki.",
      },
      {
        pregunta: "Zakaj banka navaja drugačen obrok?",
        respuesta:
          "Banke pogosto dodajo zavarovanje, stroške odobritve kredita ali računajo z drugačno obrestno mero od oglaševane. Ponudbe primerjajte po EOM in skupnem znesku za plačilo, ne samo po obrestni meri.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Del dolga, ki ga še niste odplačali." },
      { termino: "EOM", definicion: "Efektivna obrestna mera. Vključuje obresti in stroške, zato pokaže dejansko ceno kredita." },
      { termino: "Anuiteta", definicion: "Enak mesečni obrok, sestavljen iz obresti in dela glavnice." },
    ],
  };
};
