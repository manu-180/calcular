import { definirCalculadora } from "@/motor/calculo";
import { CAMPOS_SP_LSP, pagoSpLsp } from "../lib/indemnizacion";

export default definirCalculadora({
  id: "hk.long-service-payment",
  mercado: "hk",
  concepto: "propio",
  slug: "long-service-payment",
  estado: "publicado",
  requiere: {
    "hk.sp-lsp-wage-cap": "numero",
    "hk.sp-lsp-maximum": "numero",
  },
  campos: [...CAMPOS_SP_LSP],
  calcular(entrada, v, { redondear }) {
    const r = pagoSpLsp(entrada, { salarioTope: v["hk.sp-lsp-wage-cap"], maximo: v["hk.sp-lsp-maximum"] }, redondear);
    const observaciones: string[] = [];
    if (r.anios < 5) {
      observaciones.push("Long service payment needs at least 5 years on a continuous contract, so you're not eligible yet.");
      return { aPagar: 0, bruto: 0, antes: 0, despues: 0, compensado: 0, mpfRetenido: entrada.mpfEmpleador, observaciones };
    }
    observaciones.push(
      "It's payable if you're dismissed (not for redundancy or serious misconduct), a fixed-term contract ends without renewal, you resign on health grounds or at 65 or over, or you die in service.",
    );
    if (r.topado) observaciones.push("The total reaches the legal maximum, so the excess comes off the part for service from 1 May 2025.");
    if (r.mpfRetenido > 0) observaciones.push("The MPF benefits that weren't used to offset stay in your MPF account.");
    return { aPagar: r.aPagar, bruto: r.bruto, antes: r.antes, despues: r.despues, compensado: r.compensado, mpfRetenido: r.mpfRetenido, observaciones };
  },
  resultado: [
    { clave: "aPagar", etiqueta: "Long service payment your employer pays", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Long service payment before offsetting", formato: "moneda" },
    { clave: "antes", etiqueta: "Part for service before 1 May 2025", formato: "moneda", ocultarSiCero: true },
    { clave: "despues", etiqueta: "Part for service from 1 May 2025", formato: "moneda", ocultarSiCero: true },
    { clave: "compensado", etiqueta: "Offset with MPF benefits or gratuities", formato: "moneda", ocultarSiCero: true },
    { clave: "mpfRetenido", etiqueta: "Employer-funded MPF benefits you keep", formato: "moneda", ocultarSiCero: true },
  ],
});
