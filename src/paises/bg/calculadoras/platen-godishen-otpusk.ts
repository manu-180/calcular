import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.platen-godishen-otpusk",
  mercado: "bg",
  concepto: "vacaciones",
  slug: "platen-godishen-otpusk",
  estado: "publicado",
  requiere: { "bg.otpusk-osnoven": "numero", "bg.otpusk-min-mesetsi": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Начислено брутно възнаграждение за последния месец с поне 10 отработени дни", min: 0, porDefecto: 1500 },
    { id: "rabotniDni", tipo: "entero", etiqueta: "Работни дни в този месец", min: 10, max: 23, porDefecto: 21 },
    { id: "dniOtpusk", tipo: "entero", etiqueta: "Дни платен отпуск", min: 0, max: 365, porDefecto: 10 },
    { id: "dopalnitelni", tipo: "entero", etiqueta: "Допълнителни дни отпуск за година (ако има)", min: 0, max: 60, porDefecto: 0, ayuda: "Например за ненормиран работен ден или по договор." },
    { id: "mesetsi", tipo: "entero", etiqueta: "Месеци трудов стаж през годината", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете възнаграждение над нула.", "bruto");
    if (e.rabotniDni <= 0) throw new ErrorEntrada("Въведете поне един работен ден.", "rabotniDni");
    const sreden = e.bruto / e.rabotniDni;
    const godishno = v["bg.otpusk-osnoven"] + e.dopalnitelni;
    const polagashti = redondear((godishno * e.mesetsi) / 12);
    const observaciones: string[] = [];
    if (e.mesetsi < v["bg.otpusk-min-mesetsi"]) observaciones.push("При постъпване на работа за първи път отпуск се ползва след 4 месеца стаж. При прекратяване преди това се дължи обезщетение за неползвания отпуск.");
    return { zaplashtane: redondear(sreden * e.dniOtpusk), sredenDen: redondear(sreden), polagashti, godishno, observaciones };
  },
  resultado: [
    { clave: "zaplashtane", etiqueta: "Заплащане за отпуска (бруто)", formato: "moneda", destacada: true },
    { clave: "sredenDen", etiqueta: "Среднодневно брутно възнаграждение", formato: "moneda" },
    { clave: "polagashti", etiqueta: "Полагащ се отпуск за периода", formato: "dias", decimales: 2 },
    { clave: "godishno", etiqueta: "Отпуск за цяла година", formato: "dias" },
  ],
});
