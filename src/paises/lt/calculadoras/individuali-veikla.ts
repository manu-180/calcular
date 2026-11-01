import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.individuali-veikla",
  mercado: "lt",
  concepto: "retencion-honorarios",
  slug: "individuali-veikla",
  estado: "borrador",
  requiere: {
    "lt.iv-gpm-tarifai": "mapa",
    "lt.iv-gpm-ribos": "mapa",
    "lt.iv-sanaudu-norma": "numero",
    "lt.iv-bazes-dalis": "numero",
    "lt.iv-vsd": "numero",
    "lt.iv-psd": "numero",
  },
  campos: [
    { id: "pajamos", tipo: "moneda", etiqueta: "Metinės pajamos", min: 0, porDefecto: 25000 },
    { id: "faktines", tipo: "moneda", etiqueta: "Faktinės sąnaudos (palikite tuščią, jei taikote normą)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    const sanaudos = e.faktines ?? porcentaje(e.pajamos, v["lt.iv-sanaudu-norma"]);
    const pelnas = Math.max(0, e.pajamos - sanaudos);
    const { mazesnis, didesnis } = v["lt.iv-gpm-tarifai"];
    const { apatine, virsutine } = v["lt.iv-gpm-ribos"];
    const dalis = Math.min(1, Math.max(0, (pelnas - apatine) / (virsutine - apatine)));
    const gpm = redondear(porcentaje(pelnas, mazesnis + (didesnis - mazesnis) * dalis));
    const baze = porcentaje(pelnas, v["lt.iv-bazes-dalis"]);
    const vsd = redondear(porcentaje(baze, v["lt.iv-vsd"]));
    const psd = redondear(porcentaje(baze, v["lt.iv-psd"]));
    return { lieka: redondear(pelnas - gpm - vsd - psd), pelnas: redondear(pelnas), gpm, vsd, psd };
  },
  resultado: [
    { clave: "lieka", etiqueta: "Lieka po mokesčių per metus", formato: "moneda", destacada: true },
    { clave: "pelnas", etiqueta: "Apmokestinamasis pelnas", formato: "moneda" },
    { clave: "gpm", etiqueta: "GPM", formato: "moneda" },
    { clave: "vsd", etiqueta: "VSD įmoka", formato: "moneda" },
    { clave: "psd", etiqueta: "PSD įmoka", formato: "moneda" },
  ],
});
