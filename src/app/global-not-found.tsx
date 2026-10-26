// 404 de las URLs que no coinciden con ninguna ruta. Sin layout en la raíz (cada sitio tiene su
// root layout en su grupo), un app/not-found.tsx queda envuelto en el <html> pelado que Next
// inserta por defecto: sin lang, sin header ni footer, o con un <html> anidado si lo trae él.
// global-not-found reemplaza ese layout y lo prende experimental.globalNotFound en next.config.ts.
// Lo prueba check_rutas_ar.ts (/esta-pagina-no-existe).
import type { Metadata } from "next";
import LayoutAR from "./(ar)/layout";
import { NoEncontradaAR } from "@/components/PantallaDeError";

export { viewport } from "./(ar)/layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://calcular.ar"),
  title: "Esta página no existe | CalculAR",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <LayoutAR>
      <NoEncontradaAR />
    </LayoutAR>
  );
}
