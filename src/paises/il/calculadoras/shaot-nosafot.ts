import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Artículo 16(א) del חוק שעות עבודה ומנוחה: las dos primeras horas extra de cada día a no menos
// de 1¼ del sueldo regular y las siguientes a no menos de 1½. La cuenta es por día.
export default definirCalculadora({
  id: "il.shaot-nosafot",
  mercado: "il",
  concepto: "horas-extra",
  slug: "shaot-nosafot",
  estado: "publicado",
  requiere: { "il.shaot-nosafot": "mapa" },
  campos: [
    { id: "sacharShaa", tipo: "moneda", etiqueta: "השכר הרגיל לשעה", min: 0, porDefecto: 50 },
    { id: "shaotBeyom", tipo: "numero", etiqueta: "שעות נוספות ביום", ayuda: "השעות שמעבר ליום העבודה הרגיל שלכם.", min: 0, max: 12, porDefecto: 3 },
    { id: "yamim", tipo: "entero", etiqueta: "מספר הימים עם שעות נוספות", min: 1, max: 31, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sacharShaa <= 0) throw new ErrorEntrada("הזינו את השכר לשעה.", "sacharShaa");
    if (e.shaotBeyom <= 0) throw new ErrorEntrada("הזינו כמה שעות נוספות עבדתם ביום.", "shaotBeyom");
    const m = v["il.shaot-nosafot"];
    const rishonot = Math.min(2, e.shaotBeyom) * e.yamim;
    const nosafot = Math.max(0, e.shaotBeyom - 2) * e.yamim;
    const tashlum125 = redondear(porcentaje(e.sacharShaa, enMapa(m, "rishonot")) * rishonot);
    const tashlum150 = redondear(porcentaje(e.sacharShaa, enMapa(m, "nosafot")) * nosafot);
    const tashlum = redondear(tashlum125 + tashlum150);
    return {
      tashlum,
      tashlum125,
      tashlum150,
      shaot125: rishonot,
      shaot150: nosafot,
      tosefet: redondear(tashlum - e.sacharShaa * (rishonot + nosafot)),
      observaciones: ["השכר הרגיל כולל את כל התוספות שהמעסיק משלם, והוא לא יכול להיות נמוך משכר המינימום לשעה."],
    };
  },
  resultado: [
    { clave: "tashlum", etiqueta: "תשלום על השעות הנוספות", formato: "moneda", destacada: true },
    { clave: "shaot125", etiqueta: "שעתיים ראשונות ביום (סך השעות)", formato: "horas" },
    { clave: "tashlum125", etiqueta: "תשלום על השעתיים הראשונות", formato: "moneda" },
    { clave: "shaot150", etiqueta: "מהשעה השלישית ביום (סך השעות)", formato: "horas", ocultarSiCero: true },
    { clave: "tashlum150", etiqueta: "תשלום מהשעה השלישית", formato: "moneda", ocultarSiCero: true },
    { clave: "tosefet", etiqueta: "התוספת מעבר לשכר הרגיל", formato: "moneda" },
  ],
});
