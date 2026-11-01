import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Izračun stanovanjskega kredita",
    title: tituloQueEntre(
      `Izračun stanovanjskega kredita ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Izračun stanovanjskega kredita: obrok in obresti",
      "Stanovanjski kredit",
    ),
    description: "Izračunajte mesečni obrok stanovanjskega kredita glede na ceno, lastna sredstva, obrestno mero in dobo odplačila, z obrestmi in preostalim dolgom po letih.",
    intro: [
      "Stanovanjski kredit je za večino družin največji dolg, ki ga bodo kdaj najele. Dobro je videti vse številke pred pogovorom z banko.",
      "Vnesite ceno nepremičnine, lastna sredstva, obrestno mero in dobo odplačila. Če poleg obroka plačujete zavarovanje ali davek na nepremičnine, dodajte tudi to in videli boste dejanski mesečni znesek.",
    ],
    comoSeCalcula: [
      "Znesek kredita = cena nepremičnine − lastna sredstva.",
      "Mesečni obrok je anuiteten (vedno enak), z letno obrestno mero, deljeno z 12, in dobo odplačila v mesecih.",
      "Za vsako leto se seštejejo plačane obresti in odplačana glavnica ter prikaže preostali dolg.",
    ],
    ejemplo: [
      `Za stanovanje po ceni ${m(precio)} in 20 % lastnih sredstev kredit znaša ${m(prestado)}. Pri obrestni meri 7 % na leto in dobi odplačila 30 let je mesečni obrok ${m(cuota30)}.`,
      `V 30 letih gre za obresti ${m(interesesTotales(prestado, 7, 360))}. Pri dobi 15 let se obrok zviša na ${m(cuota15)}, obresti pa padejo na ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Koliko lastnih sredstev potrebujem za stanovanjski kredit?",
        respuesta:
          "Odvisno od banke in pravil, ki veljajo v državi, banke pa običajno financirajo le del vrednosti nepremičnine. Več ko imate lastnih sredstev, manj si izposodite, obrok je nižji in plačate manj obresti. Denar predvidite tudi za stroške odobritve kredita.",
      },
      {
        pregunta: "Zakaj se dolg v prvih letih skoraj ne zmanjšuje?",
        respuesta:
          "Obresti se računajo od preostalega dolga. Na začetku je ta velik, zato večji del obroka gre za obresti. To razmerje se sčasoma obrne.",
      },
      {
        pregunta: "Ali je krajša doba odplačila boljša?",
        respuesta:
          "Če zmorete višji obrok, da: za obresti plačate bistveno manj. Če ga ne zmorete, je lahko dobra rešitev daljša doba z občasnimi predčasnimi vplačili.",
      },
      {
        pregunta: "Ali se moj obrok lahko spremeni?",
        respuesta:
          "Pri fiksni obrestni meri obrok ostane enak. Pri spremenljivi obrestni meri obrok sledi spremembam referenčne obrestne mere in se lahko zviša ali zniža. Ta izračun upošteva enako obrestno mero vso dobo odplačila.",
      },
    ],
    glosario: [
      { termino: "Lastna sredstva", definicion: "Del cene nepremičnine, ki ga plačate s svojim denarjem." },
      { termino: "Glavnica", definicion: "Znesek, ki ste si ga izposodili in ga morate še vrniti." },
      { termino: "Fiksna obrestna mera", definicion: "Obrestna mera, ki se v dogovorjenem obdobju ne spreminja, zato je tudi obrok enak." },
    ],
  };
};
