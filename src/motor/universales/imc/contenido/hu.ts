import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Aki 160 lb súlyú és 5 ft 9 in magas, annak a BMI-je: ${n((160 * KG_POR_LB) / (m * m))}. Ez normál testsúly.`,
        `Ennél a magasságnál az egészséges testsúly ${n((18.5 * m * m) / KG_POR_LB)} lb és ${n((24.9 * m * m) / KG_POR_LB)} lb között van.`,
      ]
    : [
        `Aki 70 kg súlyú és ${n(1.75, 2)} m magas, annak a BMI-je: ${n(70 / (1.75 * 1.75))}. Ez normál testsúly.`,
        `Ennél a magasságnál az egészséges testsúly ${n(18.5 * 1.75 * 1.75)} kg és ${n(24.9 * 1.75 * 1.75)} kg között van.`,
      ];
  return {
    h1: "BMI kalkulátor",
    title: tituloQueEntre(`BMI kalkulátor: ${ctx.nombrePais}`, "BMI kalkulátor (testtömegindex számítás)", "BMI kalkulátor"),
    description: "Számold ki a testtömegindexedet (BMI) testsúly és magasság alapján: WHO szerinti kategória és egészséges testsúlytartomány a magasságodhoz.",
    intro: [
      "Add meg a testsúlyodat és a magasságodat. Látod a BMI-det, a kategóriádat az Egészségügyi Világszervezet besorolása szerint, és azt, hogy a magasságodhoz milyen testsúly számít egészségesnek.",
      "Ez felnőtteknek szóló általános mutató. Nem helyettesíti az orvossal való konzultációt.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = testsúly fontban × 703 ÷ (magasság hüvelykben × magasság hüvelykben)." : "BMI = testsúly kilogrammban ÷ (magasság méterben × magasság méterben).",
      `${n(18.5)} alatt soványságról beszélünk, ${n(18.5)} és ${n(24.9)} között normál testsúlyról, 25 és ${n(29.9)} között túlsúlyról. 30 felett elhízásról van szó.`,
      `Az egészséges testsúly azokat az értékeket jelenti, amelyeknél a BMI a magasságodhoz mérten ${n(18.5)} és ${n(24.9)} között marad.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mennyi a normál BMI?",
        respuesta: `A WHO szerint felnőtteknél ${n(18.5)} és ${n(24.9)} között. A határok nőknél és férfiaknál ugyanazok.`,
      },
      {
        pregunta: "Mindenkinél használható a BMI?",
        respuesta: "Nem. Nem tesz különbséget izom és zsír között, ezért izmos embereknél túl magasat mutathat. Várandósság alatt, gyerekeknél és kamaszoknál másképp kell értékelni.",
      },
      {
        pregunta: "Mit tegyek, ha magas a BMI-m?",
        respuesta: "Beszéld meg az eredményt orvossal vagy dietetikussal. Érdemes más mutatókkal együtt nézni: a derékkörfogattal, az étkezéssel és a mozgással.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Testtömegindex: a testsúly és a magasság négyzetének hányadosa." },
      { termino: "WHO", definicion: "Egészségügyi Világszervezet. Ő határozza meg a felnőttek BMI-kategóriáit." },
    ],
  };
};
