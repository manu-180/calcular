import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../prestaciones";

export default definirCalculadora({
  id: "gt.preaviso",
  mercado: "gt",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "gt.preaviso-dias": "mapa",
    "gt.preaviso-meses-5-anios": "numero",
    "gt.periodo-prueba-meses": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Fecha en que entrega el aviso", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    const ingreso = entrada.fechaIngreso;
    const aviso = entrada.fechaAviso;
    if (ingreso > aviso) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la del aviso.", "fechaIngreso");
    const dias = valores["gt.preaviso-dias"];
    if (aviso < sumarMeses(ingreso, valores["gt.periodo-prueba-meses"])) {
      return {
        plazo: "No necesita aviso",
        desde: aviso,
        observaciones: ["Todavía está en el período de prueba: cualquiera de las dos partes puede terminar el contrato sin aviso."],
      };
    }
    let plazo: string;
    let desde: typeof aviso;
    if (aviso < sumarMeses(ingreso, 6)) {
      plazo = `${enMapa(dias, "menos-6-meses")} días`;
      desde = sumarDias(aviso, enMapa(dias, "menos-6-meses"));
    } else if (aviso < sumarMeses(ingreso, 12)) {
      plazo = `${enMapa(dias, "6-meses-a-1-anio")} días`;
      desde = sumarDias(aviso, enMapa(dias, "6-meses-a-1-anio"));
    } else if (aviso < sumarMeses(ingreso, 60)) {
      plazo = `${enMapa(dias, "1-a-5-anios")} días`;
      desde = sumarDias(aviso, enMapa(dias, "1-a-5-anios"));
    } else {
      const meses = valores["gt.preaviso-meses-5-anios"];
      plazo = meses === 1 ? "1 mes" : `${meses} meses`;
      desde = sumarMeses(aviso, meses);
    }
    return {
      plazo,
      desde,
      observaciones: [
        "El aviso se da por escrito. Su contrato puede fijar otro plazo.",
        "El patrono puede dejarlo ir antes sin pagarle esos días, pero usted no puede cambiar el aviso por dinero sin que él acepte.",
      ],
    };
  },
  resultado: [
    { clave: "plazo", etiqueta: "Aviso mínimo", formato: "texto" },
    { clave: "desde", etiqueta: "Puede dejar de trabajar desde el", formato: "fecha", destacada: true },
  ],
});
