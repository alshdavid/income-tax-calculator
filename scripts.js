// @ts-check
// @ts-expect-error
import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'

const currencyCodes = Object.freeze(["AUD", "ADA", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARB", "ARS", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BNB", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DAI", "DJF", "DKK", "DOP", "DOT", "DZD", "EGP", "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "OP", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "XRP", "YER", "ZAR", "ZMK", "ZMW"])

/** @type {Record<string, import('./types.d.ts').BracketPreset>} */
const presets = Object.freeze({
  AU_2025: {
    currencyCode: 'AUD',
    brackets: [
      { bracketStart: 0, bracketEnd: 18_200, taxRatePercent: 0, additionalCharge: 0},
      { bracketStart: 18_201, bracketEnd: 45_500, taxRatePercent: 16, additionalCharge: 0 },
      { bracketStart: 45_501, bracketEnd: 135_000, taxRatePercent: 30, additionalCharge: 0 },
      { bracketStart: 135_001, bracketEnd: 190_000, taxRatePercent: 37, additionalCharge: 0 },
      { bracketStart: 190_001, bracketEnd: Number.MAX_SAFE_INTEGER, taxRatePercent: 45, additionalCharge: 0 },
    ]
  },
  AU_2024: {
    currencyCode: 'AUD',
    brackets: [
      { bracketStart: 0, bracketEnd: 18_200, taxRatePercent: 0, additionalCharge: 0},
      { bracketStart: 18_201, bracketEnd: 45_500, taxRatePercent: 19, additionalCharge: 0 },
      { bracketStart: 45_001, bracketEnd: 120_000, taxRatePercent: 32.5, additionalCharge: 0 },
      { bracketStart: 120_001, bracketEnd: 180_000, taxRatePercent: 37, additionalCharge: 0 },
      { bracketStart: 180_001, bracketEnd: Number.MAX_SAFE_INTEGER, taxRatePercent: 45, additionalCharge: 0 },
    ]
  },
  NZ: {
    currencyCode: 'NZD',
    brackets: []
  },
  TH: {
    currencyCode: 'THB',
    brackets: [
      { bracketStart: 0, bracketEnd: 150_000, taxRatePercent: 0, additionalCharge: 0 },
      { bracketStart: 150_001, bracketEnd: 300_000, taxRatePercent: 5, additionalCharge: 0 },
      { bracketStart: 300_001, bracketEnd: 500_000, taxRatePercent: 10, additionalCharge: 0 },
      { bracketStart: 500_001, bracketEnd: 750_000, taxRatePercent: 15, additionalCharge: 0 },
      { bracketStart: 750_001, bracketEnd: 1_000_000, taxRatePercent: 20, additionalCharge: 0 },
      { bracketStart: 1_000_001, bracketEnd: 2_000_000, taxRatePercent: 25, additionalCharge: 0 },
      { bracketStart: 2_000_001, bracketEnd: 5_000_000, taxRatePercent: 30, additionalCharge: 0 },
      { bracketStart: 5_000_001, bracketEnd: Number.MAX_SAFE_INTEGER, taxRatePercent: 35, additionalCharge: 0 },
    ]
  },
  CUSTOM: {
    currencyCode: 'THB',
    brackets: [
      { bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 },
      { bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 },
      { bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 },
      { bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 },
      { bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 },
    ],
  }
})

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
}


// /** @type {Record<string, number>} */
// const Rates = await (async () => {
//   let storedRates = (() => {
//     const stored = window.localStorage.getItem('rates')
//     if (!stored) {
//       return undefined
//     }
//     const [when, rates] = JSON.parse(stored)
//     if (today() !== when) {
//       return undefined
//     }
//     return rates
//   })()

//   if (!storedRates) {
//     /** @type {Record<string, number>} */
//     const rates = await fetch(`https://api.fxratesapi.com/latest`).then(r => r.json()).then(r => r.rates)
//     window.localStorage.setItem('rates', JSON.stringify([today(), rates]))
//     storedRates = rates
//   }

//   return Object.freeze(storedRates)
// })()

// function convertCurrency(from, to, amount = 1) {
//   const usd = 1 / Rates[from]
//   const target = Rates[to] * usd
//   return amount * target
// }

class State {
  /** @type {import('./types.d.ts').Brackets} */
  brackets = structuredClone(presets[Object.keys(presets)[0]].brackets)
  /** @type {number} */
  income = 80_000

  currencyCodes = currencyCodes

  targetCurrency = presets[Object.keys(presets)[0]].currencyCode
  srcCurrency = "AUD"
  // currencyRate = 1

  get presets() {
    return Object.entries(presets)
  }

  get tax() {
    let current = 0

    let income = this.income
    // if (this.currencyRate !== 1) {
    //   income = income * this.currencyRate
    // }

    let remainingIncome = income
    for (const { bracketStart, bracketEnd, taxRatePercent, additionalCharge } of this.brackets) {
      const bracketSize = bracketEnd - bracketStart
      
      let currentRemainingIncome = remainingIncome - bracketSize
      
      if (currentRemainingIncome >= 0) {
        current += bracketSize * (taxRatePercent / 100)
        current += additionalCharge
        remainingIncome = currentRemainingIncome
      } else {
        current += remainingIncome * (taxRatePercent / 100)
        current += additionalCharge
        break
      }

      remainingIncome = currentRemainingIncome
    }

    return parseInt(current.toFixed(0), 10)
  }

  get effectiveTaxRate() {
    let income = this.income
    // if (this.currencyRate !== 1) {
    //   income = income * this.currencyRate
    // }
    let rate = 100 / income * this.tax
    return parseInt(rate.toFixed(2), 10)
  }

  get takeHomePay() {
    let income = this.income
    // if (this.currencyRate !== 1) {
    //   income = income * this.currencyRate
    // }
    return parseInt((income - this.tax).toFixed(0), 10)
  }

  // selectCurrencyRate(e) {
  //   const currencyCode = e.target.value
  //   this.currencyRate = convertCurrency(currencyCode, this.targetCurrency)
  // }

  async selectPreset(e) {
    let selection = structuredClone(presets[e.target.value || 'CUSTOM'])
    this.brackets = selection.brackets
    this.targetCurrency = selection.currencyCode
  }

  removeRow(i) {
    this.brackets.splice(i, 1)
  }

  addRow() {
    this.brackets.push({ bracketStart: 0, bracketEnd: 0, taxRatePercent: 0, additionalCharge: 0 })
  }

  
}

createApp(reactive(new State())).mount('main')