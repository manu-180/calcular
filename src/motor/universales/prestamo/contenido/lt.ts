import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Paskolos skaičiuoklė: mėnesinė įmoka ir palūkanos",
    title: tituloQueEntre(`Paskolos skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Paskolos skaičiuoklė: įmoka ir palūkanos", "Paskolos skaičiuoklė"),
    description: "Apskaičiuokite mėnesinę paskolos įmoką, visas palūkanas ir grąžinimo grafiką. Pamatysite, kiek sutaupytų papildomos įmokos.",
    intro: [
      "Prieš pasirašant paskolos sutartį svarbiausi du skaičiai: kiek mokėsite kas mėnesį ir kiek paskola kainuos palūkanomis.",
      "Įveskite paskolos sumą, metinę palūkanų normą ir terminą. Jei planuojate kas mėnesį mokėti daugiau, pridėkite papildomą įmoką ir pamatysite, kiek greičiau baigsite mokėti.",
    ],
    comoSeCalcula: [
      "Skaičiuojama pagal vienodas mėnesines įmokas (anuiteto metodą), įprastą vartojimo, automobilio ir būsto paskolose.",
      "Mėnesio norma = metinė norma ÷ 12.",
      "Įmoka = paskolos suma × mėnesio norma ÷ (1 − (1 + mėnesio norma) pakelta laipsniu minus įmokų skaičius).",
      "Kas mėnesį palūkanos skaičiuojamos nuo likusios skolos. Likusi įmokos dalis mažina paskolą.",
    ],
    ejemplo: [
      `Kai paskola yra ${m(monto)}, metinė palūkanų norma 12 %, o terminas 36 mėnesiai, mėnesinė įmoka yra ${m(cuota36)}. Iš viso palūkanų sumokėsite ${m(interesesTotales(monto, 12, 36))}.`,
      `Pratęsus terminą iki 60 mėnesių, įmoka sumažėja iki ${m(cuota60)}, bet palūkanos išauga iki ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuojama paskolos įmoka?",
        respuesta:
          "Pagal anuiteto formulę. Visos įmokos vienodos, tik pradžioje didžiąją įmokos dalį sudaro palūkanos, o pabaigoje paskolos dalis. Todėl skola iš pradžių mažėja lėtai.",
      },
      {
        pregunta: "Ar verta grąžinti paskolą anksčiau?",
        respuesta:
          "Dažniausiai taip, jei kreditorius už tai neima didelio mokesčio. Papildomi pinigai iš karto mažina likutį, o nuo šios sumos palūkanos nebeskaičiuojamos. Kuo anksčiau grąžinsite, tuo daugiau sutaupysite.",
      },
      {
        pregunta: "Ar ilgesnis terminas naudingesnis?",
        respuesta: "Įmoka mažesnė, bet palūkanų iš viso sumokėsite gerokai daugiau. Prieš apsisprendžiant palyginkite abu skaičius.",
      },
      {
        pregunta: "Kodėl banko nurodyta įmoka kitokia?",
        respuesta:
          "Bankai ir kiti kreditoriai dažnai prideda draudimą, paskolos administravimo mokesčius arba skaičiuoja pagal kitą normą, nei reklamuoja. Pasiūlymus lyginkite pagal BVKKMN ir bendrą mokėtiną sumą, ne vien pagal palūkanų normą.",
      },
    ],
    glosario: [
      { termino: "Likutis", definicion: "Skolos dalis, kurios dar negrąžinote." },
      { termino: "BVKKMN", definicion: "Bendros vartojimo kredito kainos metinė norma. Apima palūkanas ir mokesčius, todėl rodo tikrąją paskolos kainą." },
      { termino: "Paskolos dalis", definicion: "Kiekvienos įmokos dalis, kuri mažina skolą." },
    ],
  };
};
