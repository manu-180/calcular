import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoKm: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "គណនាចំណុចរួចថ្លៃដើម",
    title: tituloQueEntre(`គណនាចំណុចរួចថ្លៃដើម${GRAMATICA.km.en(ctx.nombrePais)}`, "គណនាចំណុចរួចថ្លៃដើមអាជីវកម្ម", "ចំណុចរួចថ្លៃដើម"),
    description: "គណនាថាត្រូវលក់ប៉ុន្មានឯកតា និងត្រូវមានចំណូលប៉ុន្មានក្នុងមួយខែទើបរួចថ្លៃដើម ហើយត្រូវលក់បន្ថែមប៉ុន្មានដើម្បីបានប្រាក់ចំណេញតាមគោលដៅ។",
    intro: [
      "ចំណុចរួចថ្លៃដើមគឺកម្រិតលក់ដែលអាជីវកម្មមិនចំណេញ និងមិនខាត។ លក់ក្រោមកម្រិតនេះខាត លក់លើសទើបចាប់ផ្តើមចំណេញ។",
      "បញ្ចូលថ្លៃដើមថេរ តម្លៃលក់ និងថ្លៃដើមនៃឯកតានីមួយៗ ប្រព័ន្ធនឹងបង្ហាញចំនួនដែលត្រូវលក់ដើម្បីរួចថ្លៃដើម និងដើម្បីដល់គោលដៅ។",
    ],
    comoSeCalcula: [
      "ចំណេញរួមក្នុងមួយឯកតា = តម្លៃលក់ − ថ្លៃដើមអថេរក្នុងមួយឯកតា",
      "ចំនួនឯកតារួចថ្លៃដើម = ថ្លៃដើមថេរ ÷ ចំណេញរួមក្នុងមួយឯកតា រួចបង្គត់ឡើង។",
      "ចំណូលរួចថ្លៃដើម = ថ្លៃដើមថេរ ÷ (ចំណេញរួមក្នុងមួយឯកតា ÷ តម្លៃលក់)",
      "បើមានប្រាក់ចំណេញគោលដៅ សូមបូកវាចូលថ្លៃដើមថេរ រួចគណនាតាមវិធីដដែល។",
    ],
    ejemplo: [
      `ថ្លៃដើមថេរ ${m(fijos)} តម្លៃលក់ ${m(precio)} និងថ្លៃដើមអថេរ ${m(variable)} ការលក់មួយឯកតានៅសល់ ${m(precio - variable)}។`,
      `ត្រូវលក់ ${formatearNumero(ctx, base.unidades)} ឯកតា (${m(base.facturacion)}) ទើបរួចថ្លៃដើម និង ${formatearNumero(ctx, meta.unidades)} ឯកតាដើម្បីបានប្រាក់ចំណេញ ${m(objetivo)} ក្នុងមួយខែ។`,
    ],
    faq: [
      {
        pregunta: "តើថ្លៃដើមថេរ និងថ្លៃដើមអថេរជាអ្វី?",
        respuesta: "ថ្លៃដើមថេរនៅដដែលទោះបីលក់មិនបានសោះ ដូចជាថ្លៃជួល ប្រាក់ខែថេរ និងថ្លៃទឹកភ្លើង។ ថ្លៃដើមអថេរកើនឡើងតាមការលក់នីមួយៗ ដូចជាទំនិញ វត្ថុធាតុដើម កម្រៃជើងសា និងថ្លៃដឹកជញ្ជូន។",
      },
      {
        pregunta: "តើបន្ថយចំណុចរួចថ្លៃដើមដោយរបៀបណា?",
        respuesta: "មានបីផ្លូវ គឺដំឡើងតម្លៃលក់ បន្ថយថ្លៃដើមអថេរក្នុងមួយឯកតា ឬបន្ថយថ្លៃដើមថេរ។ ជាទូទៅ ការកែតម្លៃលក់មានឥទ្ធិពលខ្លាំងជាងគេ។",
      },
      {
        pregunta: "តើប្រើសម្រាប់អាជីវកម្មសេវាបានទេ?",
        respuesta: "បាន។ មួយឯកតាអាចជាមួយម៉ោង មួយដង ឬអតិថិជនម្នាក់ក្នុងមួយខែ។ សូមប្រើថ្លៃដើមនៃការផ្តល់សេវាមួយឯកតាជាថ្លៃដើមអថេរ។",
      },
    ],
    glosario: [
      { termino: "ចំណុចរួចថ្លៃដើម", definicion: "កម្រិតលក់ដែលចំណូលស្មើនឹងថ្លៃដើមល្មម។" },
      { termino: "ចំណេញរួម", definicion: "ប្រាក់ដែលការលក់នីមួយៗទុកសម្រាប់បង់ថ្លៃដើមថេរ។" },
    ],
  };
};
