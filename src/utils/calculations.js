/**
 * Utilidades de cálculo financiero para análisis inmobiliario
 */

/**
 * Calcula la cuota mensual de una hipoteca (método francés)
 */
export function calcularCuotaMensual(principal, tasaAnual, anos) {
  if (principal <= 0) return 0
  const tasaMensual = tasaAnual / 100 / 12
  const numPagos = anos * 12
  
  if (tasaMensual === 0) return principal / numPagos
  
  return principal * (tasaMensual * Math.pow(1 + tasaMensual, numPagos)) / 
         (Math.pow(1 + tasaMensual, numPagos) - 1)
}

/**
 * Genera tabla de amortización completa
 */
export function generarTablaAmortizacion(principal, tasaAnual, anos) {
  const tabla = []
  let saldo = principal
  const tasaMensual = tasaAnual / 100 / 12
  const cuotaMensual = calcularCuotaMensual(principal, tasaAnual, anos)
  
  for (let mes = 1; mes <= anos * 12; mes++) {
    const interes = saldo * tasaMensual
    const amortizacion = cuotaMensual - interes
    saldo = Math.max(0, saldo - amortizacion)
    
    tabla.push({
      mes,
      cuota: cuotaMensual,
      interes,
      amortizacion,
      saldoPendiente: saldo
    })
  }
  
  return tabla
}

/**
 * Obtiene el saldo pendiente de hipoteca en un mes determinado
 */
export function obtenerSaldoHipoteca(principal, tasaAnual, anos, mesActual) {
  if (mesActual <= 0) return principal
  
  let saldo = principal
  const tasaMensual = tasaAnual / 100 / 12
  const cuotaMensual = calcularCuotaMensual(principal, tasaAnual, anos)
  
  for (let i = 1; i <= Math.min(mesActual, anos * 12); i++) {
    const interes = saldo * tasaMensual
    saldo = Math.max(0, saldo - (cuotaMensual - interes))
  }
  
  return saldo
}

/**
 * Calcula la TIR (Tasa Interna de Retorno) mediante búsqueda binaria
 */
export function calcularTIR(flujos, maxIteraciones = 200, tolerancia = 0.01) {
  let tasaBaja = -0.99
  let tasaAlta = 5
  let tir = 0
  
  for (let iter = 0; iter < maxIteraciones; iter++) {
    tir = (tasaBaja + tasaAlta) / 2
    let vpn = 0
    
    for (let i = 0; i < flujos.length; i++) {
      vpn += flujos[i] / Math.pow(1 + tir, i)
    }
    
    if (Math.abs(vpn) < tolerancia) break
    
    if (vpn > 0) {
      tasaBaja = tir
    } else {
      tasaAlta = tir
    }
  }
  
  return tir * 100
}

/**
 * Calcula el VPN (Valor Presente Neto) de una serie de flujos
 */
export function calcularVPN(flujos, tasaDescuento) {
  const tasa = tasaDescuento / 100
  return flujos.reduce((vpn, flujo, i) => {
    return vpn + flujo / Math.pow(1 + tasa, i)
  }, 0)
}

/**
 * Calcula métricas completas de una inversión inmobiliaria
 */
