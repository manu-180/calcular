# SQL pendiente: ofertas dentro del resultado (calcularya.com)

Una columna nueva en `ca_checkouts` para que los números de la calculadora viajen con la compra
(planilla con los datos cargados, informe ya completo). Sin ella todo funciona igual: el checkout se
guarda sin `datos` (`src/lib/pagos/ventas-intl.ts` reintenta sin la columna) y la persona recupera sus
números desde el navegador (localStorage) o los carga en el informe.

Re-ejecutable. Correr en la base de calcular (la que tiene `ca_checkouts`).

```sql
set lock_timeout = '5s';

alter table public.ca_checkouts
  add column if not exists datos jsonb
  check (datos is null or (jsonb_typeof(datos) = 'object' and octet_length(datos::text) <= 2048));

comment on column public.ca_checkouts.datos is
  'calcularya: {calc, entrada} validados contra la definición de la calculadora (src/lib/prefill/intl.ts). Sólo con la casilla «usar estos números» tildada.';
```

RLS: ninguna política nueva. `ca_checkouts` se escribe y se lee sólo con la clave de servicio
(checkout, descarga y página del informe).

Verificación:

```sql
select column_name, data_type from information_schema.columns
where table_schema = 'public' and table_name = 'ca_checkouts' and column_name = 'datos';
```
