export function ErrorCalculo({ mensaje }: { mensaje: string }) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-xl border border-rose-200 bg-rose-50/70 p-5 text-sm text-rose-900"
    >
      {mensaje}
    </div>
  );
}