export function calcularMetricasInversion(inputs, escenario) {
  const i = inputs
  const esc = escenario
  
  // 1. COSTES DE ADQUISICIÓN
  const valorVivienda = i.valorVivienda
  const importeEntrada = valorVivienda * (i.entrada / 100)
  const importeHipoteca = valorVivienda - importeEntrada
  
  const costesAdquisicion = {
    itp: valorVivienda * (i.impuestoITP / 100),
    comisionAgencia: valorVivienda * (i.comisionAgencia / 100),
    gastosHipoteca: importeHipoteca * (i.gastosHipoteca / 100),
    registroNotaria: valorVivienda * (i.gastosRegistroNotaria / 100)
  }
  
  const totalCostesAdquisicion = Object.values(costesAdquisicion).reduce((a, b) => a + b, 0)
  const equityInicial = importeEntrada + totalCostesAdquisicion
  
  // 2. HIPOTECA
  const tasaMensual = (i.tipoInteres / 100) / 12
  const cuotaMensual = calcularCuotaMensual(importeHipoteca, i.tipoInteres, i.anosHipoteca)
  const cuotaAnual = cuotaMensual * 12
  
  // 3. GASTOS OPERATIVOS ANUALES BASE
  const gastosOperativosBase = valorVivienda * ((i.gastosComunidad + i.ibi + i.mantenimiento + i.derramas) / 100)
  
  // 4. PROYECCIÓN DE CASHFLOWS
  const cashflows = []
  let saldoHipoteca = importeHipoteca
  const horizonteAnos = i.ventaFutura ? i.anosHastaVenta : 10
  
  for (let ano = 1; ano <= horizonteAnos; ano++) {
    const esAnoVenta = i.ventaFutura && ano === i.anosHastaVenta
    
    // Ingresos por alquiler
    const alquilerMensualAno = i.alquilerMensual * esc.alquiler * 
                               Math.pow(1 + (i.subidaAlquiler / 100), ano - 1)
    const ingresosBrutosAlquiler = alquilerMensualAno * 12 * 
                                    (i.ocupacion / 100) * esc.ocupacion
    
    // Valor vivienda con revalorización
    const valorViviendaAno = valorVivienda * 
                              Math.pow(1 + ((i.subidaPrecioVivienda / 100) * esc.revalorizacion), ano)
    
    const ingresosVenta = esAnoVenta ? valorViviendaAno : 0
    const totalIngresos = ingresosBrutosAlquiler + ingresosVenta
    
    // Gastos operativos
    const gastosOperativos = gastosOperativosBase * esc.gastos
    
    // Amortización hipoteca año a año
    let interesesAnuales = 0
    let amortizacionAnual = 0
    
    for (let mes = 0; mes < 12; mes++) {
      if (saldoHipoteca > 0) {
        const interesMes = saldoHipoteca * tasaMensual
        const amortizacionMes = cuotaMensual - interesMes
        interesesAnuales += interesMes
        amortizacionAnual += amortizacionMes
        saldoHipoteca = Math.max(0, saldoHipoteca - amortizacionMes)
      }
    }
    
    const repagoHipoteca = esAnoVenta ? saldoHipoteca : 0
    if (esAnoVenta) saldoHipoteca = 0
    
    // Cashflow operativo (NOI)
    const cashflowOperacion = ingresosBrutosAlquiler - gastosOperativos
    
    // Cashflow después de servicio de deuda
    const totalSalidaFinanciacion = cuotaAnual + repagoHipoteca
    const cashflowDisponible = totalIngresos - gastosOperativos - totalSalidaFinanciacion
    
    // Impuestos sobre rentas de alquiler
    const baseImponibleAlquiler = ingresosBrutosAlquiler - gastosOperativos - interesesAnuales
    const baseImponibleBonificada = baseImponibleAlquiler * (1 - i.bonificacionAlquiler / 100)
    const impuestosAlquiler = baseImponibleBonificada > 0 
      ? baseImponibleBonificada * (i.impuestoRentasCapital / 100)
      : 0
    
    // Impuestos sobre ganancia patrimonial (solo en venta)
    let impuestosVenta = 0
    if (esAnoVenta && ingresosVenta > 0) {
      const gananciaPatrimonial = valorViviendaAno - valorVivienda - totalCostesAdquisicion
      const gananciaBonificada = gananciaPatrimonial * (1 - i.bonificacionVenta1Vivienda / 100)
      impuestosVenta = gananciaBonificada > 0 
        ? gananciaBonificada * (i.impuestoGananciasPatrimoniales / 100)
        : 0
    }
    
    const totalImpuestos = impuestosAlquiler + impuestosVenta
    const cashflowNeto = cashflowDisponible - totalImpuestos
    
    cashflows.push({
      ano,
      ingresosBrutosAlquiler,
      ingresosVenta,
      totalIngresos,
      gastosOperativos,
      intereses: interesesAnuales,
      amortizacion: amortizacionAnual,
      cuotaHipoteca: cuotaAnual,
      repagoHipoteca,
      cashflowOperacion,
      cashflowDisponible,
      impuestosAlquiler,
      impuestosVenta,
      totalImpuestos,
      cashflowNeto,
      saldoHipoteca,
      valorVivienda: valorViviendaAno,
      esAnoVenta
    })
  }
  
  // 5. MÉTRICAS CLAVE
  const ano1 = cashflows[0]
  
  const rentabilidadBruta = (ano1.ingresosBrutosAlquiler / valorVivienda) * 100
  const cashOnCash = (ano1.cashflowNeto / equityInicial) * 100
  const dscr = ano1.cuotaHipoteca > 0 ? ano1.cashflowOperacion / ano1.cuotaHipoteca : Infinity
  
  // TIR
  const flujosTIR = [-equityInicial, ...cashflows.map(cf => cf.cashflowNeto)]
  const tir = calcularTIR(flujosTIR)
  
  // Equity múltiple
  const cashflowsAcumulados = cashflows.reduce((sum, cf) => sum + cf.cashflowNeto, 0)
  const equityMultiple = cashflowsAcumulados / equityInicial
  const gananciaTotal = cashflowsAcumulados - equityInicial
  
  // 6. DECISIÓN DE COMPRA
  const cumpleTIR = tir >= i.tirMinima
  const cumpleCoC = cashOnCash >= i.cocMinimo
  const cumpleDSCR = dscr >= 1.25
  const todosCashflowsPositivos = cashflows.every(cf => cf.cashflowNeto >= -100)
  const recomendacion = cumpleTIR && cumpleCoC && cumpleDSCR && todosCashflowsPositivos
  
  return {
    valorVivienda,
    equityInicial,
    importeEntrada,
    importeHipoteca,
    costesAdquisicion,
    totalCostesAdquisicion,
    ltv: (importeHipoteca / valorVivienda) * 100,
    cuotaMensual,
    cuotaAnual,
    rentabilidadBruta,
    cashOnCash,
    dscr,
    tir,
    equityMultiple,
    gananciaTotal,
    cashflows,
    recomendacion,
    cumpleTIR,
    cumpleCoC,
    cumpleDSCR,
    todosCashflowsPositivos
  }
}

