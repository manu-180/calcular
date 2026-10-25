import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mérföld" : "kilométer";
  const unidadPor = imperial ? "mérföldenként" : "kilométerenként";
  return {
    h1: "Autó fenntartási költség kalkulátor",
    title: tituloQueEntre(`Autó fenntartási költség kalkulátor (${ctx.nombrePais})`, `Mennyibe kerül egy autó? (${ctx.nombrePais})`, "Autó fenntartási költség kalkulátor"),
    description: `Számold ki, mennyibe kerül valójában az autód havonta, évente és ${unidadPor}: üzemanyag, biztosítás, szerviz, parkolás és az értékvesztés.`,
    intro: [
      "A legtöbben tudják, mennyit költenek üzemanyagra. Kevesen adják hozzá a biztosítást, a szervizt, a parkolást és főleg azt, amennyit az autó évente veszít az értékéből.",
      "Írd be a költségeidet, és megmutatjuk, mennyibe kerül valójában az autód. Segít eldönteni, hogy vegyél-e autót, cserélj-e, vagy közlekedj másképp.",
    ],
    comoSeCalcula: [
      imperial
        ? "Üzemanyag havonta = havi mérföld ÷ mérföld gallononként × gallon ára."
        : "Üzemanyag havonta = havi kilométer × fogyasztás 100 km-en ÷ 100 × literár.",
      "Értékvesztés havonta = az autó értéke × éves értékvesztés ÷ 12.",
      "Valódi költség = üzemanyag + biztosítás + karbantartás + parkolás + egyéb költségek + értékvesztés.",
      `Költség ${unidadPor} = valódi havi költség ÷ a hónapban megtett ${unidad}.`,
    ],
    ejemplo: [
      `Egy autó értéke: ${m(g.precio)}, havi futás: ${formatearNumero(ctx, g.distancia)} ${imperial ? "mérföld" : "km"}. Az értékvesztéssel együtt havonta ennyibe kerül: ${m(mensual)}.`,
      `Ez évente ${m(mensual * 12)}, ${unidadPor} pedig ${formatearMonto(ctx, mensual / g.distancia)}.`,
    ],
    faq: [
      {
        pregunta: "Mi az autó értékvesztése?",
        respuesta: "Az az érték, amelyet az autó idővel elveszít. Nem fizeted havonta, de eladáskor megérzed. Új autónál gyakran ez a legnagyobb költség.",
      },
      {
        pregunta: "Miért nem számoljuk bele a hiteltörlesztőt?",
        respuesta:
          "A törlesztő egy része magát az autót fizeti, amit már az értékvesztés tartalmaz. Ha mindkettőt hozzáadnánk, kétszer számolnánk az autót. A hitel kamata külön költség.",
      },
      {
        pregunta: "Hogyan csökkenthetem az autóm költségeit?",
        respuesta:
          "Évente hasonlítsd össze a biztosítási ajánlatokat, tartsd rendben a guminyomást és a szervizt, és ne cseréld túl gyakran az autót: az első években veszít a legtöbbet az értékéből.",
      },
    ],
    glosario: [
      { termino: "Értékvesztés", definicion: "Az érték, amelyet az autó az idővel és a használattal elveszít." },
      { termino: `Költség ${unidadPor}`, definicion: `Egy megtett ${unidad} átlagos költsége, minden kiadással együtt.` },
    ],
  };
};
