import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-km.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "ប្រាក់ខែសរុបប្រចាំខែ" },
    meses: { etiqueta: "ចំនួនខែដែលបានធ្វើការក្នុងឆមាសនេះ" },
    region: { etiqueta: "តំបន់ដែលអ្នកធ្វើការ" },
    regimen: { etiqueta: "ទំហំក្រុមហ៊ុន", opciones: { general: "ក្រុមហ៊ុនមធ្យម ឬធំ", pequena: "ក្រុមហ៊ុនតូច" } },
  },
  filas: {
    base: { etiqueta: "ប្រាក់ខែសម្រាប់គណនា" },
    bono: { etiqueta: "ប្រាក់រង្វាន់" },
    bonificacion: { etiqueta: "ប្រាក់បន្ថែម" },
    total: { etiqueta: "សរុបដែលទទួលបាន" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "ចំនួនខែត្រូវនៅចន្លោះពី 1 ដល់ 6។",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "ប្រាក់ខែរបស់អ្នកទាបជាងអប្បបរមានៃតំបន់ ដូច្នេះប្រាក់រង្វាន់គណនាតាមអប្បបរមា។",
  },
});
