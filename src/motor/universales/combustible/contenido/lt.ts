import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litrai = (x: number) => formaLt(x, "litras", "litrai", "litrų", "litro");
  const galonai = (x: number) => formaLt(x, "galonas", "galonai", "galonų", "galono");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Važiuojant 150 mylių į vieną pusę ir atgal, kai automobilis vienu galonu nuvažiuoja 30 mylių, kuro reikia: ${formatearNumero(ctx, galones)} ${galonai(galones)}.`,
          `Kai galono kaina yra ${m(precio)}, kelionė kainuoja ${m(galones * precio)}. Jei išlaidas dalijasi 2 žmonės, kiekvienas moka ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Važiuojant 300 km į vieną pusę ir atgal, kai automobilio sąnaudos yra 8 litrai 100 km, kuro reikia: ${formatearNumero(ctx, litros)} ${litrai(litros)}.`,
          `Kai litro kaina yra ${m(precio)}, kelionė kainuoja ${m(litros * precio)}. Jei išlaidas dalijasi 2 žmonės, kiekvienas moka ${m((litros * precio) / 2)}.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Kuro sąnaudų skaičiuoklė",
    title: tituloQueEntre(
      `Kuro sąnaudų skaičiuoklė (${ctx.nombrePais})`,
      "Kuro sąnaudų ir kelionės išlaidų skaičiuoklė",
      "Kuro sąnaudų skaičiuoklė",
    ),
    description: "Apskaičiuokite, kiek kuro sunaudosite kelionėje ir kiek ji kainuos, pagal atstumą, automobilio sąnaudas ir kuro kainą.",
    intro: [
      `Įveskite atstumą, automobilio sąnaudas ir ${imperial ? "galono" : "litro"} kainą. Pamatysite, kiek kuro reikia ir kiek kainuos kelionė.`,
      imperial ? "Sąnaudos nurodomos mylių skaičiumi vienam galonui." : "Sąnaudas galite įvesti litrais 100 km arba kilometrais vienam litrui.",
    ],
    comoSeCalcula: imperial
      ? ["Galonai = atstumas ÷ mylios galonui.", "Išlaidos = galonai × galono kaina. Pasirinkus „Pirmyn ir atgal“, atstumas padvigubinamas."]
      : [
          "Kai sąnaudos nurodytos litrais 100 km: litrai = atstumas × sąnaudos ÷ 100.",
          "Kai sąnaudos nurodytos kilometrais vienam litrui: litrai = atstumas ÷ sąnaudos.",
          "Išlaidos = litrai × litro kaina. Pasirinkus „Pirmyn ir atgal“, atstumas padvigubinamas.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kaip mylias galonui perskaičiuoti į litrus 100 km?",
        respuesta: `Padalykite skaičių ${formatearNumero(ctx, 235.215, 1)} iš mpg reikšmės (JAV galonas). Kai automobilis vienu galonu nuvažiuoja 30 mylių, jo sąnaudos yra maždaug ${formatearNumero(ctx, prevod, 1)} ${litrai(prevod)} 100 km.`,
      },
      {
        pregunta: "Ar įskaičiuoti kelių mokesčiai ir vinjetė?",
        respuesta: "Ne. Skaičiuojamas tik kuras. Kelių mokesčius, vinjetę ir stovėjimą pridėkite atskirai.",
      },
      {
        pregunta: "Kodėl mieste automobilis sunaudoja daugiau?",
        respuesta: "Važiuojant su dažnais sustojimais ir pajudėjimais reikia daugiau energijos nei greitkelyje važiuojant pastoviu greičiu. Todėl mieste sąnaudos paprastai didesnės.",
      },
    ],
    glosario: [
      { termino: "Kuro sąnaudos", definicion: "Kiek kuro automobilis sunaudoja tam tikram atstumui arba kiek nuvažiuoja su tam tikru kuro kiekiu." },
      { termino: "mpg", definicion: "Mylios galonui. Kuo didesnė reikšmė, tuo taupesnis automobilis." },
    ],
  };
};
