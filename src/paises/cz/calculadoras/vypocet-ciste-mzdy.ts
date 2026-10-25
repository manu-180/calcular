import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametryMzdy, REQUIERE_MZDA } from "../lib/parametry";

export default definirCalculadora({
  id: "cz.vypocet-ciste-mzdy",
  mercado: "cz",
  concepto: "sueldo-neto",
  slug: "vypocet-ciste-mzdy",
  estado: "publicado",
  requiere: { ...REQUIERE_MZDA, "cz.max-vymerovaci-zaklad": "numero" },
  campos: [
    { id: "hruba", tipo: "moneda", etiqueta: "Hrubá mzda za měsíc", min: 0, porDefecto: 45000 },
    {
      id: "prohlaseni",
      tipo: "si-no",
      etiqueta: "Podepsané prohlášení poplatníka u zaměstnavatele",
      ayuda: "Bez prohlášení vám zaměstnavatel neodečte slevu na poplatníka ani zvýhodnění na děti.",
      porDefecto: true,
    },
    { id: "deti", tipo: "entero", etiqueta: "Počet vyživovaných dětí, na které uplatňujete zvýhodnění", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hruba <= 0) throw new ErrorEntrada("Zadejte hrubou mzdu vyšší než nula.", "hruba");
    const p = parametryMzdy(v);
    const m = cistaMzda(e.hruba, e.prohlaseni, e.deti, p);
    const observaciones: string[] = [];
    if (m.zakladZalohy > 3 * p.prumernaMzda) {
      observaciones.push("Z části mzdy nad trojnásobkem průměrné mzdy se platí záloha na daň 23 % místo 15 %.");
    }
    if (e.hruba * 12 > v["cz.max-vymerovaci-zaklad"]) {
      observaciones.push("Při této mzdě během roku dosáhnete maximálního vyměřovacího základu. Od toho měsíce se sociální pojištění přestane strhávat a čistá mzda vzroste.");
    }
    if (e.hruba < p.minimalniMzda) {
      observaciones.push("Mzda je nižší než minimální mzda. U plného úvazku se zdravotní pojištění odvádí aspoň z minimální mzdy, rozdíl doplácí zaměstnanec.");
    }
    if (e.deti > 0 && !e.prohlaseni) observaciones.push("Zvýhodnění na děti můžete uplatnit jen u zaměstnavatele, u kterého jste podepsali prohlášení.");
    if (e.deti > 0 && e.prohlaseni && m.bonus === 0 && m.slevaDeti < 1 && e.hruba < Math.floor(p.minimalniMzda / 2)) {
      observaciones.push("Daňový bonus se vyplácí, jen když mzda za měsíc dosáhne aspoň poloviny minimální mzdy.");
    }
    return {
      cista: redondear(m.cista),
      socialni: m.socialni,
      zdravotni: m.zdravotni,
      zalohaPredSlevou: m.zalohaPredSlevou,
      slevaPoplatnik: redondear(m.slevaPoplatnik),
      slevaDeti: redondear(m.slevaDeti),
      bonus: m.bonus > 0 ? redondear(m.bonus) : null,
      dan: redondear(m.dan),
      nakladyZamestnavatele: redondear(e.hruba + m.socialniZamestnavatel + m.zdravotniZamestnavatel),
      cistaRocne: redondear(m.cista * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "cista", etiqueta: "Čistá mzda", formato: "moneda", destacada: true },
    { clave: "socialni", etiqueta: "Sociální pojištění zaměstnance", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Zdravotní pojištění zaměstnance", formato: "moneda" },
    { clave: "zalohaPredSlevou", etiqueta: "Záloha na daň před slevami", formato: "moneda" },
    { clave: "slevaPoplatnik", etiqueta: "Sleva na poplatníka", formato: "moneda", ocultarSiCero: true },
    { clave: "slevaDeti", etiqueta: "Sleva na děti", formato: "moneda", ocultarSiCero: true },
    { clave: "bonus", etiqueta: "Daňový bonus na děti", formato: "moneda" },
    { clave: "dan", etiqueta: "Záloha na daň po slevách", formato: "moneda" },
    { clave: "cistaRocne", etiqueta: "Čistá mzda za rok (12 měsíců)", formato: "moneda" },
    { clave: "nakladyZamestnavatele", etiqueta: "Celkové náklady zaměstnavatele", formato: "moneda" },
  ],
  mundo: { bruto: "hruba", periodoBruto: "mes", neto: "cista", periodoNeto: "mes", entrada: { prohlaseni: true, deti: 0 } },
});
