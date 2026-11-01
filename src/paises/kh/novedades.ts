import type { Novedad } from "@/motor/tipos";

const MLVT = "ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ";

export const novedades: readonly Novedad[] = [
  {
    id: "kh.min-wage-2026",
    fecha: "2026-11-01",
    titulo: "ប្រាក់ឈ្នួលអប្បបរមាឆ្នាំ 2026 គឺ 210 ដុល្លារ",
    texto: "ចាប់ពីថ្ងៃទី 1 ខែមករា ឆ្នាំ 2026 កម្មករកាត់ដេរ ស្បែកជើង និងផលិតផលធ្វើដំណើរពេញសិទ្ធិទទួលបាន 210 ដុល្លារ ហើយនិយោជិតសាកល្បង 208 ដុល្លារក្នុងមួយខែ។",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kh.minimum-wage"],
    fuente: {
      organismo: MLVT,
      titulo: "ប្រកាសលេខ 214/25 ស្តីពីប្រាក់ឈ្នួលអប្បបរមាសម្រាប់ឆ្នាំ2026",
      url: "https://www.mlvt.gov.kh/index.php/%E1%9E%AF%E1%9E%80%E1%9E%9F%E1%9E%B6%E1%9E%9A%E1%9E%95%E1%9F%92%E1%9E%9B%E1%9E%BC%E1%9E%9C%E1%9E%80%E1%9E%B6%E1%9E%9A/%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/43-%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/3340.html",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "kh.overtime-prakas-2025",
    fecha: "2026-11-01",
    titulo: "ប្រកាសថ្មីស្តីពីម៉ោងបន្ថែម និងថ្ងៃឈប់បុណ្យ",
    texto: "ប្រកាសលេខ 112/25 កំណត់ម៉ោងបន្ថែមពេលថ្ងៃ 150% ពេលយប់ 200% ថ្ងៃឈប់សម្រាកប្រចាំសប្តាហ៍ទ្វេដង និងប្រាក់បំណាច់មួយថ្ងៃសម្រាប់ថ្ងៃឈប់បុណ្យ។ ឧបករណ៍គណនាម៉ោងបន្ថែមប្រើអត្រាទាំងនេះ។",
    vigenteDesde: "2025-05-08",
    calculadoras: ["kh.overtime-pay"],
    fuente: {
      organismo: MLVT,
      titulo: "ប្រកាសលេខ 112/25",
      url: "https://www.mlvt.gov.kh/index.php/%E1%9E%AF%E1%9E%80%E1%9E%9F%E1%9E%B6%E1%9E%9A%E1%9E%95%E1%9F%92%E1%9E%9B%E1%9E%BC%E1%9E%9C%E1%9E%80%E1%9E%B6%E1%9E%9A/%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/43-%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%B6%E1%9E%9F/3243.html",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
