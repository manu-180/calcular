import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoHy: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const auto: GastosAuto = {
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
  const mensual = costoMensual(auto, imperial);
  const porUnidad = imperial ? "մեկ մղոնի համար" : "մեկ կիլոմետրի համար";
  const g = GRAMATICA.hy;
  return {
    h1: "Մեքենայի ծախսերի հաշվիչ",
    title: tituloQueEntre(
      `Մեքենայի ծախսերի հաշվիչ ${g.para(ctx.nombrePais)}`,
      `Մեքենայի ծախսերը ${g.en(ctx.nombrePais)}`,
      "Մեքենայի ծախսերի հաշվիչ",
    ),
    description: `Հաշվարկեք մեքենայի ծախսն ամսական, տարեկան և ${porUnidad}։ Վառելիք, ապահովագրություն, սպասարկում, կայանում և արժեզրկում։`,
    intro: [
      "Շատերը գիտեն, թե որքան են ծախսում վառելիքի վրա։ Քչերն են հաշվի առնում ապահովագրությունը, սպասարկումը, կայանումը և հատկապես այն արժեքը, որը մեքենան կորցնում է ամեն տարի։",
      "Լրացրեք Ձեր ծախսերը և կտեսնեք, թե իրականում որքան է արժենում մեքենան։ Սա օգնում է որոշել՝ գնել, փոխել մեքենան, թե տեղաշարժվել այլ կերպ։",
    ],
    comoSeCalcula: [
      imperial
        ? "Ամսական վառելիք = ամսական մղոն ÷ մղոն մեկ գալոնով × մեկ գալոնի գին։"
        : "Ամսական վառելիք = ամսական կիլոմետր × լիտր 100 կմ-ի վրա ÷ 100 × մեկ լիտրի գին։",
      "Ամսական արժեզրկում = մեքենայի արժեք × տարեկան արժեզրկում ÷ 12։",
      "Իրական ծախս = վառելիք + ապահովագրություն + սպասարկում + կայանում + այլ ծախսեր + արժեզրկում։",
      `Ծախս ${porUnidad} = իրական ամսական ծախս ÷ ամսվա ընթացքում անցած ճանապարհ։`,
    ],
    ejemplo: [
      `${m(auto.precio)} արժողությամբ մեքենան, որն ամսական անցնում է ${formatearNumero(ctx, auto.distancia)} ${imperial ? "մղոն" : "կմ"}, արժեզրկման հետ միասին արժենում է ամսական ${m(mensual)}։`,
      `Դա կազմում է տարեկան ${m(mensual * 12)}, իսկ ծախսը ${porUnidad} ${formatearMonto(ctx, mensual / auto.distancia)} է։`,
    ],
    faq: [
      {
        pregunta: "Ի՞նչ է մեքենայի արժեզրկումը",
        respuesta: "Դա այն արժեքն է, որը մեքենան կորցնում է ժամանակի ընթացքում։ Այն ամեն ամիս չեք վճարում, բայց զգում եք վաճառելիս։ Նոր մեքենայի դեպքում այն հաճախ ամենամեծ ծախսն է։",
      },
      {
        pregunta: "Ինչո՞ւ վարկի մարումը չի ավելացվում",
        respuesta:
          "Մարման մի մասով վճարում եք հենց մեքենայի համար, իսկ այն արդեն հաշվառված է որպես արժեզրկում։ Եթե ավելացվեն երկուսն էլ, մեքենան կհաշվվի երկու անգամ։ Վարկի տոկոսը լրացուցիչ ծախս է։",
      },
      {
        pregunta: "Ինչպե՞ս նվազեցնել մեքենայի ծախսերը",
        respuesta:
          "Ամեն տարի համեմատեք ապահովագրական ընկերությունները, հետևեք անվադողերի ճնշմանը և պարբերական սպասարկմանը և հաճախ մի փոխեք մեքենան՝ առաջին տարիներին այն կորցնում է իր արժեքի ամենամեծ մասը։",
      },
    ],
    glosario: [
      { termino: "Արժեզրկում", definicion: "Այն արժեքը, որը մեքենան կորցնում է ժամանակի և օգտագործման հետևանքով։" },
      { termino: `Ծախս ${porUnidad}`, definicion: `Անցած ${imperial ? "յուրաքանչյուր մղոնի" : "յուրաքանչյուր կիլոմետրի"} միջին արժեքը՝ բոլոր ծախսերով։` },
    ],
  };
};
