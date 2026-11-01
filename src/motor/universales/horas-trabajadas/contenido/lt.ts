import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // 1 valanda, 3 valandos, 10 valandų, 7,75 valandos (nominativo de cuenta; siempre se usa como sujeto).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaLt(x, "valanda", "valandos", "valandų", "valandos")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Dirbtų valandų skaičiuoklė",
    title: tituloQueEntre(
      `Dirbtų valandų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Dirbtų valandų ir atlygio skaičiuoklė",
      "Dirbtų valandų skaičiuoklė",
    ),
    description: "Susumuokite per savaitę dirbtas valandas pagal pradžią, pabaigą ir pertraukas, apskaičiuokite atlygį su viršvalandžiais.",
    intro: [
      "Kiekvienai dienai pasirinkite pradžią ir pabaigą, įveskite neapmokamą pertrauką ir valandinį atlygį. Parodysime visas valandas, viršvalandžius ir savaitės atlygį.",
      "Skaičiuoklė praverčia tikrinant darbo užmokestį, pildant darbo laiko apskaitą ar išrašant sąskaitą už valandinį darbą.",
    ],
    comoSeCalcula: [
      "Valandos per dieną = pabaiga − pradžia − pertrauka. Jei pabaiga ankstesnė už pradžią, pamaina baigiasi kitą dieną.",
      "Viršvalandžiai = visos savaitės valandos − įprastos valandos, jei visų valandų yra daugiau.",
      "Atlygis = įprastos valandos × valandinis atlygis + viršvalandžiai × valandinis atlygis × (1 + priedas).",
    ],
    ejemplo: [
      `Nuo ${hora("09:00")} iki ${hora("17:30")} su 30 minučių pertrauka per dieną išeina ${h(jornada)}. Nuo pirmadienio iki penktadienio tai ${h(jornada * 5)}: kai valandinis atlygis yra ${m(pago)}, gaunama ${m(jornada * 5 * pago)}.`,
      `Nuo ${hora("08:00")} iki ${hora("18:00")} su vienos valandos pertrauka per savaitę išeina ${h(larga * 5)}, iš jų ${h(extra)} yra viršvalandžiai. Kai priedas 50 %, gaunama ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti dirbtas valandas?",
        respuesta: "Iš pabaigos laiko atimkite pradžios laiką, tada atimkite pertrauką. Galiausiai susumuokite visas savaitės dienas.",
      },
      {
        pregunta: "Kaip minutes paversti dešimtainėmis valandomis?",
        respuesta: `Padalykite minutes iš 60. Pusvalandis yra ${n(0.5, 1)}, 15 minučių yra ${n(0.25, 2)}, o 45 minutės yra ${n(0.75, 2)}. Taigi 7 valandos ir 45 minutės yra ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Kiek viršvalandžių leidžiama ir kaip už juos mokama?",
        respuesta: "Tai priklauso nuo šalies, kurioje dirbate, įstatymų ir jūsų sutarties. Skaičiuoklė taiko jūsų įvestą priedą ir įprastas valandas, be konkrečios teisės normos.",
      },
    ],
    glosario: [
      { termino: "Viršvalandžiai", definicion: "Darbas viršijant įprastą darbo laiką, už kurį mokamas priedas." },
      { termino: "Pusantro karto didesnis atlygis", definicion: "Atlygis už viršvalandžius, puse didesnis už įprastą, tai yra su 50 % priedu." },
    ],
  };
};
