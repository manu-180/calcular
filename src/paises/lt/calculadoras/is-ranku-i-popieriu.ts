import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { isBruto, isNeto } from "../lib/atlyginimas";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.is-ranku-i-popieriu",
  mercado: "lt",
  concepto: "propio",
  slug: "is-ranku-i-popieriu",
  estado: "borrador",
  requiere: {
    "lt.mma": "numero",
    "lt.vdu": "numero",
    "lt.npd-didziausias": "numero",
    "lt.npd-koeficientas": "numero",
    "lt.gpm-tarifai": "mapa",
    "lt.gpm-ribos-vdu": "mapa",
    "lt.vsd-darbuotojo": "numero",
    "lt.psd-darbuotojo": "numero",
    "lt.pensiju-kaupimas": "numero",
    "lt.vsd-lubos-vdu": "numero",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Norima suma į rankas per mėnesį", min: 0, porDefecto: 1500 },
    { id: "suKaupimu", tipo: "si-no", etiqueta: "Dalyvaujate papildomame pensijų kaupime", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const p = {
      mma: v["lt.mma"],
      vdu: v["lt.vdu"],
      npdDidziausias: v["lt.npd-didziausias"],
      npdKoeficientas: v["lt.npd-koeficientas"],
      gpmTarifai: v["lt.gpm-tarifai"],
      gpmRibosVdu: v["lt.gpm-ribos-vdu"],
      vsd: v["lt.vsd-darbuotojo"],
      psd: v["lt.psd-darbuotojo"],
      kaupimas: v["lt.pensiju-kaupimas"],
      lubosVdu: v["lt.vsd-lubos-vdu"],
    };
    if (e.neto <= 0) throw new ErrorEntrada("Įveskite sumą, didesnę už nulį.", "neto");
    const bruto = isNeto(p, e.neto, e.suKaupimu);
    const r = isBruto(p, bruto, e.suKaupimu);
    return { bruto: redondear(bruto), gpm: redondear(r.gpm), vsd: redondear(r.vsd), psd: redondear(r.psd), kaupimas: redondear(r.kaupimas) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Atlyginimas ant popieriaus", formato: "moneda", destacada: true },
    { clave: "gpm", etiqueta: "GPM", formato: "moneda" },
    { clave: "vsd", etiqueta: "VSD įmoka", formato: "moneda" },
    { clave: "psd", etiqueta: "PSD įmoka", formato: "moneda" },
    { clave: "kaupimas", etiqueta: "Papildomas pensijų kaupimas", formato: "moneda" },
  ],
});
