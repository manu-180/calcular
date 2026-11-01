import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aDia, aFecha, DIAS_SEMANA, diaDeSemana, esLaborable, OPCIONES_FIN_DE_SEMANA } from "../lib/fechas";

const MAX_DIAS = 36500;

export default definirCalculadora({
  id: "bd.add-working-days",
  mercado: "bd",
  concepto: "sumar-dias",
  slug: "add-working-days",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "fecha", tipo: "fecha", etiqueta: "শুরুর তারিখ", porDefecto: "hoy" },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "কী করবেন",
      opciones: [
        { valor: "sumar", etiqueta: "দিন যোগ করুন" },
        { valor: "restar", etiqueta: "দিন বিয়োগ করুন" },
      ],
      porDefecto: "sumar",
    },
    { id: "dias", tipo: "entero", etiqueta: "কত দিন", min: 0, max: MAX_DIAS, porDefecto: 30 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "দিন গোনার ধরন",
      opciones: [
        { valor: "corridos", etiqueta: "ক্যালেন্ডারের সব দিন" },
        { valor: "habiles", etiqueta: "শুধু কর্মদিবস" },
      ],
      porDefecto: "corridos",
    },
    { id: "finde", tipo: "opcion", etiqueta: "সাপ্তাহিক ছুটি", opciones: OPCIONES_FIN_DE_SEMANA, porDefecto: "fri", visibleSi: { tipo: ["habiles"] } },
  ],
  calcular(entrada) {
    if (entrada.dias < 0 || entrada.dias > MAX_DIAS) throw new ErrorEntrada("দিনের সংখ্যা সঠিক নয়।", "dias");
    const paso = entrada.operacion === "restar" ? -1 : 1;
    const inicio = aDia(entrada.fecha);
    let fin = inicio + paso * entrada.dias;
    if (entrada.tipo === "habiles") {
      const finde = entrada.finde ?? "fri";
      fin = inicio;
      for (let contados = 0; contados < entrada.dias; ) {
        fin += paso;
        if (esLaborable(fin, finde)) contados++;
      }
    }
    return {
      resultado: aFecha(fin),
      diaSemana: DIAS_SEMANA[diaDeSemana(fin)],
      diasCorridos: Math.abs(fin - inicio),
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "ফলাফলের তারিখ", formato: "fecha", destacada: true },
    { clave: "diaSemana", etiqueta: "সপ্তাহের দিন", formato: "texto" },
    { clave: "diasCorridos", etiqueta: "ক্যালেন্ডারের মোট দিন", formato: "dias" },
  ],
});
