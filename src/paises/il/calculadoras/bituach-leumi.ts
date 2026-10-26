import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { bituachChodshi, REQUIERE_BL } from "../lib/sachar";

export default definirCalculadora({
  id: "il.bituach-leumi",
  mercado: "il",
  concepto: "aportes-seguridad-social",
  slug: "bituach-leumi",
  estado: "publicado",
  requiere: { ...REQUIERE_BL, "il.bl-maasik": "mapa" },
  campos: [{ id: "sachar", tipo: "moneda", etiqueta: "שכר ברוטו חודשי", min: 0, porDefecto: 12000 }],
  calcular(e, v, { redondear }) {
    if (e.sachar <= 0) throw new ErrorEntrada("הזינו את השכר החודשי.", "sachar");
    const b = bituachChodshi(e.sachar, v);
    const mufchat = Math.min(b.basis, b.tikraMufchat);
    const male = b.basis - mufchat;
    const m = v["il.bl-maasik"];
    const bituachLeumi = redondear(b.bituachLeumi);
    const masBriut = redondear(b.masBriut);
    const total = redondear(bituachLeumi + masBriut);
    const observaciones: string[] = [];
    if (e.sachar > b.basis) observaciones.push("על השכר שמעל ההכנסה המרבית לא משלמים דמי ביטוח לאומי ומס בריאות.");
    return {
      total,
      bituachLeumi,
      masBriut,
      maasik: redondear(porcentaje(mufchat, enMapa(m, "mufchat")) + porcentaje(male, enMapa(m, "male"))),
      shiur: (total / e.sachar) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "סך הניכוי מהעובד", formato: "moneda", destacada: true },
    { clave: "bituachLeumi", etiqueta: "דמי ביטוח לאומי", formato: "moneda" },
    { clave: "masBriut", etiqueta: "דמי ביטוח בריאות (מס בריאות)", formato: "moneda" },
    { clave: "shiur", etiqueta: "אחוז מהשכר", formato: "porcentaje", decimales: 2 },
    { clave: "maasik", etiqueta: "דמי ביטוח לאומי שמשלם המעסיק", formato: "moneda" },
  ],
});
