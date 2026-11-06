import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.km;

// Jemer (ADR 0002, D38): cortés y neutro, «អ្នក» o sin pronombre, y «។» al cerrar la oración.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `អ្នកកំពុងប្រើពី${pais}`,
    resumen: (calculadoras) => `${calculadoras} ជាមួយតម្លៃផ្លូវការជាធរមាន។`,
    ultimoDato: "ទិន្នន័យចុងក្រោយដែលបានផ្ទុក",
    ir: (pais) => `ទៅកាន់${g.nombre(pais)}`,
    otro: "ជ្រើសរើសប្រទេសផ្សេង",
    argentina: "ម៉ាស៊ីនគណនាជាមួយទិន្នន័យផ្លូវការរបស់អាហ្សង់ទីននៅ calcular.ar។",
    argentinaIr: "ទៅកាន់ calcular.ar",
    neutroTitulo: (paises) => `${paises} ប្រទេស ប្រទេសនីមួយៗមានច្បាប់ និងរូបិយប័ណ្ណរៀងខ្លួន`,
    neutroTexto: "យើងពិនិត្យប្រភពផ្លូវការរៀងរាល់ថ្ងៃ។",
    neutroIr: "មើលប្រទេស",
  },
  selector: {
    buscar: "ស្វែងរកប្រទេស",
    sinResultados: (q) => `រកមិនឃើញប្រទេសត្រូវនឹង «${q}»`,
    ubicacion: "ទីតាំងបច្ចុប្បន្ន",
    mismaCalculadora: "ម៉ាស៊ីនគណនាដូចគ្នា",
    paises: "ប្រទេស",
  },
  aviso: { mismaCalculadora: (pais) => `គណនាជាមួយទិន្នន័យ${g.de(pais)}` },
  vivo: {
    titulo: "ទិន្នន័យផ្លូវការ ធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ",
    vigilado: "ប្រព័ន្ធស្វ័យប្រវត្តិពិនិត្យប្រភពផ្លូវការរៀងរាល់ថ្ងៃ។ ការផ្លាស់ប្តូរច្បាប់ចូលអនុវត្តបន្ទាប់ពីយើងបានផ្ទៀងផ្ទាត់។",
    sinVigilar: "តម្លៃនីមួយៗមានប្រភពផ្លូវការ និងថ្ងៃដែលយើងបានផ្ទៀងផ្ទាត់។",
    verificado: "ការផ្ទៀងផ្ទាត់ច្បាប់ចុងក្រោយ",
    automatico: "តួលេខស្វ័យប្រវត្តិចុងក្រោយ",
    fuentes: "ប្រភពផ្លូវការ",
    nFuentes: (n) => `ឯកសារផ្លូវការ ${n}`,
    verFuentes: "មើលប្រភព",
    verNovedades: "មើលបច្ចុប្បន្នភាព",
    hoy: "ថ្ងៃនេះ",
    ayer: "ម្សិលមិញ",
    elDia: (fecha) => `ថ្ងៃទី ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie} ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `បានផ្ទៀងផ្ទាត់ជាមួយប្រភពផ្លូវការថ្ងៃទី ${fecha}`,
    serie: (serie, cuando, organismo) => `${serie}៖ ធ្វើបច្ចុប្បន្នភាព${cuando} ជាមួយតួលេខចុងក្រោយពី${organismo}`,
    diario: "យើងពិនិត្យប្រភពផ្លូវការដោយស្វ័យប្រវត្តិរៀងរាល់ថ្ងៃ",
    actualizado: "បានធ្វើបច្ចុប្បន្នភាព",
  },
  novedades: {
    pildora: "ការធ្វើបច្ចុប្បន្នភាព",
    titulo: (pais) => `ទិន្នន័យផ្លូវការ${g.de(pais)}ដែលបានផ្លាស់ប្តូរ`,
    acento: "នៅថ្ងៃដែលផ្លាស់ប្តូរ",
    bajada: "តួលេខថ្មីនីមួយៗដែលចូលក្នុងម៉ាស៊ីនគណនាត្រូវបានកត់ត្រានៅទីនេះ៖ អ្វីដែលផ្លាស់ប្តូរ ថ្ងៃអនុវត្ត និងប្រភព។",
    ultimoCambio: "ការផ្លាស់ប្តូរចុងក្រោយ",
    revision: "ការពិនិត្យប្រភព",
    diaria: "រៀងរាល់ថ្ងៃ",
    porNorma: "រាល់ពេលមានបទដ្ឋានថ្មី",
    siguiendo: "ប្រភពដែលកំពុងតាមដាន",
    masOrganismos: (n) => `និង ${n} ទៀត`,
    proximos: "បានប្រកាស ជិតអនុវត្ត",
    proximosTexto: "តម្លៃផ្លូវការដែលបានផ្ទុករួច ហើយនឹងអនុវត្តក្នុងពេលឆាប់ៗនេះ។",
    registro: "កំណត់ត្រាការផ្លាស់ប្តូរ",
    rss: "តាមដានតាម RSS",
    vacio: "មិនទាន់មានការផ្លាស់ប្តូរដែលបានកត់ត្រាសម្រាប់ប្រទេសនេះទេ។",
    etiqueta: { editorial: "ច្បាប់", dato: "តួលេខថ្មី", proximo: "ឆាប់ៗនេះ", serie: "ស្វ័យប្រវត្តិ", revision: "ការពិនិត្យ" },
    rige: (fecha) => `អនុវត្តចាប់ពី ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `អនុវត្តចាប់ពី ${desde} ដល់ ${hasta}`,
    antes: (valor, fecha) => `មុននេះ៖ ${valor} (${fecha})`,
    revisados: (n) => `បានពិនិត្យតួលេខ ${n} ជាមួយប្រភពផ្លូវការ`,
    revisadosTexto: (organismos) => `បានបញ្ជាក់តម្លៃជាធរមានជាមួយ${organismos}។`,
    verDatos: (n) => (n === 1 ? "មើលតួលេខ" : `មើលតួលេខទាំង ${n}`),
    calculadoras: "ប្រើក្នុង",
    rango: (min, max, zonas) => `ពី ${min} ដល់ ${max} តាមតំបន់ (${zonas} តំបន់)`,
    tabla: (filas) => `តារាង ${filas} កម្រិត`,
    valores: (n) => `${n} តម្លៃ`,
    pasosTitulo: "របៀបដែលទិន្នន័យថ្មីជានិច្ច",
    pasos: [
      { titulo: "ស្ថាប័នចេញផ្សាយ", texto: "បទដ្ឋាន សន្ទស្សន៍ ឬអត្រាប្តូរប្រាក់ត្រូវបានចេញផ្សាយនៅប្រភពផ្លូវការ។" },
      { titulo: "យើងពិនិត្យមុនប្រើ", texto: "សន្ទស្សន៍ និងអត្រាប្តូរប្រាក់ចូលដោយស្វ័យប្រវត្តិ ជាមួយការពិនិត្យកម្រិត។ ច្បាប់ត្រូវបានផ្ទុកដោយយោងលើឯកសារផ្លូវការ។" },
      { titulo: "ម៉ាស៊ីនគណនាធ្វើបច្ចុប្បន្នភាព", texto: "ម៉ាស៊ីនគណនាប្រើតួលេខថ្មី ហើយការផ្លាស់ប្តូរត្រូវបានកត់ត្រានៅទីនេះជាមួយប្រភព។" },
    ],
    feedTitulo: (pais) => `បច្ចុប្បន្នភាពទិន្នន័យ${g.de(pais)}នៅ CalcularYa`,
    feedSubtitulo: (pais) => `ការផ្លាស់ប្តូរទិន្នន័យផ្លូវការដែលម៉ាស៊ីនគណនា${g.para(pais)}ប្រើ ជាមួយថ្ងៃអនុវត្ត និងប្រភព។`,
  },
};

export const km: Diccionario<TextosInicio> = { base };
