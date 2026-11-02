# Estiky website

Antes de trabajar, lee `docs/HANDOFF.md`: ahí están la verdad de producto, las reglas de contenido, el copy de la plataforma, el sistema visual, los autos y wraps, las integraciones y los pendientes.

Reglas rápidas:
- Español de Guatemala, con tuteo. No mencionar "piloto". Operamos en Ciudad de Guatemala.
- El anunciante ve todo en tiempo real desde su panel. No hay reportes quincenales para el anunciante; lo quincenal es solo el pago al conductor.
- El CTA principal del anunciante es "Crear cuenta de anunciante" (`/registro`). "Hablar con ventas" (`/demo`) es secundario.
- Nunca publicar tarifas por km, ingresos ni montos de pago del conductor. No inventar clientes, logos reales, testimonios, ROI ni tamaño de flota.
- No mezclar el contenido de anunciantes con el de conductores.
- Los autos son sedanes con wraps llamativos (`src/components/WrapCar.tsx`). Cada sección lleva un gráfico de apoyo. El hero es claro y tiene la ciudad isométrica.
- Verificación: `npm run build` más capturas o smoke test con Playwright. No hay `npm test`.
