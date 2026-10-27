import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RENTA, REQ_SSO, rentaSueldo, ssoMensual, type ValoresRenta, type ValoresSso } from "../lib/renta";

const familia = { conyuge: false, hijos: 0, hijosDesde2561: 0, padres: 0 };

function netoDe(bruto: number, conSso: boolean, otras: number, v: ValoresRenta & ValoresSso, redondear: (x: number) => number) {
  const sso = conSso ? redondear(ssoMensual(bruto, v).persona) : 0;
  const impuesto = redondear(rentaSueldo(bruto * 12, sso * 12, { ...familia, otras }, v).impuesto);
  return { sso, impuesto, neto: bruto - sso - impuesto / 12 };
}

export default definirCalculadora({
  id: "th.net-to-gross",
  mercado: "th",
  concepto: "propio",
  slug: "net-to-gross",
  estado: "publicado",
  requiere: { ...REQ_RENTA, ...REQ_SSO },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "เงินเดือนสุทธิที่ต้องการต่อเดือน", min: 0, porDefecto: 30000 },
    { id: "sso", tipo: "si-no", etiqueta: "หักประกันสังคมมาตรา 33", porDefecto: true },
    { id: "otras", tipo: "moneda", etiqueta: "ค่าลดหย่อนอื่นทั้งปี (นอกจากส่วนตัวและประกันสังคม)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("กรุณากรอกเงินเดือนสุทธิที่ต้องการ", "neto");
    // El neto crece con el bruto: se busca por bisección el bruto que deja el neto pedido.
    let bajo = e.neto;
    let alto = e.neto * 2 + 100000;
    for (let i = 0; i < 80; i++) {
      const medio = (bajo + alto) / 2;
      if (netoDe(medio, e.sso, e.otras, v, redondear).neto < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const r = netoDe(bruto, e.sso, e.otras, v, redondear);
    const empleador = e.sso ? redondear(ssoMensual(bruto, v).empleador) : 0;
    return {
      bruto,
      sso: r.sso,
      impuestoMes: redondear(r.impuesto / 12),
      netoResultante: redondear(r.neto),
      costo: redondear(bruto + empleador),
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "เงินเดือนก่อนหักที่ต้องได้", formato: "moneda", destacada: true },
    { clave: "sso", etiqueta: "เงินสมทบประกันสังคมต่อเดือน", formato: "moneda", ocultarSiCero: true },
    { clave: "impuestoMes", etiqueta: "ภาษีเงินได้เฉลี่ยต่อเดือน", formato: "moneda" },
    { clave: "netoResultante", etiqueta: "เงินเดือนสุทธิที่ได้", formato: "moneda" },
    { clave: "costo", etiqueta: "ต้นทุนนายจ้างต่อเดือน", formato: "moneda" },
  ],
});
