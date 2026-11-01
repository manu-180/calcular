import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.vypocet-cistej-mzdy",
  mercado: "sk",
  concepto: "sueldo-neto",
  slug: "vypocet-cistej-mzdy",
  estado: "publicado",
  requiere: { ...REQUIERE_MZDY, "sk.nczd-hranica": "numero", "sk.zivotne-minimum": "numero" },
  campos: [
    { id: "hruba", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac", min: 0, porDefecto: 1800 },
    { id: "nczd", tipo: "si-no", etiqueta: "Uplatňujete nezdaniteľnú časť základu dane", ayuda: "Podpísané vyhlásenie u zamestnávateľa. Uplatniť ju možno len u jedného zamestnávateľa.", porDefecto: true },
    { id: "detiDo15", tipo: "entero", etiqueta: "Počet detí do 15 rokov s daňovým bonusom", min: 0, max: 10, porDefecto: 0 },
    { id: "deti15az18", tipo: "entero", etiqueta: "Počet detí od 15 do 18 rokov s daňovým bonusom", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hruba <= 0) throw new ErrorEntrada("Zadajte hrubú mzdu vyššiu ako nula.", "hruba");
    const p = parametreMzdy(v);
    const m = cistaMzda(e.hruba, e.detiDo15, e.deti15az18, e.nczd, p);
    const observaciones: string[] = [];
    if (e.hruba > p.maxVz) observaciones.push("Sociálne poistenie sa počíta najviac z maximálneho vymeriavacieho základu. Zdravotné poistenie strop nemá.");
    if (m.zdanitelna * 12 > v["sk.nczd-hranica"] && e.nczd) observaciones.push("Pri tejto mzde sa nezdaniteľná časť pri ročnom zúčtovaní zníži, takže ročná daň vyjde vyššia než súčet mesačných preddavkov.");
    if (e.hruba < 570) observaciones.push("Pri príjme do 570 eur môžete uplatniť odpočítateľnú položku na zdravotné poistenie a platí minimálny preddavok zamestnanca. Kalkulačka s nimi nepočíta.");
    return {
      cista: m.cista,
      socialne: m.socialne,
      zdravotne: m.zdravotne,
      zakladDane: m.zakladDane,
      dan: m.dan,
      bonus: m.bonus,
      cistaRocne: redondear(m.cista * 12),
      cena: m.cena,
      observaciones,
    };
  },
  resultado: [
    { clave: "cista", etiqueta: "Čistá mzda", formato: "moneda", destacada: true },
    { clave: "socialne", etiqueta: "Sociálne poistenie zamestnanca", formato: "moneda" },
    { clave: "zdravotne", etiqueta: "Zdravotné poistenie zamestnanca", formato: "moneda" },
    { clave: "zakladDane", etiqueta: "Základ dane za mesiac", formato: "moneda" },
    { clave: "dan", etiqueta: "Preddavok na daň", formato: "moneda" },
    { clave: "bonus", etiqueta: "Daňový bonus na deti", formato: "moneda", ocultarSiCero: true },
    { clave: "cistaRocne", etiqueta: "Čistá mzda za rok (12 mesiacov)", formato: "moneda" },
    { clave: "cena", etiqueta: "Celková cena práce pre zamestnávateľa", formato: "moneda" },
  ],
  mundo: { bruto: "hruba", periodoBruto: "mes", neto: "cista", periodoNeto: "mes", entrada: { nczd: true, detiDo15: 0, deti15az18: 0 } },
});
