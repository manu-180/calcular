import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Výpočet termínu porodu",
    title: tituloQueEntre(`Výpočet termínu porodu: ${ctx.nombrePais}`, "Výpočet termínu porodu a týdne těhotenství", "Výpočet termínu porodu"),
    description: "Spočítejte předpokládaný termín porodu podle poslední menstruace nebo data početí a zjistěte, v kolikátém týdnu těhotenství dnes jste.",
    intro: [
      "Zadejte první den poslední menstruace (nebo datum početí, pokud ho znáte). Uvidíte předpokládaný termín porodu, týden těhotenství a aktuální trimestr.",
      "Jde o orientační odhad. Nejpřesnější termín určí prohlídky u lékaře nebo porodní asistentky a ultrazvuk; tento výpočet odbornou péči nenahrazuje.",
    ],
    comoSeCalcula: [
      "Používá se Naegeleho pravidlo: k prvnímu dni poslední menstruace se přičte 280 dní (40 týdnů).",
      "Pokud je váš cyklus delší nebo kratší než 28 dní, termín se posune o tento rozdíl.",
      "Od data početí se přičítá 266 dní (38 týdnů).",
      "Týdny těhotenství se počítají od poslední menstruace, ne od početí.",
    ],
    ejemplo: [
      `Pokud poslední menstruace začala ${f(fum)} a cyklus trvá 28 dní, předpokládaný termín porodu je ${f(fpp)}.`,
      `Při cyklu 32 dní se termín posune o 4 dny: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Jak se počítá termín porodu?",
        respuesta: "K prvnímu dni poslední menstruace se přičte 280 dní. Jednoduchý postup, který dá skoro stejné datum: ke dni přičtěte 7, od měsíce odečtěte 3 a k roku přičtěte 1.",
      },
      {
        pregunta: "Proč se týdny počítají od poslední menstruace?",
        respuesta: "Protože toto datum zná skoro každá žena. Proto ve 2. týdnu ještě k početí nedošlo.",
      },
      {
        pregunta: "Kolik dětí se narodí přesně v termínu?",
        respuesta: "Velmi málo. Většina se narodí mezi 37. a 42. týdnem, takže termín je orientační, ne přesný den.",
      },
    ],
    glosario: [
      { termino: "Poslední menstruace", definicion: "První den posledního menstruačního krvácení." },
      { termino: "Naegeleho pravidlo", definicion: "Způsob, jak určit předpokládaný termín porodu přičtením 280 dní k prvnímu dni poslední menstruace." },
    ],
  };
};
