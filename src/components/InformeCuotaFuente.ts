import { Newsreader } from "next/font/google";

// Serif de lectura sólo para el informe: le da cara de documento y lo separa de la interfaz.
// Sin preload: la miniatura vive debajo del resultado de una calculadora con mucho tráfico
// orgánico, y precargar una fuente que casi nadie ve al entrar le cobraría el LCP a todos.
export const fuenteInforme = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-informe",
  display: "swap",
  preload: false,
});
