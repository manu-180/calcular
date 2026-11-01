import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Një burrë 35 vjeç, me 180 lb dhe 5 ft 10 in, ka një metabolizëm bazal prej rreth ${n(basal)} kcal.`,
          `Me aktivitet të ulët, e mban peshën me rreth ${n(basal * FACTORES.sedentaria)} kcal në ditë.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Një grua 30 vjeçe, me 60 kg dhe 165 cm, ka një metabolizëm bazal prej rreth ${n(basal)} kcal.`,
          `Me aktivitet të moderuar, e mban peshën me rreth ${n(basal * FACTORES.moderada)} kcal në ditë.`,
        ];
      })();
  return {
    h1: "Kalkulator kalorish ditore",
    title: tituloQueEntre(`Kalkulator kalorish: ${ctx.nombrePais}`, "Kalkulator kalorish ditore", "Kalkulator kalorish"),
    description: "Zbuloni sa kalori digjni në ditë sipas moshës, peshës, gjatësisë dhe aktivitetit, dhe sa të hani për ta mbajtur peshën, për të humbur ose për të shtuar peshë.",
    intro: [
      "Plotësoni të dhënat dhe nivelin e aktivitetit. Shikoni metabolizmin bazal dhe kaloritë që digjni në një ditë të zakonshme.",
      "Është një përllogaritje orientuese dhe nuk zëvendëson konsultën me një mjek ose nutricionist.",
    ],
    comoSeCalcula: [
      `Metabolizmi bazal (Mifflin-St Jeor): 10 × pesha në kg + ${n(6.25, 2)} × gjatësia në cm − 5 × mosha, plus 5 te burrat ose minus 161 te gratë.`,
      `Kaloritë e mbajtjes së peshës = metabolizmi bazal × faktori i aktivitetit, nga ${n(1.2, 1)} (aktivitet i ulët) deri në ${n(1.9, 1)} (shumë i lartë).`,
      `Për humbjen e peshës zbriten ${DEFICIT} kcal në ditë, ndërsa për shtimin e peshës shtohen ${SUPERAVIT}: një ndryshim i moderuar, i lehtë për t'u mbajtur.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Çfarë është metabolizmi bazal?",
        respuesta: "Është energjia që përdor trupi në qetësi të plotë për të marrë frymë, për të ruajtur temperaturën dhe për të mbajtur organet në punë.",
      },
      {
        pregunta: "Sa kalori duhet të ha për të humbur peshë?",
        respuesta: `Një pikënisje e përdorur shpesh është rreth ${DEFICIT} kcal në ditë nën kaloritë e mbajtjes së peshës. Më mirë ta caktoni shifrën bashkë me një specialist.`,
      },
      {
        pregunta: "Sa e saktë është formula?",
        respuesta: "Mifflin-St Jeor është një nga më të përdorurat, por jep një mesatare. Gjenetika, masa muskulore dhe gjendja shëndetësore ndryshojnë atë që digjni në të vërtetë.",
      },
    ],
    glosario: [
      { termino: "Kalori (kcal)", definicion: "Njësia e energjisë në ushqime dhe në atë që djeg trupi." },
      { termino: "Metabolizëm bazal", definicion: "Kaloritë që djeg trupi në qetësi të plotë." },
    ],
  };
};
