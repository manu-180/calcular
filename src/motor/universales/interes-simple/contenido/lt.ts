import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Paprastųjų palūkanų skaičiuoklė",
    title: tituloQueEntre(`Paprastųjų palūkanų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Paprastųjų palūkanų skaičiuoklė", "Paprastosios palūkanos"),
    description: "Apskaičiuokite paprastąsias palūkanas nuo pradinės sumos pagal metinę normą už dienas, mėnesius ar metus. Pasirinkite 365 arba 360 dienų metus ir matykite visą sumą.",
    intro: [
      "Paprastosios palūkanos visada skaičiuojamos nuo pradinės sumos: per laikotarpį palūkanos prie jos nepridedamos.",
      "Jos taikomos trumpalaikiams indėliams, paskoloms tarp pažįstamų ir daugelyje mokyklinių uždavinių.",
    ],
    comoSeCalcula: [
      "Palūkanos = pradinė suma × metinė norma × laikotarpis metais.",
      "Kai laikotarpis mėnesiais, dalijama iš 12. Kai laikotarpis dienomis, dalijama iš 365 arba 360, atsižvelgiant į banko naudojamus metus.",
      "Iš viso = pradinė suma + palūkanos.",
    ],
    ejemplo: [
      `Kai pradinė suma ${m(capital)}, o metinė norma 10 %, 6 mėnesių laikotarpio palūkanos yra ${m(capital * 0.1 * 0.5)}.`,
      `Tos pačios sumos 90 dienų laikotarpio palūkanos yra ${m((capital * 0.1 * 90) / 365)}, kai metuose yra 365 dienos, ir ${m((capital * 0.1 * 90) / 360)}, kai skaičiuojami banko metai.`,
    ],
    faq: [
      {
        pregunta: "Kokia paprastųjų palūkanų formulė?",
        respuesta: `P = S × i × t. S yra pradinė suma, i yra metinė norma dešimtainiu skaičiumi (10 % yra ${formatearNumero(ctx, 0.1, 2)}), t yra laikotarpis metais.`,
      },
      {
        pregunta: "Kuo skiriasi paprastosios ir sudėtinės palūkanos?",
        respuesta: "Paprastosios palūkanos visada skaičiuojamos nuo tos pačios pradinės sumos. Taikant sudėtines palūkanas, jos pridedamos prie sumos ir pačios toliau uždirba.",
      },
      {
        pregunta: "Kodėl kai kurie bankai metus skaičiuoja kaip 360 dienų?",
        respuesta: "Tai bankų praktika, kuri palengvina skaičiavimus. Kai metuose skaičiuojama 360 dienų, palūkanos būna šiek tiek didesnės. Pasitikrinkite, kokius metus taiko jūsų bankas.",
      },
    ],
    glosario: [
      { termino: "Pradinė suma", definicion: "Skolinami arba padedami pinigai be palūkanų." },
      { termino: "Banko metai", definicion: "Metai, skaičiuojami kaip 360 dienų, kai kiekvienas mėnuo turi 30 dienų." },
    ],
  };
};
