import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { diasInclusive, mayor, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "py.permiso-de-maternidad",
  mercado: "py",
  concepto: "propio",
  slug: "permiso-de-maternidad",
  estado: "publicado",
  requiere: {
    "py.permiso-maternidad": "mapa",
    "py.subsidio-maternidad": "numero",
    "py.permiso-paternidad-semanas": "numero",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable de parto" },
    { id: "antes", tipo: "si-no", etiqueta: "Empezar el permiso dos semanas antes del parto", porDefecto: false },
    {
      id: "especial",
      tipo: "si-no",
      etiqueta: "Parto prematuro o el bebé necesita cuidados especiales",
      ayuda: "Antes de la semana 35, menos de 2 kilos o internación en incubadora, con certificado médico.",
      porDefecto: false,
    },
    { id: "bebes", tipo: "entero", etiqueta: "Cantidad de bebés", min: 1, max: 6, porDefecto: 1 },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.bebes < 1) throw new ErrorEntrada("Poné al menos un bebé.", "bebes");
    const m = valores["py.permiso-maternidad"];
    const inicio = entrada.antes ? sumarDias(entrada.parto, -enMapa(m, "semanas-antes-del-parto") * 7) : entrada.parto;
    // Ley 5508 art. 11 (Ley 7534/2025): un mes más por cada bebé desde el segundo; si además el
    // parto es prematuro, rige el período más largo de los dos.
    const finNormal = sumarMeses(sumarDias(inicio, enMapa(m, "semanas") * 7), (entrada.bebes - 1) * enMapa(m, "meses-por-bebe-adicional"));
    const finEspecial = sumarDias(inicio, enMapa(m, "semanas-prematuro") * 7);
    const fin = sumarDias(entrada.especial ? mayor(finNormal, finEspecial) : finNormal, -1);
    const dias = diasInclusive(inicio, fin);
    const subsidio = redondear(porcentaje((entrada.salario / valores["py.divisor-salario-diario"]) * dias, valores["py.subsidio-maternidad"]));
    return {
      inicio,
      fin,
      dias,
      subsidio,
      finPaternidad: sumarDias(entrada.parto, valores["py.permiso-paternidad-semanas"] * 7 - 1),
      observaciones: [
        "El subsidio lo paga el IPS si tu empleador está al día con los aportes. Si no, lo tiene que pagar el empleador.",
        "Desde que avisás del embarazo y hasta un año después del nacimiento no te pueden despedir.",
        "Al volver tenés 90 minutos por día para amamantar durante seis meses, pagados.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza el", formato: "fecha" },
    { clave: "fin", etiqueta: "Termina el", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Días de permiso", formato: "dias" },
    { clave: "subsidio", etiqueta: "Subsidio estimado del IPS por todo el permiso", formato: "moneda" },
    { clave: "finPaternidad", etiqueta: "El permiso del padre termina el", formato: "fecha" },
  ],
});
