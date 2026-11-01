import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Pensionisäästmine: arvuta oma pensionisäästud",
    title: tituloQueEntre(
      `Pensionisäästmine: arvuta säästud pensionile jäädes | ${ctx.nombrePais}`,
      `Pensionisäästmine | ${ctx.nombrePais}`,
      "Pensionisäästmine",
    ),
    description: "Vaata, kui palju saad igakuise säästuga pensioniks koguda ja kui palju sellest kuus jätkub, tänases rahas arvestatuna.",
    intro: [
      "Riiklik pension ei pruugi elatustaset samana hoida. Enda säästud, ka väikesed, teevad suure vahe, kui alustad varakult.",
      "Sisesta oma vanus, millal soovid pensionile jääda, kui palju oled juba säästnud ja kui palju suudad kuus säästa. Näed oma säästusid pensionile jäädes ja seda, kui palju saad neist iga kuu välja võtta.",
    ],
    comoSeCalcula: [
      "Säästud kasvavad iga kuu reaaltootluse võrra, mis on tootlus miinus inflatsioon. Seepärast on tulemus tänases rahas.",
      "Pensionil makstakse säästud välja võrdsete kuumaksetena sinu valitud aastate jooksul. Järelejäänud osa kasvab samal ajal edasi.",
      "Riiklik pension, maksud ega fondide või varahalduse tasud ei ole arvestuses.",
    ],
    ejemplo: [
      `Kui sul on 30-aastaselt säästetud ${m(actual)} ja säästad kuus ${m(aporte)} reaaltootlusega 4%, on sul 65-aastaselt ${m(capital30)}. Sellest saad 25 aasta jooksul kuus välja võtta ${m(rentaMensual(capital30, 4, 25))}.`,
      `Kui alustad 40-aastaselt samade arvudega, on säästud lõpus ${m(capital40)}. Kümnel aastal on suur tähtsus.`,
    ],
    faq: [
      {
        pregunta: "Mida reaaltootlus tähendab?",
        respuesta: `See on investeeringu tootlus pärast inflatsiooni. Kui investeering annab 7% ja inflatsioon on 3%, on reaaltootlus umbes ${real}%.`,
      },
      {
        pregunta: "Kas see asendab mu riiklikku pensioni?",
        respuesta: "Ei asenda. Need on sinu enda säästud lisaks riiklikule pensionile ja tööandja lisapensionile. Kui tahad teada, kui suurt riiklikku pensioni saad, küsi seda oma elukohariigi pensioniasutusest.",
      },
      {
        pregunta: "Kui palju tasub pensioniks säästa?",
        respuesta: "Kõigile sobivat arvu ei ole. Levinud rusikareegel on säästa 10-15% sissetulekust. Kõige tähtsam on alustada nii vara kui võimalik.",
      },
    ],
    glosario: [
      { termino: "Reaaltootlus", definicion: "Investeeringu tootlus pärast inflatsiooni." },
      { termino: "Tänane raha", definicion: "Tulevane summa väljendatuna selle järgi, mida selle eest täna saaks." },
    ],
  };
};
