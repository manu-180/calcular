import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Eläkesäästäminen: laske omat eläkesäästösi",
    title: tituloQueEntre(
      `Eläkesäästäminen: laske säästösi eläkkeelle jäädessä | ${ctx.nombrePais}`,
      `Eläkesäästäminen | ${ctx.nombrePais}`,
      "Eläkesäästäminen",
    ),
    description: "Katso, paljonko voit säästää eläkettä varten kuukausisäästöllä ja paljonko säästöistä riittää kuukaudessa, tämän päivän rahassa laskettuna.",
    intro: [
      "Lakisääteinen eläke ei aina riitä pitämään elintasoa samana. Omat säästöt, pienetkin, tekevät suuren eron, jos aloitat ajoissa.",
      "Syötä ikäsi, milloin haluat jäädä eläkkeelle, paljonko olet jo säästänyt ja paljonko pystyt säästämään kuukaudessa. Näet säästösi eläkkeelle jäädessä ja sen, paljonko voit nostaa niistä joka kuukausi.",
    ],
    comoSeCalcula: [
      "Säästöt kasvavat joka kuukausi reaalituoton verran, eli tuotto miinus inflaatio. Siksi tulos on tämän päivän rahassa.",
      "Eläkkeellä säästöt maksetaan ulos yhtä suurina kuukausierinä valitsemiesi vuosien aikana. Jäljellä oleva osa kasvaa sillä välin edelleen.",
      "Lakisääteinen eläke, verot sekä rahastojen tai varainhoidon kulut eivät ole mukana.",
    ],
    ejemplo: [
      `Jos sinulla on 30-vuotiaana säästössä ${m(actual)} ja säästät ${m(aporte)} kuukaudessa 4 prosentin reaalituotolla, sinulla on 65-vuotiaana ${m(capital30)}. Siitä voit nostaa ${m(rentaMensual(capital30, 4, 25))} kuukaudessa 25 vuoden ajan.`,
      `Jos aloitat 40-vuotiaana samoilla luvuilla, säästöt ovat lopussa ${m(capital40)}. Kymmenellä vuodella on suuri merkitys.`,
    ],
    faq: [
      {
        pregunta: "Mitä reaalituotto tarkoittaa?",
        respuesta: `Se on sijoituksen tuotto inflaation jälkeen. Jos sijoitus tuottaa 7 % ja inflaatio on 3 %, reaalituotto on noin ${real} %.`,
      },
      {
        pregunta: "Korvaako tämä lakisääteisen eläkkeeni?",
        respuesta: "Ei korvaa. Kyse on omista säästöistäsi lakisääteisen eläkkeen ja työnantajan lisäeläkkeen lisäksi. Jos haluat tietää, paljonko saat lakisääteistä eläkettä, tarkista se asuinmaasi eläkelaitokselta.",
      },
      {
        pregunta: "Paljonko eläkettä varten kannattaa säästää?",
        respuesta: "Kaikille sopivaa lukua ei ole. Yleinen nyrkkisääntö on säästää kymmenestä viiteentoista prosenttia tuloista. Tärkeintä on aloittaa niin aikaisin kuin voit.",
      },
    ],
    glosario: [
      { termino: "Reaalituotto", definicion: "Sijoituksen tuotto inflaation jälkeen." },
      { termino: "Tämän päivän raha", definicion: "Tuleva summa ilmaistuna sen mukaan, mitä sillä saisi tänään." },
    ],
  };
};
