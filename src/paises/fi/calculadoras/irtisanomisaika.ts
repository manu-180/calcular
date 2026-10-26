import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { lisaaKuukausia, lisaaVuosia } from "../lib/paivat";

export default definirCalculadora({
  id: "fi.irtisanomisaika",
  mercado: "fi",
  concepto: "preaviso",
  slug: "irtisanomisaika",
  estado: "publicado",
  requiere: {
    "fi.irtisanomisaika-lyhin": "numero",
    "fi.irtisanomisaika-tyonantaja": "mapa",
    "fi.irtisanomisaika-tyontekija": "numero",
  },
  campos: [
    {
      id: "irtisanoja",
      tipo: "opcion",
      etiqueta: "Kuka irtisanoo",
      opciones: [
        { valor: "tyontekija", etiqueta: "Minä irtisanoudun (työntekijä)" },
        { valor: "tyonantaja", etiqueta: "Työnantaja irtisanoo" },
      ],
      porDefecto: "tyontekija",
    },
    { id: "alku", tipo: "fecha", etiqueta: "Työsuhteen alkamispäivä", min: "1960-01-01", porDefecto: "2022-03-01" },
    { id: "irtisanominen", tipo: "fecha", etiqueta: "Irtisanomispäivä", min: "1960-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.irtisanominen < e.alku) throw new ErrorEntrada("Irtisanomispäivä ei voi olla ennen työsuhteen alkua.", "irtisanominen");
    const yli = (vuotta: number) => e.irtisanominen > lisaaVuosia(e.alku, vuotta);
    let paivat = 0;
    let kuukaudet = 0;
    if (e.irtisanoja === "tyontekija") {
      if (yli(5)) kuukaudet = v["fi.irtisanomisaika-tyontekija"];
      else paivat = v["fi.irtisanomisaika-lyhin"];
    } else {
      const t = v["fi.irtisanomisaika-tyonantaja"];
      if (yli(12)) kuukaudet = enMapa(t, "yli-12");
      else if (yli(8)) kuukaudet = enMapa(t, "8-12");
      else if (yli(4)) kuukaudet = enMapa(t, "4-8");
      else if (yli(1)) kuukaudet = enMapa(t, "1-4");
      else paivat = v["fi.irtisanomisaika-lyhin"];
    }
    const paattyy = kuukaudet > 0 ? lisaaKuukausia(e.irtisanominen, kuukaudet) : sumarDias(e.irtisanominen, paivat);
    return {
      paivat: paivat || null,
      kuukaudet: kuukaudet || null,
      paattyy,
      kesto: diasEntre(e.alku, e.irtisanominen) / 365.25,
      observaciones: [
        "Irtisanomisaika alkaa irtisanomista seuraavasta päivästä. Kuukausina laskettu aika päättyy samana päivänä numeroltaan.",
        "Työsopimuksessa tai työehtosopimuksessa voidaan sopia toisenlaisesta irtisanomisajasta, enintään kuuden kuukauden pituisesta.",
      ],
    };
  },
  resultado: [
    { clave: "paivat", etiqueta: "Irtisanomisaika", formato: "dias", decimales: 0 },
    { clave: "kuukaudet", etiqueta: "Irtisanomisaika", formato: "meses", decimales: 0 },
    { clave: "paattyy", etiqueta: "Työsuhde päättyy", formato: "fecha", destacada: true },
    { clave: "kesto", etiqueta: "Työsuhteen kesto irtisanomishetkellä", formato: "anios", decimales: 1 },
  ],
});
