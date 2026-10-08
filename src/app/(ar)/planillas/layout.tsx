import GoogleAdsTag from "@/components/GoogleAdsTag";

// GoogleAdsTag va ANTES de children: los efectos de los hermanos corren en orden de árbol, y el
// shim inline de gtag tiene que existir cuando ConversionGoogleAds (hijo) dispara la compra.
// El gtag de Google Ads vive en este segmento y no en el layout raíz: la única
// conversión (CONVERSION_COMPRA_PLANILLA) se dispara en /planillas/gracias, así que
// las otras ~175 rutas no tienen por qué bajar los 151 KiB de googletagmanager.
export default function PlanillasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAdsTag />
      {children}
    </>
  );
}
