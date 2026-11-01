import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ge.gaprtkhilebis-vada",
  mercado: "ge",
  concepto: "preaviso",
  slug: "gaprtkhilebis-vada",
  estado: "publicado",
  requiere: {
    "ge.gaprtkhileba-30": "numero",
    "ge.gaprtkhileba-3": "numero",
    "ge.kompensatsia-30": "numero",
    "ge.kompensatsia-3": "numero",
  },
  campos: [
    {
      id: "vin",
      tipo: "opcion",
      etiqueta: "ვინ წყვეტს ხელშეკრულებას",
      opciones: [
        { valor: "damsaqmebeli-30", etiqueta: "დამსაქმებელი, კომპენსაციით 1 თვე" },
        { valor: "damsaqmebeli-3", etiqueta: "დამსაქმებელი, კომპენსაციით 2 თვე" },
        { valor: "dasaqmebuli", etiqueta: "დასაქმებული, საკუთარი ინიციატივით" },
      ],
      porDefecto: "damsaqmebeli-30",
    },
    { id: "tarighi", tipo: "fecha", etiqueta: "შეტყობინების თარიღი", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    const dghe = e.vin === "damsaqmebeli-3" ? v["ge.gaprtkhileba-3"] : v["ge.gaprtkhileba-30"];
    const kompensatsia = e.vin === "dasaqmebuli" ? 0 : e.vin === "damsaqmebeli-3" ? v["ge.kompensatsia-3"] : v["ge.kompensatsia-30"];
    return { dghe, adreuli: sumarDias(e.tarighi, dghe), kompensatsia };
  },
  resultado: [
    { clave: "dghe", etiqueta: "გაფრთხილების ვადა არანაკლებ", formato: "dias", destacada: true },
    { clave: "adreuli", etiqueta: "ხელშეკრულების შეწყვეტის ყველაზე ადრეული თარიღი", formato: "fecha" },
    { clave: "kompensatsia", etiqueta: "კომპენსაცია არანაკლებ", formato: "meses", ocultarSiCero: true },
  ],
});
