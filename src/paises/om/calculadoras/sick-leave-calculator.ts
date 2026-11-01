import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { CAMPO_DIAS_MES } from "../lib/laboral";
import { CAMPO_NACIONALIDAD } from "../lib/spf";

function tasaDelDia(escala: readonly FilaEscala[], dia: number): number {
  const fila = escala.find((f) => dia > f.desde && (f.hasta === null || dia <= f.hasta));
  return fila ? fila.tasa : 0;
}

export default definirCalculadora({
  id: "om.sick-leave-calculator",
  mercado: "om",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "om.sick-leave": "escala",
    "om.sick-leave-days": "numero",
    "om.sick-employer-days": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشامل الشهري", ayuda: "الأساسي مع جميع العلاوات والبدلات.", min: 0, porDefecto: 600 },
    { id: "previos", tipo: "entero", etiqueta: "أيام الإجازة المرضية السابقة في العام نفسه", min: 0, max: 400, porDefecto: 0 },
    { id: "dias", tipo: "entero", etiqueta: "أيام الإجازة المرضية الحالية", min: 1, max: 400, porDefecto: 10 },
    CAMPO_NACIONALIDAD,
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشامل الشهري.", "salario");
    if (entrada.dias <= 0) throw new ErrorEntrada("أدخل عدد أيام الإجازة.", "dias");
    const maximo = v["om.sick-leave-days"];
    const diasEmpleador = v["om.sick-employer-days"];
    const omani = entrada.nacionalidad === "omani";
    const diario = entrada.salario / entrada.diasMes;
    let empleador = 0;
    let fondo = 0;
    let sinPago = 0;
    for (let d = entrada.previos + 1; d <= entrada.previos + entrada.dias; d++) {
      if (d > maximo) {
        sinPago++;
        continue;
      }
      const monto = porcentaje(diario, tasaDelDia(v["om.sick-leave"], d));
      if (omani && d > diasEmpleador) fondo += monto;
      else empleador += monto;
    }
    const observaciones = [
      "يثبت المرض بشهادة طبية. للإجازة المرضية حد سنوي، ونسبة الأجر تنقص كلما طالت المدة.",
    ];
    if (omani) observaciones.push("للعماني تغطي جهة العمل أجر الأيام السبعة الأولى بكامله، ويغطي صندوق الحماية الاجتماعية باقي المدة من فرع تأمين الإجازات المرضية.");
    if (sinPago > 0) observaciones.push("بعض الأيام تتجاوز الحد السنوي للإجازة المرضية، فلا يُحسب لها أجر.");
    return {
      total: redondear(empleador + fondo),
      empleador: redondear(empleador),
      fondo: redondear(fondo),
      sinPago,
      diario: redondear(diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "الأجر المستحق عن الإجازة", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "تدفعه جهة العمل", formato: "moneda" },
    { clave: "fondo", etiqueta: "يدفعه صندوق الحماية الاجتماعية", formato: "moneda", ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "أيام بدون أجر", formato: "dias", ocultarSiCero: true },
    { clave: "diario", etiqueta: "الأجر الشامل اليومي", formato: "moneda" },
  ],
});
