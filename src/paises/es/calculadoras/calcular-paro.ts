import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

function topePorHijos(mapa: Readonly<Record<string, number>>, hijos: "sin-hijos" | "un-hijo" | "dos-o-mas", esMinimo: boolean): number {
  if (esMinimo) return hijos === "sin-hijos" ? mapa["sin-hijos"] : mapa["con-hijos"];
  return mapa[hijos];
}

export default definirCalculadora({
  id: "es.paro",
  mercado: "es",
  concepto: "propio",
  slug: "calcular-paro",
  estado: "publicado",
  requiere: {
    "es.paro-duracion": "mapa",
    "es.paro-porcentajes": "mapa",
    "es.paro-cuantia-minima": "mapa",
    "es.paro-cuantia-maxima": "mapa",
  },
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Base de cotización por desempleo de los últimos 6 meses (media mensual)",
      min: 0,
      porDefecto: 1800,
      ayuda: "Aparece en tus nóminas como base de desempleo o de contingencias profesionales. Sin horas extra.",
    },
    { id: "dias", tipo: "entero", etiqueta: "Días cotizados en los últimos 6 años", min: 0, porDefecto: 1080, ayuda: "Sin contar los que ya usaste para cobrar un paro anterior." },
    {
      id: "hijos",
      tipo: "opcion",
      etiqueta: "Hijos a tu cargo",
      opciones: [
        { valor: "sin-hijos", etiqueta: "Ninguno" },
        { valor: "un-hijo", etiqueta: "Uno" },
        { valor: "dos-o-mas", etiqueta: "Dos o más" },
      ],
      porDefecto: "sin-hijos",
    },
    { id: "jornada", tipo: "porcentaje", etiqueta: "Porcentaje de jornada de tu último trabajo", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const escala = Object.entries(valores["es.paro-duracion"])
      .map(([desde, dias]) => [Number(desde), dias] as const)
      .sort((a, b) => a[0] - b[0]);
    const minimoDias = escala[0][0];
    if (entrada.dias < minimoDias) throw new ErrorEntrada(`Para cobrar el paro necesitas al menos ${minimoDias} días cotizados en los últimos seis años.`, "dias");
    let duracion = 0;
    for (const [desde, dias] of escala) if (entrada.dias >= desde) duracion = dias;

    const p = valores["es.paro-porcentajes"];
    const factor = entrada.jornada / 100;
    const minimo = topePorHijos(valores["es.paro-cuantia-minima"], entrada.hijos, true) * factor;
    const maximo = topePorHijos(valores["es.paro-cuantia-maxima"], entrada.hijos, false) * factor;
    const limitar = (x: number) => redondear(Math.min(Math.max(x, minimo), maximo));
    const primeros = limitar(porcentaje(entrada.base, p["primeros-180"]));
    const despues = duracion > 180 ? limitar(porcentaje(entrada.base, p["desde-181"])) : null;
    const total = redondear((primeros * Math.min(duracion, 180)) / 30 + ((despues ?? 0) * Math.max(0, duracion - 180)) / 30);
    return {
      duracion,
      meses: duracion / 30,
      primeros,
      despues,
      total,
      observaciones: ["Son importes brutos. El SEPE descuenta la parte de la cotización a la Seguridad Social que te corresponde y, si toca, la retención de IRPF."],
    };
  },
  resultado: [
    { clave: "primeros", etiqueta: "Paro al mes los primeros 6 meses", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Paro al mes desde el día 181", formato: "moneda" },
    { clave: "duracion", etiqueta: "Duración del paro", formato: "dias" },
    { clave: "meses", etiqueta: "Duración en meses", formato: "meses" },
    { clave: "total", etiqueta: "Total bruto que cobrarías", formato: "moneda" },
  ],
});
