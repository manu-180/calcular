import { contenidoArabe } from "../../comun/arabe";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
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
  const unidad = imperial ? "ميل" : "كيلومتر";
  return {
    h1: "حاسبة تكلفة امتلاك سيارة",
    title: tituloQueEntre(`حاسبة تكلفة امتلاك سيارة في ${ctx.nombrePais}`, `تكلفة السيارة في ${ctx.nombrePais}`, "حاسبة تكلفة امتلاك سيارة"),
    description: `احسب ما تكلفك سيارتك فعلًا في الشهر وفي السنة ولكل ${unidad}: الوقود والتأمين والصيانة والمواقف والقيمة التي تفقدها.`,
    intro: [
      "معظم الناس يعرفون ما ينفقونه على الوقود، وقليلون يجمعون التأمين والصيانة والمواقف، وقبل كل شيء القيمة التي تفقدها السيارة كل سنة.",
      "أدخل تكاليفك لتعرف ما تكلفك سيارتك فعلًا. يساعدك ذلك على أن تقرر هل تشتري سيارة أو تغيّرها أو تتنقل بطريقة أخرى.",
    ],
    comoSeCalcula: [
      imperial
        ? "الوقود في الشهر = الأميال في الشهر ÷ الأميال لكل غالون × سعر الغالون."
        : "الوقود في الشهر = الكيلومترات في الشهر × اللترات لكل 100 كم ÷ 100 × سعر اللتر.",
      "انخفاض القيمة في الشهر = قيمة السيارة × نسبة الانخفاض السنوية ÷ 12.",
      "التكلفة الحقيقية = الوقود + التأمين + الصيانة + المواقف + التكاليف الأخرى + انخفاض القيمة.",
      `التكلفة لكل ${unidad} = التكلفة الحقيقية في الشهر ÷ المسافة المقطوعة في الشهر.`,
    ],
    ejemplo: [
      `سيارة قيمتها ${m(g.precio)} وتقطع ${formatearNumero(ctx, g.distancia)} ${imperial ? "ميل" : "كم"} في الشهر تكلف ${m(mensual)} شهريًا، مع احتساب القيمة التي تفقدها.`,
      `أي ${m(mensual * 12)} في السنة و${formatearMonto(ctx, mensual / g.distancia)} لكل ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "ما المقصود بانخفاض قيمة السيارة؟",
        respuesta: "هو القيمة التي تفقدها السيارة مع الوقت والاستعمال. لا تدفعه كل شهر، لكنك تشعر به عند البيع، وهو في الغالب أكبر تكلفة في السيارة الجديدة.",
      },
      {
        pregunta: "لماذا لا يُضاف قسط التمويل؟",
        respuesta:
          "جزء من القسط هو ثمن السيارة نفسها، وهذا محسوب بالفعل في انخفاض القيمة. جمع الاثنين يعني حساب السيارة مرتين. أما فوائد التمويل فهي تكلفة إضافية.",
      },
      {
        pregunta: "كيف أخفض تكلفة سيارتي؟",
        respuesta:
          "قارن عروض التأمين كل سنة، وحافظ على ضغط الإطارات والصيانة في مواعيدها، ولا تغيّر سيارتك كثيرًا، لأنها تفقد أكبر جزء من قيمتها في السنوات الأولى.",
      },
    ],
    glosario: [
      { termino: "انخفاض القيمة (الإهلاك)", definicion: "القيمة التي تفقدها السيارة مع الوقت والاستعمال." },
      { termino: `التكلفة لكل ${unidad}`, definicion: `متوسط تكلفة كل ${unidad} تقطعه، مع احتساب كل التكاليف.` },
    ],
  };
});
