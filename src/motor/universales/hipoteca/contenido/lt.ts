import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Būsto paskolos skaičiuoklė",
    title: tituloQueEntre(`Būsto paskolos skaičiuoklė (${ctx.nombrePais})`, "Būsto paskolos skaičiuoklė: įmoka ir palūkanos", "Būsto paskolos skaičiuoklė"),
    description: "Apskaičiuokite mėnesinę būsto paskolos įmoką pagal būsto kainą, pradinį įnašą, palūkanų normą ir paskolos terminą. Matysite ir palūkanas bei paskolos likutį pagal metus.",
    intro: [
      "Daugumai namų ūkių būsto paskola yra didžiausia skola gyvenime. Verta pamatyti visus skaičius dar prieš kalbantis su banku.",
      "Įveskite būsto kainą, pradinį įnašą, palūkanų normą ir paskolos terminą. Jei kartu su paskola mokate draudimą ar nekilnojamojo turto mokestį, pridėkite juos ir matysite tikrąją mėnesio sumą.",
    ],
    comoSeCalcula: [
      "Paskolos suma = būsto kaina − pradinis įnašas.",
      "Mėnesinė įmoka skaičiuojama kaip anuitetas (visą laiką vienoda): metinė palūkanų norma dalijama iš 12, o terminas imamas mėnesiais.",
      "Už kiekvienus metus susumuojamos sumokėtos palūkanos ir grąžinta paskolos dalis, tada parodomas likutis.",
    ],
    ejemplo: [
      `Kai būstas kainuoja ${m(precio)}, o pradinis įnašas yra 20 %, paskolos suma yra ${m(prestado)}. Kai metinė palūkanų norma 7 %, o terminas 30 metų, mėnesinė įmoka yra ${m(cuota30)}.`,
      `Per 30 metų palūkanų sumokėsite ${m(interesesTotales(prestado, 7, 360))}. Kai terminas 15 metų, įmoka padidėja iki ${m(cuota15)}, bet palūkanos sumažėja iki ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Kokio pradinio įnašo reikia?",
        respuesta:
          "Tai priklauso nuo banko ir šalyje galiojančių taisyklių; bankai paprastai skolina tik dalį būsto vertės. Kuo didesnis pradinis įnašas, tuo mažiau skolinatės, tuo mažesnė įmoka ir tuo mažiau palūkanų sumokėsite. Atidėkite pinigų ir sutarties sudarymo išlaidoms.",
      },
      {
        pregunta: "Kodėl pirmaisiais metais skola beveik nemažėja?",
        respuesta:
          "Palūkanos skaičiuojamos nuo paskolos likučio. Pradžioje jis didelis, todėl didžioji įmokos dalis tenka palūkanoms. Vėliau santykis pamažu keičiasi.",
      },
      {
        pregunta: "Ar geriau trumpesnis paskolos terminas?",
        respuesta:
          "Jei didesnę įmoką galite mokėti, taip: palūkanų sumokėsite gerokai mažiau. Jei ne, gali tikti ilgesnis terminas ir papildomos įmokos, kai tik pavyks.",
      },
      {
        pregunta: "Ar mano įmoka gali pasikeisti?",
        respuesta:
          "Kol palūkanų norma fiksuota, įmoka nesikeičia. Kai fiksavimo laikotarpis baigiasi arba norma yra kintama, įmoka gali padidėti arba sumažėti. Ši skaičiuoklė visam paskolos terminui taiko tą pačią normą.",
      },
    ],
    glosario: [
      { termino: "Pradinis įnašas", definicion: "Būsto kainos dalis, kurią sumokate savo pinigais." },
      { termino: "Paskolos likutis", definicion: "Pasiskolinta suma, kurią dar reikia grąžinti." },
      { termino: "Palūkanų normos fiksavimas", definicion: "Laikotarpis, kurį bankas nekeičia būsto paskolos palūkanų normos." },
    ],
  };
};
