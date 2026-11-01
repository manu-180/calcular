import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "bg.predizvestie-pri-napuskane",
  mercado: "bg",
  concepto: "preaviso",
  slug: "predizvestie-pri-napuskane",
  estado: "publicado",
  requiere: { "bg.predizvestie-bezsrochen": "numero", "bg.predizvestie-srochen": "numero", "bg.predizvestie-maks": "numero" },
  campos: [
    {
      id: "vid",
      tipo: "opcion",
      etiqueta: "Вид договор",
      opciones: [
        { valor: "bezsrochen", etiqueta: "Безсрочен" },
        { valor: "srochen", etiqueta: "Срочен" },
      ],
      porDefecto: "bezsrochen",
    },
    { id: "uslovno", tipo: "entero", etiqueta: "Уговорени дни предизвестие (ако са повече)", min: 0, max: 92, requerido: false, visibleSi: { vid: ["bezsrochen"] } },
    { id: "ostatak", tipo: "entero", etiqueta: "Оставащи дни до края на договора", min: 1, max: 3650, porDefecto: 180, visibleSi: { vid: ["srochen"] } },
    { id: "data", tipo: "fecha", etiqueta: "Дата на връчване на предизвестието", porDefecto: "hoy" },
    { id: "bruto", tipo: "moneda", etiqueta: "Брутна месечна заплата", min: 0, porDefecto: 1500 },
    { id: "nespazeni", tipo: "entero", etiqueta: "Неспазени дни от срока", min: 0, max: 92, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете брутна заплата над нула.", "bruto");
    const tri = v["bg.predizvestie-srochen"] * 30;
    let dni: number;
    if (e.vid === "srochen") {
      dni = Math.min(tri, e.ostatak ?? tri);
    } else {
      const uslovno = e.uslovno ?? 0;
      if (uslovno > v["bg.predizvestie-maks"] * 31) throw new ErrorEntrada("Уговореният срок е най-много 3 месеца.", "uslovno");
      dni = Math.max(v["bg.predizvestie-bezsrochen"], uslovno);
    }
    if (e.nespazeni > dni) throw new ErrorEntrada("Неспазените дни не могат да са повече от срока.", "nespazeni");
    return {
      dni,
      krayna: sumarDias(e.data, dni),
      obezshtenie: redondear((e.bruto * e.nespazeni) / 30),
    };
  },
  resultado: [
    { clave: "dni", etiqueta: "Срок на предизвестието", formato: "dias", destacada: true },
    { clave: "krayna", etiqueta: "Последен ден", formato: "fecha" },
    { clave: "obezshtenie", etiqueta: "Обезщетение за неспазените дни", formato: "moneda", ocultarSiCero: true },
  ],
});
