// 404 de las URLs que no coinciden con ninguna ruta. Sin layout en la raíz (cada sitio tiene su
// root layout en su grupo), un app/not-found.tsx queda envuelto en el <html> pelado que Next
// inserta por defecto: sin lang, sin header ni footer, o con un <html> anidado si lo trae él.
// global-not-found reemplaza ese layout, así el 404 de calcular.ar sigue igual que antes del
// ADR 0001 y estático. Lo prende experimental.globalNotFound en next.config.ts.
import LayoutAR from "./(ar)/layout";
import NotFoundDeNext from "next/dist/client/components/builtin/not-found";

export { metadata, viewport } from "./(ar)/layout";

export default function GlobalNotFound() {
  return (
    <LayoutAR>
      <NotFoundDeNext />
    </LayoutAR>
  );
}
