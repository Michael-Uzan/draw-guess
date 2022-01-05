import { ICurrencyRate } from "../../interface/ICurrencyRate"
import { ICurrencyRateState } from "../../interface/ICurrencyRateState"

const INITIAL_STATE: ICurrencyRateState = {
  currencyRates: [],
  srcCurrCurrencyImg: '',
  desCurrCurrencyImg: '',
}

export function currencyRateReducer(state: ICurrencyRateState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'SET_CURRENCY_RATES':
      return {
        ...state,
        currencyRates: action.currencyRates
      }
    case 'SET_IMGS':
      const srcCurrency: ICurrencyRate[] = state.currencyRates.filter((currencyRate: ICurrencyRate) => {
        return currencyRate.currency === action.rateProperties.srcCoin
      })
      const desCurrency: ICurrencyRate[] = state.currencyRates.filter((currencyRate: ICurrencyRate) => {
        return currencyRate.currency === action.rateProperties.desCoin
      })
      return {
        ...state,
        srcCurrCurrencyImg: srcCurrency[0]?.img,
        desCurrCurrencyImg: desCurrency[0]?.img,
      }
    default:
      return state
  }
}