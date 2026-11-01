import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKm: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.km;
  return {
    h1: `គណនាអាករលើតម្លៃបន្ថែម (VAT) ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`គណនា VAT ${tasa} ${g.para(ctx.nombrePais)}`, `គណនា VAT ${tasa} | ${ctx.nombrePais}`, `គណនា VAT ${tasa}`),
    description: `បូក ឬដកអាករលើតម្លៃបន្ថែម ${tasa} ពីតម្លៃណាមួយ។ ឃើញតម្លៃមុន VAT ចំនួនអាករ និងតម្លៃរួម VAT។`,
    intro: [
      `អត្រាអាករលើតម្លៃបន្ថែមទូទៅដែលប្រើនៅទីនេះ${g.para(ctx.nombrePais)}គឺ ${tasa}។`,
      "ជ្រើសថាចង់បូក VAT ទៅលើតម្លៃមុនអាករ ឬដក VAT ចេញពីតម្លៃដែលរួមអាករហើយ រួចបញ្ចូលចំនួនទឹកប្រាក់។",
    ],
    comoSeCalcula: [
      "បូក VAT: អាករ = តម្លៃមុន VAT × អត្រា ÷ 100 និងតម្លៃរួម = តម្លៃមុន VAT + អាករ",
      "ដក VAT: តម្លៃមុន VAT = តម្លៃរួម VAT ÷ (1 + អត្រា ÷ 100) ហើយផលដកដែលនៅសល់គឺអាករ",
      "បើទំនិញមានអត្រាបញ្ចុះ ឬអត្រាពិសេស អាចបញ្ចូលក្នុងប្រអប់ «អត្រាផ្សេង»។",
    ],
    ejemplo: [
      `ដើម្បីបូក VAT លើតម្លៃ ${precio} សូមគុណតម្លៃនឹង ${tasa} រួចបូកលទ្ធផលទៅលើតម្លៃដើម។`,
      `ដើម្បីដឹងថាតម្លៃរួម ${precio} មាន VAT ប៉ុន្មាន សូមចែកតម្លៃនឹង 1 បូកអត្រាអាករ រួចយកលទ្ធផលទៅដកពីតម្លៃរួម។`,
    ],
    faq: [
      {
        pregunta: "តើដក VAT ចេញពីតម្លៃយ៉ាងដូចម្តេច?",
        respuesta: "ចែកតម្លៃនឹង 1 បូកអត្រាអាករជាទសភាគ។ លទ្ធផលគឺតម្លៃមុន VAT ហើយផលដកគឺអាករ។",
      },
      {
        pregunta: "ហេតុអ្វីមិនអាចដកភាគរយចេញពីតម្លៃរួមដោយផ្ទាល់?",
        respuesta: "ព្រោះអាករគិតលើតម្លៃមុន VAT ដែលទាបជាងតម្លៃរួម។ ការដកភាគរយពីតម្លៃរួមនឹងដកច្រើនពេក។",
      },
      {
        pregunta: `តើទំនិញទាំងអស់ជាប់ VAT ${tasa} ឬទេ?`,
        respuesta: "មិនមែនជានិច្ចទេ។ អាហារខ្លះ ឱសថ ឬសេវាកម្មខ្លះអាចមានអត្រាបញ្ចុះ ឬត្រូវបានលើកលែង។ ក្នុងករណីនោះ សូមប្រើប្រអប់ «អត្រាផ្សេង»។",
      },
    ],
    glosario: [
      { termino: "អាករលើតម្លៃបន្ថែម (VAT)", definicion: "អាករដែលបូកលើតម្លៃទំនិញ និងសេវាកម្ម។ ប្រទេសខ្លះហៅថា GST ឬពន្ធលើការលក់។" },
      { termino: "តម្លៃមុន VAT", definicion: "តម្លៃទំនិញ ឬសេវាកម្មមុនបូកអាករ។" },
    ],
  };
};
