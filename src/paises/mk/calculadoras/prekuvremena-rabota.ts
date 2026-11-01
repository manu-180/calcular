import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.prekuvremena-rabota",
  mercado: "mk",
  concepto: "horas-extra",
  slug: "prekuvremena-rabota",
  estado: "publicado",
  requiere: { "mk.dodatoci-javen": "mapa", "mk.prekuvremena-limiti": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Основна месечна бруто-плата", min: 0, porDefecto: 60000 },
    { id: "chasoviMesec", tipo: "numero", etiqueta: "Работни часови во месецот", min: 1, max: 300, porDefecto: 168 },
    { id: "chasovi", tipo: "numero", etiqueta: "Прекувремени часови", min: 0, max: 300, porDefecto: 10 },
    { id: "vid", tipo: "opcion-dato", etiqueta: "Вид на додаток во јавниот сектор", dato: "mk.dodatoci-javen", porDefecto: "prekuvremena" },
    { id: "sektor", tipo: "opcion", etiqueta: "Сектор", porDefecto: "javen", opciones: [{ valor: "javen", etiqueta: "Јавен сектор" }, { valor: "drug", etiqueta: "Приватен сектор или друг договор" }] },
    { id: "drugProcent", tipo: "porcentaje", etiqueta: "Додаток од вашиот колективен договор", min: 0, max: 300, porDefecto: 0, visibleSi: { sektor: ["drug"] } },
    { id: "godishno", tipo: "numero", etiqueta: "Прекувремени часови досега оваа година (не е задолжително)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Внесете бруто-плата поголема од нула.", "bruto");
    const procent = e.sektor === "javen" ? enMapa(v["mk.dodatoci-javen"], e.vid) : e.drugProcent ?? 0;
    const chas = e.bruto / e.chasoviMesec;
    const osnova = chas * e.chasovi;
    const dodatok = porcentaje(osnova, procent);
    const l = v["mk.prekuvremena-limiti"];
    const observaciones: string[] = [];
    if (e.godishno !== null) {
      const vkupno = e.godishno + e.chasovi;
      if (vkupno > enMapa(l, "godishno")) observaciones.push("Законот дозволува најмногу 190 прекувремени часови годишно, освен за посебни работи.");
      else if (vkupno > enMapa(l, "bonus-od")) observaciones.push("Над 150 часа годишно и со најмногу 21 ден отсуство, работодавачот должи и бонус од една просечна плата во Републиката.");
    }
    return {
      vkupno: redondear(osnova + dodatok),
      chas: redondear(chas),
      osnova: redondear(osnova),
      dodatok: redondear(dodatok),
      procent,
      observaciones,
    };
  },
  resultado: [
    { clave: "vkupno", etiqueta: "Бруто за овие часови", formato: "moneda", destacada: true },
    { clave: "osnova", etiqueta: "Основна плата за часовите", formato: "moneda" },
    { clave: "dodatok", etiqueta: "Додаток", formato: "moneda" },
    { clave: "chas", etiqueta: "Бруто по час", formato: "moneda" },
    { clave: "procent", etiqueta: "Применет процент", formato: "porcentaje" },
  ],
});
