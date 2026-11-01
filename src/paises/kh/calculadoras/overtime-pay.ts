import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.overtime-pay",
  mercado: "kh",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: {
    "kh.overtime-day-rate": "numero",
    "kh.overtime-night-rate": "numero",
    "kh.weekly-rest-rate": "numero",
    "kh.holiday-allowance-days": "numero",
    "kh.work-hours-week": "numero",
    "kh.work-hours-day": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ខែប្រចាំខែ (រៀល)", min: 0, porDefecto: 2080000 },
    { id: "horasSemana", tipo: "numero", etiqueta: "ម៉ោងធ្វើការធម្មតាក្នុងមួយសប្តាហ៍", min: 1, max: 48, porDefecto: 48 },
    { id: "horasDia", tipo: "numero", etiqueta: "ម៉ោងបន្ថែមពេលថ្ងៃ", min: 0, porDefecto: 2 },
    { id: "horasNoche", tipo: "numero", etiqueta: "ម៉ោងបន្ថែមពេលយប់ (22 ដល់ 5 ម៉ោង)", min: 0, porDefecto: 1 },
    { id: "diasDescanso", tipo: "numero", etiqueta: "ថ្ងៃធ្វើការនៅថ្ងៃឈប់សម្រាកប្រចាំសប្តាហ៍", min: 0, porDefecto: 0 },
    { id: "diasFeriado", tipo: "numero", etiqueta: "ថ្ងៃធ្វើការនៅថ្ងៃឈប់បុណ្យ", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ខែ។", "salario");
    // El prakas fija los recargos, no el valor de la hora: se toma el sueldo del año sobre las horas del año.
    const hora = (e.salario * 12) / 52 / e.horasSemana;
    const diario = hora * v["kh.work-hours-day"];
    const dia = porcentaje(hora * e.horasDia, v["kh.overtime-day-rate"]);
    const noche = porcentaje(hora * e.horasNoche, v["kh.overtime-night-rate"]);
    const descanso = porcentaje(diario * e.diasDescanso, v["kh.weekly-rest-rate"]);
    const feriado = diario * e.diasFeriado * v["kh.holiday-allowance-days"];
    return {
      total: redondear(dia + noche + descanso + feriado),
      hora: redondear(hora),
      dia: redondear(dia),
      noche: redondear(noche),
      descanso: redondear(descanso),
      feriado: redondear(feriado),
      observaciones: ["ច្បាប់មិនកំណត់រូបមន្តតម្លៃមួយម៉ោងទេ។ លទ្ធផលប្រើប្រាក់ខែមួយឆ្នាំចែកនឹងម៉ោងធ្វើការមួយឆ្នាំ។"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "ប្រាក់បន្ថែមសរុប", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "ប្រាក់ឈ្នួលមួយម៉ោងធម្មតា", formato: "moneda" },
    { clave: "dia", etiqueta: "ម៉ោងបន្ថែមពេលថ្ងៃ", formato: "moneda", ocultarSiCero: true },
    { clave: "noche", etiqueta: "ម៉ោងបន្ថែមពេលយប់", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "ថ្ងៃឈប់សម្រាកប្រចាំសប្តាហ៍", formato: "moneda", ocultarSiCero: true },
    { clave: "feriado", etiqueta: "ប្រាក់បំណាច់ថ្ងៃឈប់បុណ្យ", formato: "moneda", ocultarSiCero: true },
  ],
});