/**
 * Calcula la rentabilidad si se vende en un año específico
 */
export function calcularVentaAnticipada(inputs, escenario, anoVenta, valorVentaActual = null) {
  const i = inputs
  const esc = escenario
  
  const valorVivienda = i.valorVivienda
  const importeEntrada = valorVivienda * (i.entrada / 100)
  const importeHipoteca = valorVivienda - importeEntrada
  
  const costesAdquisicion = {
    itp: valorVivienda * (i.impuestoITP / 100),
    comisionAgencia: valorVivienda * (i.comisionAgencia / 100),
    gastosHipoteca: importeHipoteca * (i.gastosHipoteca / 100),
    registroNotaria: valorVivienda * (i.gastosRegistroNotaria / 100)
  }
  
  const totalCostesAdquisicion = Object.values(costesAdquisicion).reduce((a, b) => a + b, 0)
  const equityInicial = importeEntrada + totalCostesAdquisicion
  
  const valorActual = valorVentaActual || 
    valorVivienda * Math.pow(1 + ((i.subidaPrecioVivienda / 100) * esc.revalorizacion), anoVenta)
  
  const saldoHipotecaPendiente = obtenerSaldoHipoteca(
    importeHipoteca, 
    i.tipoInteres, 
    i.anosHipoteca, 
    anoVenta * 12
  )
  
  const cuotaMensual = calcularCuotaMensual(importeHipoteca, i.tipoInteres, i.anosHipoteca)
  const cuotaAnual = cuotaMensual * 12
  const tasaMensual = (i.tipoInteres / 100) / 12
  
  const gastosOperativosAnuales = valorVivienda * 
    ((i.gastosComunidad + i.ibi + i.mantenimiento + i.derramas) / 100) * esc.gastos
  
  let cashflowsAcumulados = 0
  let saldoHipoteca = importeHipoteca
  
  for (let ano = 1; ano <= anoVenta; ano++) {
    const alquilerMensualAno = i.alquilerMensual * esc.alquiler * 
                               Math.pow(1 + (i.subidaAlquiler / 100), ano - 1)
    const ingresosAlquiler = alquilerMensualAno * 12 * (i.ocupacion / 100) * esc.ocupacion
    
    let interesesAnuales = 0
    for (let mes = 0; mes < 12; mes++) {
      if (saldoHipoteca > 0) {
        const interesMes = saldoHipoteca * tasaMensual
        const amortizacionMes = cuotaMensual - interesMes
        interesesAnuales += interesMes
        saldoHipoteca = Math.max(0, saldoHipoteca - amortizacionMes)
      }
    }
    
    const baseImponible = (ingresosAlquiler - gastosOperativosAnuales - interesesAnuales) * 
                          (1 - i.bonificacionAlquiler / 100)
    const impuestosAlquiler = baseImponible > 0 ? baseImponible * (i.impuestoRentasCapital / 100) : 0
    
    const cashflowAno = ingresosAlquiler - gastosOperativosAnuales - cuotaAnual - impuestosAlquiler
    cashflowsAcumulados += cashflowAno
  }
  
  const gananciaPatrimonial = valorActual - valorVivienda - totalCostesAdquisicion
  const gananciaBonificada = gananciaPatrimonial * (1 - i.bonificacionVenta1Vivienda / 100)
  const impuestosVenta = gananciaBonificada > 0 
    ? gananciaBonificada * (i.impuestoGananciasPatrimoniales / 100)
    : 0
  
  const valorLiquidacion = valorActual - saldoHipotecaPendiente - impuestosVenta
  const retornoTotal = cashflowsAcumulados + valorLiquidacion
  const gananciaAbsoluta = retornoTotal - equityInicial
  
  // TIR
  const flujos = [-equityInicial]
  saldoHipoteca = importeHipoteca
  
  for (let ano = 1; ano <= anoVenta; ano++) {
    const alquilerMensualAno = i.alquilerMensual * esc.alquiler * 
                               Math.pow(1 + (i.subidaAlquiler / 100), ano - 1)
    const ingresosAlquiler = alquilerMensualAno * 12 * (i.ocupacion / 100) * esc.ocupacion
    
    let interesesAnuales = 0
    for (let mes = 0; mes < 12; mes++) {
      if (saldoHipoteca > 0) {
        const interesMes = saldoHipoteca * tasaMensual
        const amortizacionMes = cuotaMensual - interesMes
        interesesAnuales += interesMes
        saldoHipoteca = Math.max(0, saldoHipoteca - amortizacionMes)
      }
    }
    
    const baseImponible = (ingresosAlquiler - gastosOperativosAnuales - interesesAnuales) * 
                          (1 - i.bonificacionAlquiler / 100)
    const impuestosAlquiler = baseImponible > 0 ? baseImponible * (i.impuestoRentasCapital / 100) : 0
    
    let cashflowAno = ingresosAlquiler - gastosOperativosAnuales - cuotaAnual - impuestosAlquiler
    
    if (ano === anoVenta) {
      cashflowAno += valorLiquidacion
    }
    
    flujos.push(cashflowAno)
  }
  
  const tirVenta = calcularTIR(flujos)
  const equityMultiple = retornoTotal / equityInicial
  const rentabilidadApalancada = ((retornoTotal / equityInicial) - 1) / anoVenta * 100
  
  return {
    anoVenta,
    valorActual,
    saldoHipotecaPendiente,
    cashflowsAcumulados,
    gananciaPatrimonial,
    impuestosVenta,
    valorLiquidacion,
    retornoTotal,
    gananciaAbsoluta,
    equityInicial,
    tirVenta,
    equityMultiple,
    rentabilidadApalancada
  }
}

export default {
  calcularCuotaMensual,
  generarTablaAmortizacion,
  obtenerSaldoHipoteca,
  calcularTIR,
  calcularVPN,
  calcularMetricasInversion,
  calcularVentaAnticipada
}
