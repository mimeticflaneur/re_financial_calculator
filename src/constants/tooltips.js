/**
 * Definiciones de conceptos financieros para tooltips
 */
export const TOOLTIPS = {
  TIR: {
    title: 'TIR (Tasa Interna de Retorno)',
    description: 'Es la rentabilidad anualizada que iguala el valor presente de todos los flujos de caja a cero. Representa el rendimiento real considerando el valor temporal del dinero.',
    formula: 'VPN = Σ CFt / (1+TIR)^t = 0',
    interpretation: '> 8% suele considerarse atractivo para inmobiliario'
  },
  
  COC: {
    title: 'Cash-on-Cash Return',
    description: 'Mide el rendimiento anual del dinero que has puesto de tu bolsillo (equity). Es el cashflow neto anual dividido entre tu inversión inicial de capital propio.',
    formula: 'CoC = Cashflow Neto Anual / Equity Inicial × 100',
    interpretation: '> 5% se considera aceptable, > 8% es excelente'
  },
  
  DSCR: {
    title: 'DSCR (Debt Service Coverage Ratio)',
    description: 'Ratio de cobertura del servicio de la deuda. Indica cuántas veces el ingreso operativo neto cubre los pagos de la hipoteca.',
    formula: 'DSCR = NOI / Servicio de Deuda Anual',
    interpretation: '> 1.25x es el mínimo recomendado por bancos'
  },
  
  NOI: {
    title: 'NOI (Net Operating Income)',
    description: 'Ingreso Operativo Neto. Son los ingresos brutos por alquiler menos todos los gastos operativos, pero ANTES de pagar la hipoteca e impuestos.',
    formula: 'NOI = Ingresos Alquiler - Gastos Operativos'
  },
  
  EQUITY_MULTIPLE: {
    title: 'Equity Multiple',
    description: 'Indica cuántas veces recuperas tu inversión inicial. Un múltiplo de 2x significa que duplicaste tu dinero.',
    formula: 'EM = Total Retornos / Equity Inicial',
    interpretation: '> 2x en 10 años es un buen resultado'
  },
  
  RENTABILIDAD_BRUTA: {
    title: 'Rentabilidad Bruta',
    description: 'Es el rendimiento más simple: ingresos anuales por alquiler divididos entre el precio de compra. NO incluye gastos, hipoteca ni impuestos.',
    formula: 'Rent. Bruta = (Alquiler Anual / Precio Compra) × 100',
    interpretation: '> 5% se considera aceptable en España'
  },
  
  ITP: {
    title: 'ITP (Impuesto de Transmisiones Patrimoniales)',
    description: 'Impuesto que se paga al comprar una vivienda de segunda mano. Varía por comunidad autónoma (4% - 10%).',
    interpretation: 'En Andalucía: 7%, Madrid: 6%, Cataluña: 10%'
  },
  
  EQUITY_INICIAL: {
    title: 'Equity Inicial',
    description: 'Es todo el dinero que pones de tu bolsillo para adquirir la propiedad: la entrada + todos los gastos de adquisición (ITP, notaría, registro, comisiones, gastos hipoteca).',
    formula: 'Equity = Entrada + Costes Adquisición'
  },
  
  LTV: {
    title: 'LTV (Loan to Value)',
    description: 'Porcentaje del valor de la vivienda que financias con hipoteca. Un LTV del 80% significa que el banco pone el 80% y tú el 20%.',
    formula: 'LTV = Préstamo Hipotecario / Valor Vivienda × 100'
  },
  
  BONIFICACION_ALQUILER: {
    title: 'Bonificación Alquiler Vivienda',
    description: 'Reducción fiscal sobre los rendimientos del alquiler de vivienda habitual. Actualmente hasta el 60% de reducción sobre el rendimiento neto.',
    interpretation: 'Solo aplica si el inquilino usa el piso como vivienda habitual'
  },
  
  BONIFICACION_VENTA: {
    title: 'Exención por Reinversión en Vivienda Habitual',
    description: 'Si vendes tu vivienda habitual y reinviertes el importe en otra vivienda habitual en 2 años, puedes eximir hasta el 100% de la ganancia patrimonial.',
    interpretation: 'No aplica a segundas viviendas o inversiones'
  },
  
  GANANCIA_PATRIMONIAL: {
    title: 'Ganancia Patrimonial',
    description: 'Beneficio obtenido al vender por encima del precio de compra + gastos de adquisición. Tributa al 19-26% según tramos.',
    formula: 'Ganancia = Precio Venta - (Precio Compra + Gastos)'
  },
  
  COMUNIDAD: {
    title: 'Gastos de Comunidad',
    description: 'Cuota mensual/trimestral para el mantenimiento de zonas comunes, ascensor, portería, etc. Se estima como % del valor de la vivienda.'
  },
  
  IBI: {
    title: 'IBI (Impuesto sobre Bienes Inmuebles)',
    description: 'Impuesto municipal anual sobre la propiedad. Se calcula sobre el valor catastral, pero se estima como % del valor de mercado.'
  },
  
  DERRAMAS: {
    title: 'Derramas',
    description: 'Pagos extraordinarios para obras o reparaciones importantes en el edificio. Son impredecibles, por eso se provisionan como % anual.'
  },
  
  OCUPACION: {
    title: 'Tasa de Ocupación',
    description: 'Porcentaje del año que el piso está alquilado. Considera periodos vacíos entre inquilinos, reformas, o impagos.',
    interpretation: '90-95% es optimista, 80-85% es conservador'
  },
  
  APALANCAMIENTO: {
    title: 'Apalancamiento',
    description: 'Usar deuda (hipoteca) para amplificar los retornos. Con menos dinero propio controlas un activo mayor, multiplicando ganancias... o pérdidas.',
    interpretation: 'Alto apalancamiento = más riesgo y más potencial de rentabilidad'
  },
  
  CASHFLOW: {
    title: 'Cashflow (Flujo de Caja)',
    description: 'Dinero que realmente entra y sale de tu bolsillo cada periodo. Positivo = ganas dinero mes a mes, Negativo = pones dinero de tu bolsillo.'
  },

  RENTABILIDAD_APALANCADA: {
    title: 'Rentabilidad Apalancada',
    description: 'Es la TIR considerando que solo has invertido el equity inicial. El apalancamiento amplifica los retornos porque controlas un activo grande con poco capital propio.',
    formula: 'TIR sobre tu equity, no sobre el valor total del activo'
  },
  
  SALDO_HIPOTECA: {
    title: 'Saldo Pendiente de Hipoteca',
    description: 'Capital que aún debes al banco en un momento dado. Al vender, este importe se resta del precio de venta para calcular tu ganancia real.'
  },
  
  VALOR_LIQUIDACION: {
    title: 'Valor de Liquidación',
    description: 'Lo que realmente recibirías si vendieras hoy: Precio de venta - Saldo hipoteca pendiente - Impuestos sobre ganancia patrimonial.',
    formula: 'Valor Liq. = Precio Venta - Hipoteca - Impuestos'
  }
}

export default TOOLTIPS
