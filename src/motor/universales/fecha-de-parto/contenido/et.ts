import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Sünnitustähtaeg: arvuta sünnituse eeldatav kuupäev",
    title: tituloQueEntre(
      `Sünnitustähtaeg: arvuta rasedusnädalad ja tähtaeg | ${ctx.nombrePais}`,
      `Sünnitustähtaja kalkulaator | ${ctx.nombrePais}`,
      "Sünnitustähtaja kalkulaator",
    ),
    description: "Arvuta sünnitustähtaeg viimase menstruatsiooni või viljastumise põhjal ja vaata, mitmes rasedusnädal sul täna on.",
    intro: [
      "Sisesta viimase menstruatsiooni esimene päev (või viljastumise kuupäev, kui seda tead). Näed sünnitustähtaega, rasedusnädalat ja trimestrit.",
      "Tulemus on hinnang. See ei asenda ämmaemanda ega arsti hinnangut ning kõige täpsema kuupäeva annab ultraheliuuring.",
    ],
    comoSeCalcula: [
      "Arvutus järgib Naegele reeglit: sünnitustähtaeg on viimase menstruatsiooni esimene päev pluss 280 päeva (40 nädalat).",
      "Kui sinu tsükkel on 28 päevast pikem või lühem, nihkub kuupäev sama palju.",
      "Viljastumise kuupäevale lisatakse 266 päeva (38 nädalat).",
      "Rasedusnädalaid loetakse viimasest menstruatsioonist, mitte viljastumisest.",
    ],
    ejemplo: [
      `Kui viimase menstruatsiooni esimene päev on ${f(fum)} ja tsükkel 28 päeva, on sünnitustähtaeg ${f(fpp)}.`,
      `Kui tsükkel on 32 päeva, nihkub tähtaeg 4 päeva hilisemaks: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas sünnitustähtaega arvutatakse?",
        respuesta: "Viimase menstruatsiooni esimesele päevale lisatakse 280 päeva. Kiire rusikareegel annab peaaegu sama päeva: lisa 7 päeva, lahuta 3 kuud ja lisa üks aasta.",
      },
      {
        pregunta: "Miks loetakse rasedusnädalaid viimasest menstruatsioonist?",
        respuesta: "Sest seda kuupäeva teavad peaaegu kõik. Seetõttu ei ole viljastumine 2. rasedusnädalal veel toimunud.",
      },
      {
        pregunta: "Kui paljud lapsed sünnivad täpselt tähtajal?",
        respuesta: "Vähesed. Enamik lapsi sünnib 37. ja 42. rasedusnädala vahel, seega on sünnitustähtaeg suunav, mitte täpne päev.",
      },
    ],
    glosario: [
      { termino: "Sünnitustähtaeg", definicion: "Sünnituse eeldatav kuupäev, mil rasedus on kestnud 40 nädalat." },
      { termino: "Viimane menstruatsioon", definicion: "Viimase menstruatsiooni esimene päev." },
      { termino: "Naegele reegel", definicion: "Viis hinnata sünnitustähtaega, lisades viimasele menstruatsioonile 280 päeva." },
    ],
  };
};
