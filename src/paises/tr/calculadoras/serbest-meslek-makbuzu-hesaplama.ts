import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.serbest-meslek-makbuzu-hesaplama",
  mercado: "tr",
  concepto: "retencion-honorarios",
  slug: "serbest-meslek-makbuzu-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.gvk94": "mapa",
    "tr.kdv": "mapa",
  },
  campos: [
    { id: "tutar", tipo: "moneda", etiqueta: "Tutar", min: 0, porDefecto: 10000 },
    {
      id: "yon",
      tipo: "opcion",
      etiqueta: "Girdiğiniz tutar",
      opciones: [
        { valor: "brut", etiqueta: "Brüt ücret (stopaj öncesi)" },
        { valor: "net", etiqueta: "Net ücret (elinize geçecek, KDV hariç)" },
      ],
      porDefecto: "brut",
    },
    { id: "stopajVar", tipo: "si-no", etiqueta: "Ödeyen gelir vergisi kesintisi (stopaj) yapacak", porDefecto: true, ayuda: "Ödemeyi yapan vergi kesintisi yapmakla yükümlüyse (örneğin bir şirket) işaretli bırakın." },
    { id: "kdvVar", tipo: "si-no", etiqueta: "Makbuzda KDV gösterilecek", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tutar <= 0) throw new ErrorEntrada("Tutarı girin.", "tutar");
    const stopajOrani = entrada.stopajVar ? enMapa(valores["tr.gvk94"], "serbest-meslek") : 0;
    const kdvOrani = entrada.kdvVar ? enMapa(valores["tr.kdv"], "genel") : 0;
    const brut = entrada.yon === "brut" ? entrada.tutar : redondear(entrada.tutar / (1 - stopajOrani / 100));
    const stopaj = redondear(porcentaje(brut, stopajOrani));
    const net = redondear(brut - stopaj);
    const kdv = redondear(porcentaje(brut, kdvOrani));
    return {
      tahsil: redondear(net + kdv),
      brut,
      stopaj,
      net,
      kdv,
      stopajOrani,
      kdvOrani,
      odeyenToplam: redondear(brut + kdv),
    };
  },
  resultado: [
    { clave: "tahsil", etiqueta: "Elinize geçecek tahsilat (net ücret + KDV)", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Brüt ücret", formato: "moneda" },
    { clave: "stopaj", etiqueta: "Gelir vergisi stopajı", formato: "moneda" },
    { clave: "net", etiqueta: "Net ücret", formato: "moneda" },
    { clave: "kdv", etiqueta: "KDV", formato: "moneda" },
    { clave: "odeyenToplam", etiqueta: "Makbuz toplamı (brüt + KDV)", formato: "moneda" },
    { clave: "stopajOrani", etiqueta: "Stopaj oranı", formato: "porcentaje" },
    { clave: "kdvOrani", etiqueta: "KDV oranı", formato: "porcentaje" },
  ],
});
