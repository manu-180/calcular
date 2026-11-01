import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.celkova-cena-prace",
  mercado: "sk",
  concepto: "costo-empleador",
  slug: "celkova-cena-prace",
  estado: "publicado",
  requiere: { ...REQUIERE_MZDY, "sk.minimalna-mzda": "numero" },
  campos: [{ id: "hruba", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac", min: 0, porDefecto: 1800 }],
  calcular(e, v, { redondear }) {
    if (e.hruba <= 0) throw new ErrorEntrada("Zadajte hrubú mzdu vyššiu ako nula.", "hruba");
    const m = cistaMzda(e.hruba, 0, 0, true, parametreMzdy(v));
    return { cena: m.cena, socialneFirma: m.socialneFirma, zdravotneFirma: m.zdravotneFirma, rocne: redondear(m.cena * 12), cista: m.cista };
  },
  resultado: [
    { clave: "cena", etiqueta: "Celková cena práce za mesiac", formato: "moneda", destacada: true },
    { clave: "socialneFirma", etiqueta: "Sociálne poistenie zamestnávateľa", formato: "moneda" },
    { clave: "zdravotneFirma", etiqueta: "Zdravotné poistenie zamestnávateľa", formato: "moneda" },
    { clave: "rocne", etiqueta: "Cena práce za rok (12 mesiacov)", formato: "moneda" },
    { clave: "cista", etiqueta: "Čistá mzda zamestnanca bez detí", formato: "moneda" },
  ],
});
