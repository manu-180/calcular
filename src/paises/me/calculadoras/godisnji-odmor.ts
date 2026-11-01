import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.godisnji-odmor",
  mercado: "me",
  concepto: "vacaciones",
  slug: "godisnji-odmor",
  estado: "publicado",
  requiere: { "me.odmor-najmanje": "numero", "me.odmor-sest-dana": "numero", "me.odmor-skraceno": "numero" },
  campos: [
    {
      id: "sedmica",
      tipo: "opcion",
      etiqueta: "Radna sedmica",
      opciones: [
        { valor: "pet", etiqueta: "Pet radnih dana" },
        { valor: "sest", etiqueta: "Šest radnih dana" },
        { valor: "skraceno", etiqueta: "Skraćeno radno vrijeme" },
      ],
      porDefecto: "pet",
    },
    { id: "ugovoreno", tipo: "entero", etiqueta: "Dana odmora po ugovoru ili kolektivnom ugovoru", ayuda: "Nije obavezno. Ako ne unesete, uzima se zakonski minimum.", min: 1, max: 60, requerido: false },
    { id: "mjeseci", tipo: "entero", etiqueta: "Započetih mjeseci rada u ovoj godini", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v) {
    const minimum = e.sedmica === "sest" ? v["me.odmor-sest-dana"] : e.sedmica === "skraceno" ? v["me.odmor-skraceno"] : v["me.odmor-najmanje"];
    const godisnje = e.ugovoreno ?? minimum;
    if (godisnje < minimum) throw new ErrorEntrada(`Ugovor ne može dati manje od zakonskog minimuma: ${minimum} dana.`, "ugovoreno");
    return { dana: e.mjeseci === 12 ? godisnje : Math.round((godisnje * e.mjeseci) / 12), godisnje, minimum, poMjesecu: godisnje / 12 };
  },
  resultado: [
    { clave: "dana", etiqueta: "Dana odmora za ovu godinu", formato: "dias", destacada: true },
    { clave: "godisnje", etiqueta: "Za punu godinu", formato: "dias" },
    { clave: "minimum", etiqueta: "Zakonski minimum", formato: "dias" },
    { clave: "poMjesecu", etiqueta: "Za svaki započeti mjesec", formato: "dias", decimales: 2 },
  ],
});
