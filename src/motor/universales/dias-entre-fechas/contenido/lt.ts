import { formaLt } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Dienų skaičiaus tarp datų skaičiuoklė",
    title: tituloQueEntre(`Dienų skaičius tarp datų: skaičiuoklė (${ctx.nombrePais})`, "Dienų skaičius tarp datų: skaičiuoklė", "Dienų skaičius tarp datų"),
    description: "Apskaičiuokite, kiek dienų yra tarp dviejų datų: kalendorinės dienos, savaitės, mėnesiai ir darbo dienos nuo pirmadienio iki penktadienio.",
    intro: [
      "Pasirinkite pradžios ir pabaigos datą. Pamatysite kalendorinių dienų skaičių, tą patį laikotarpį savaitėmis ir mėnesiais, taip pat darbo dienų skaičių.",
      "Tai praverčia terminams, atostogoms, nėštumui ar skaičiuojant dienas iki svarbios datos.",
    ],
    comoSeCalcula: [
      "Kalendorinės dienos apima kiekvieną dieną tarp abiejų datų. Pirmoji diena skaičiuojama, paskutinė ne, nebent pažymėsite atitinkamą parinktį.",
      "Darbo dienos apima pirmadienius, antradienius, trečiadienius, ketvirtadienius ir penktadienius tuo pačiu laikotarpiu. Valstybinės šventės neatimamos.",
      "Keliamieji metai skaičiuojami įtraukiant vasario 29 d.",
    ],
    ejemplo: [
      `Nuo ${f(desde)} iki ${f(hasta)} yra ${n(dias)} ${formaLt(dias, "kalendorinė diena", "kalendorinės dienos", "kalendorinių dienų")}.`,
      `Iš jų ${n(habiles)} ${formaLt(habiles, "diena patenka", "dienos patenka", "dienų patenka")} į laikotarpį nuo pirmadienio iki penktadienio.`,
    ],
    faq: [
      {
        pregunta: "Ar skaičiuojama pirmoji, ar paskutinė diena?",
        respuesta: "Pagal numatytuosius nustatymus skaičiuojama pirmoji diena, o paskutinė ne, kaip ir atimant dvi datas. Jei reikia abiejų, pažymėkite „Įskaičiuoti ir paskutinę dieną“.",
      },
      {
        pregunta: "Ar iš darbo dienų atimamos valstybinės šventės?",
        respuesta: "Ne. Skaičiuojamos dienos nuo pirmadienio iki penktadienio. Šventės skiriasi pagal šalį, regioną ir metus, todėl jas atimkite atskirai.",
      },
      {
        pregunta: "Kiek dienų yra metuose?",
        respuesta: "Įprastuose metuose yra 365 dienos, keliamuosiuose 366. Todėl tarp tų pačių datų skirtingais metais gali išeiti kitoks dienų skaičius.",
      },
    ],
    glosario: [
      { termino: "Kalendorinės dienos", definicion: "Visos kalendoriaus dienos, įskaitant savaitgalius ir šventes." },
      { termino: "Darbo dienos", definicion: "Šioje skaičiuoklėje dienos nuo pirmadienio iki penktadienio." },
    ],
  };
};
