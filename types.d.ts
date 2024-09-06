export type Bracket = { 
  bracketStart: number, 
  bracketEnd: number, 
  taxRatePercent: number, 
  additionalCharge: number 
}
export type Brackets = Array<Bracket>

export type BracketPreset = {
  currencyCode: string,
  brackets: Brackets
}