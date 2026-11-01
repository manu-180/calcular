import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Taupymo pensijai skaičiuoklė",
    title: tituloQueEntre(`Taupymo pensijai skaičiuoklė (${ctx.nombrePais})`, "Taupymo pensijai skaičiuoklė", "Taupymas pensijai"),
    description: "Apskaičiuokite, kiek mėnesinėmis įmokomis galite sutaupyti pensijai ir kokias mėnesines pajamas tai duos šiandienos kainomis.",
    intro: [
      "Valstybinės pensijos dažnai nepakanka, kad išliktų įprastas gyvenimo lygis. Savos santaupos, net ir nedidelės, labai padeda, jei pradedama laiku.",
      "Įveskite savo amžių, kada norite išeiti į pensiją, kiek jau turite ir kiek galite pridėti kas mėnesį. Parodysime sumą pensijos pradžioje ir kiek iš jos galima naudoti kas mėnesį.",
    ],
    comoSeCalcula: [
      "Santaupos kas mėnesį auga realiąja grąža, tai yra grąža atėmus infliaciją. Todėl rezultatas pateikiamas šiandienos kainomis.",
      "Išėjus į pensiją santaupos išmokamos vienodomis mėnesinėmis sumomis pasirinktą metų skaičių. Likutis tuo metu toliau uždirba.",
      "Valstybinė pensija, mokesčiai ir investavimo mokesčiai neįskaičiuojami.",
    ],
    ejemplo: [
      `Tarkime, jums 30 metų, jau turite ${m(actual)} ir kas mėnesį pridedate ${m(aporte)}, o realioji grąža yra 4 %. Iki 65 metų sukaupsite ${m(capital30)}. Tokios sumos užtenka gauti ${m(rentaMensual(capital30, 4, 25))} per mėnesį 25 metų laikotarpiu.`,
      `Jei su tais pačiais skaičiais pradedama tik nuo 40 metų, susikaupia ${m(capital40)}. Dešimt metų daugiau labai pakeičia rezultatą.`,
    ],
    faq: [
      {
        pregunta: "Kas yra realioji grąža?",
        respuesta: "Tai, ką investicijos uždirba atėmus infliaciją. Jei investicijos duoda 7 %, o infliacija yra 3 %, realioji grąža yra maždaug 4 %.",
      },
      {
        pregunta: "Ar tai pakeičia valstybinę pensiją?",
        respuesta: "Ne. Tai jūsų pačių santaupos, kurios papildo valstybinę pensiją ar pensijų kaupimą. Valstybinės pensijos prognozę gali pateikti atsakinga institucija jūsų šalyje.",
      },
      {
        pregunta: "Kiek atidėti pensijai?",
        respuesta: "Vieno teisingo skaičiaus nėra. Dažna taisyklė siūlo atidėti nuo 10 iki 15 % pajamų. Svarbiausia pradėti kuo anksčiau.",
      },
    ],
    glosario: [
      { termino: "Realioji grąža", definicion: "Tai, ką investicijos uždirba viršijant infliaciją." },
      { termino: "Šiandienos kainos", definicion: "Būsima suma, išreikšta tuo, ką už ją galima nusipirkti šiandien." },
    ],
  };
};
