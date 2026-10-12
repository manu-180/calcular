import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { fechaChilena } from "../lib/fechas";

export default definirCalculadora({
  id: "cl.prenatal-y-postnatal",
  mercado: "cl",
  concepto: "propio",
  slug: "prenatal-y-postnatal",
  estado: "publicado",
  requiere: {
    "cl.prenatal-dias": "numero",
    "cl.postnatal-dias": "numero",
    "cl.postnatal-prematuro-dias": "numero",
    "cl.postnatal-dias-por-hijo-adicional": "numero",
    "cl.postnatal-parental-dias": "numero",
    "cl.postnatal-parental-parcial-dias": "numero",
  },
  campos: [
    { id: "fpp", tipo: "fecha", etiqueta: "Fecha probable de parto", ayuda: "La que indica tu certificado médico o de matrona." },
    { id: "parto", tipo: "fecha", etiqueta: "Fecha real del parto (si ya nació)", requerido: false },
    { id: "hijos", tipo: "entero", etiqueta: "Bebés de este parto", min: 1, max: 6, porDefecto: 1 },
    { id: "prematuro", tipo: "si-no", etiqueta: "Nació antes de la semana 33 o con menos de 1.500 gramos", porDefecto: false },
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Postnatal parental",
      opciones: [
        { valor: "completa", etiqueta: "Jornada completa (sin trabajar)" },
        { valor: "parcial", etiqueta: "Media jornada (trabajando la mitad)" },
      ],
      porDefecto: "completa",
    },
  ],
  calcular(entrada, valores) {
    const parto = entrada.parto ?? entrada.fpp;
    if (diasEntre(entrada.fpp, parto) > 60 || diasEntre(parto, entrada.fpp) > 120) throw new ErrorEntrada("Revisa las fechas: el parto está muy lejos de la fecha probable.", "parto");
    const inicioPrenatal = sumarDias(entrada.fpp, -valores["cl.prenatal-dias"]);
    const normal = valores["cl.postnatal-dias"] + valores["cl.postnatal-dias-por-hijo-adicional"] * (entrada.hijos - 1);
    // Artículo 196: si se juntan el parto prematuro y el múltiple, rige el descanso más largo.
    const diasPostnatal = entrada.prematuro ? Math.max(valores["cl.postnatal-prematuro-dias"], normal) : normal;
    const finPostnatal = sumarDias(parto, diasPostnatal - 1);
    const diasParental = entrada.modalidad === "parcial" ? valores["cl.postnatal-parental-parcial-dias"] : valores["cl.postnatal-parental-dias"];
    const inicioParental = sumarDias(finPostnatal, 1);
    const finParental = sumarDias(inicioParental, diasParental - 1);

    const observaciones: string[] = [];
    if (parto > entrada.fpp) observaciones.push("Si el parto llega después de la fecha probable, el prenatal se alarga hasta el día del parto.");
    if (entrada.modalidad === "parcial") observaciones.push(`Para tomarlo a media jornada avisa a tu empleador por carta certificada a más tardar el ${fechaChilena(sumarDias(finPostnatal, -30))}, con copia a la Inspección del Trabajo.`);
    return {
      inicioPrenatal: fechaChilena(inicioPrenatal),
      parto: fechaChilena(parto),
      diasPostnatal,
      finPostnatal: fechaChilena(finPostnatal),
      diasParental,
      inicioParental: fechaChilena(inicioParental),
      finParental: fechaChilena(finParental),
      vuelta: fechaChilena(sumarDias(finParental, 1)),
      observaciones,
    };
  },
  resultado: [
    { clave: "inicioPrenatal", etiqueta: "Empieza el prenatal", formato: "texto", destacada: true },
    { clave: "parto", etiqueta: "Parto (empieza el postnatal)", formato: "texto" },
    { clave: "diasPostnatal", etiqueta: "Días de postnatal", formato: "dias" },
    { clave: "finPostnatal", etiqueta: "Termina el postnatal", formato: "texto" },
    { clave: "inicioParental", etiqueta: "Empieza el postnatal parental", formato: "texto" },
    { clave: "diasParental", etiqueta: "Días de postnatal parental", formato: "dias" },
    { clave: "finParental", etiqueta: "Termina el postnatal parental", formato: "texto", destacada: true },
    { clave: "vuelta", etiqueta: "Vuelves a tu jornada completa", formato: "texto" },
  ],
});
