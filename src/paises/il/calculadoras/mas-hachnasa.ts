import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MIN, CAMPO_NEKUDOT, masChodshi, nekudotZikui, REQUIERE_MAS } from "../lib/sachar";

// Las מדרגות anuales son las mensuales por 12 (לוח העזר de רשות המסים las publica así), de modo que
// el impuesto anual es el mensual del promedio por 12.
export default definirCalculadora({
  id: "il.mas-hachnasa",
  mercado: "il",
  concepto: "impuesto-renta",
  slug: "mas-hachnasa",
  estado: "publicado",
  requiere: REQUIERE_MAS,
  campos: [
    { id: "hachnasa", tipo: "moneda", etiqueta: "הכנסה חייבת ממשכורת או מעסק", min: 0, porDefecto: 20000 },
    {
      id: "tkufa",
      tipo: "opcion",
      etiqueta: "התקופה של ההכנסה",
      opciones: [
        { valor: "chodshi", etiqueta: "לחודש" },
        { valor: "shnati", etiqueta: "לשנה" },
      ],
      porDefecto: "chodshi",
    },
    CAMPO_MIN,
    CAMPO_NEKUDOT,
  ],
  calcular(e, v, { redondear }) {
    if (e.hachnasa <= 0) throw new ErrorEntrada("הזינו את ההכנסה.", "hachnasa");
    const meses = e.tkufa === "shnati" ? 12 : 1;
    const nekudot = nekudotZikui(v, e.min, e.nekudotNosafot);
    const m = masChodshi(e.hachnasa / meses, nekudot, 0, v, null);
    const mas = redondear(m.mas * meses);
    return {
      mas,
      lifneiZikui: redondear(m.lifneiZikui * meses),
      zikui: redondear(Math.min(m.lifneiZikui, m.zikuiNekudot) * meses),
      masYasaf: redondear(m.masYasaf * meses),
      shiurShuli: m.shiurShuli,
      shiurEfektivi: (mas / e.hachnasa) * 100,
      acharei: redondear(e.hachnasa - mas),
      nekudot,
      observaciones: ["החישוב לא כולל זיכויים בעד הפקדות לפנסיה, תרומות או הטבות יישוב, ולא את ביטוח לאומי ומס בריאות."],
    };
  },
  resultado: [
    { clave: "mas", etiqueta: "מס הכנסה לתשלום", formato: "moneda", destacada: true },
    { clave: "lifneiZikui", etiqueta: "מס לפי המדרגות, לפני זיכויים", formato: "moneda" },
    { clave: "zikui", etiqueta: "הפחתה בזכות נקודות הזיכוי", formato: "moneda" },
    { clave: "masYasaf", etiqueta: "מס נוסף על הכנסה גבוהה", formato: "moneda", ocultarSiCero: true },
    { clave: "nekudot", etiqueta: "נקודות זיכוי", formato: "numero", decimales: 2 },
    { clave: "shiurShuli", etiqueta: "שיעור המס השולי", formato: "porcentaje" },
    { clave: "shiurEfektivi", etiqueta: "שיעור המס האפקטיבי", formato: "porcentaje", decimales: 1 },
    { clave: "acharei", etiqueta: "ההכנסה אחרי מס הכנסה", formato: "moneda" },
  ],
});
