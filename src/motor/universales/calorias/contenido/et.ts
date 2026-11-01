import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `35-aastase mehe, kes kaalub 180 naela ja on 5 jalga 10 tolli pikk, põhiainevahetus on umbes ${n(basal)} kcal.`,
          `Vähese liikumise korral püsib tema kaal samana, kui ta sööb ööpäevas umbes ${n(basal * FACTORES.sedentaria)} kcal.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `30-aastase naise, kes kaalub 60 kilo ja on 165 sentimeetrit pikk, põhiainevahetus on umbes ${n(basal)} kcal.`,
          `Mõõduka liikumise korral püsib tema kaal samana, kui ta sööb ööpäevas umbes ${n(basal * FACTORES.moderada)} kcal.`,
        ];
      })();
  return {
    h1: "Arvuta oma kaloritevajadus",
    title: tituloQueEntre(
      `Kalorikalkulaator: arvuta päevane energiavajadus | ${ctx.nombrePais}`,
      `Kalorikalkulaator: kalorid päevas | ${ctx.nombrePais}`,
      `Kalorikalkulaator | ${ctx.nombrePais}`,
      "Kalorikalkulaator",
    ),
    description: "Arvuta, kui palju energiat kulutad ööpäevas vanuse, kaalu, pikkuse ja liikumise järgi ning kui palju tasub süüa sinu kaalueesmärgi puhul.",
    intro: [
      "Sisesta oma andmed ja vali, kui palju liigud. Näed oma põhiainevahetust ja energiavajadust tavalisel päeval.",
      "Tulemus on ligikaudne hinnang. See ei asenda toitumisnõustaja, arsti ega õe hinnangut.",
    ],
    comoSeCalcula: [
      `Põhiainevahetus (Mifflin-St Jeor): 10 × kaal kilogrammides + ${n(6.25, 2)} × pikkus sentimeetrites − 5 × vanus. Meestel liidetakse 5, naistel lahutatakse 161.`,
      `Energiavajadus = põhiainevahetus × aktiivsustegur. Tegur on ${n(1.2, 1)}, kui liigud vähe, ja ${n(1.9, 1)}, kui liigud väga palju.`,
      `Kaalu langetades lahutatakse ööpäevasest vajadusest ${DEFICIT} kcal ja kaalu tõstes liidetakse sellele ${SUPERAVIT} kcal. Mõõdukat muutust on lihtsam hoida.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mida põhiainevahetus tähendab?",
        respuesta: "See on energia, mida keha kulutab täielikus puhkeolekus hingamiseks, soojuse hoidmiseks ja elundite tööks.",
      },
      {
        pregunta: "Mitu kalorit peab kaalu langetamiseks sööma?",
        respuesta: `Tavaline lähtekoht on umbes ${DEFICIT} kcal ööpäevas vähem kui sinu energiavajadus. Sobiva koguse tasub kokku leppida tervishoiutöötajaga.`,
      },
      {
        pregunta: "Kui täpne valem on?",
        respuesta: "Mifflin-St Jeor on üks enim kasutatud valemeid, kuid see annab keskmise. Pärilikkus, lihasmass ja terviseseisund mõjutavad seda, kui palju sa tegelikult kulutad.",
      },
    ],
    glosario: [
      { termino: "Kalor (kcal)", definicion: "Toidu energiasisalduse ja keha energiakulu ühik." },
      { termino: "Põhiainevahetus", definicion: "Kalorid, mida keha kulutab täielikus puhkeolekus." },
    ],
  };
};
