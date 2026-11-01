import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Maksa krediitkaardi võlg tagasi",
    title: tituloQueEntre(
      `Krediitkaardi võlg: arvuta tagasimakse aeg ja intressid | ${ctx.nombrePais}`,
      `Krediitkaardi võlg | ${ctx.nombrePais}`,
      "Krediitkaardi võlg",
    ),
    description: "Arvuta, mitu kuud krediitkaardi võla tagasimaksmine kestab ja kui palju intressi maksad, kui tasud kindla summa või miinimummakse.",
    intro: [
      "Krediitkaardi võlg on tavaliselt sinu kõige kallim võlg. Kui maksad ainult miinimummakset, venib tagasimaksmine aastateks ja intressid kasvavad.",
      "Sisesta võlg, aastaintress ja summa, mida suudad kuus maksta. Näed, millal võlg on tasutud, kui palju maksad intressi ja graafikut kuu kuult.",
    ],
    comoSeCalcula: [
      "Iga kuu lisandub võlale intress: võlg × aastaintress ÷ 12.",
      "Seejärel lahutatakse makse. Miinimummakse on protsent võlast, kuid alati vähemalt teatud summa.",
      "Seda korratakse, kuni võlg on null. Kui makse ei ole intressist suurem, ei vähene võlg kunagi.",
    ],
    ejemplo: [
      `Võlg on ${m(saldo)} ja aastaintress 22%. Kui maksad kuus ${m(fijo)}, on võlg tasutud ${formatearCifra(ctx, conFijo.meses, 0)} kuu jooksul ja intressi koguneb ${m(conFijo.intereses)}.`,
      `Kui maksad ainult 3% miinimummakset, kulub tagasimaksmiseks ${formatearCifra(ctx, conMinimo.meses, 0)} kuud ja intressi koguneb ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Mis juhtub, kui maksan ainult miinimummakset?",
        respuesta:
          "Miinimummakse väheneb koos võlaga, seega maksad iga kuu vähem ja võlg püsib sinuga aastaid. Kui saad, maksa pigem suuremat kindlat summat, kasvõi natuke rohkem.",
      },
      {
        pregunta: "Kas võlga tasub viia väikelaenu peale?",
        respuesta: "Kui laenu intress on kaardi omast selgelt väiksem, tasub see tavaliselt ära. Võrdle mõlema variandi intresse kokku koos tasudega.",
      },
      {
        pregunta: "Millise kaardi võlg tuleks esimesena tasuda?",
        respuesta: "Maksa kõikidelt kaartidelt miinimummakse ja ülejäänu kaardile, mille intress on kõige suurem. Nii maksad intressi kokku kõige vähem.",
      },
    ],
    glosario: [
      { termino: "Miinimummakse", definicion: "Väikseim summa, mida saad kuus maksta ilma viivistasuta. See vähendab võlga vaevu." },
      { termino: "Nominaalne aastaintress", definicion: "Aastaintress, mida kaart võtab järelejäänud võlalt." },
    ],
  };
};
