import IRateProperties from '../../interface/IRateProperties.interface';
import { rateService } from '../../services/rate.service'

export function getCurrencyRates() {
  return async (dispatch: Function) => {
    try {
      const currencyRates = await rateService.getRates()
      dispatch({ type: 'SET_CURRENCY_RATES', currencyRates })
    } catch (err) {
      console.log(err);
    }
  }
}

export function setCurrRateImgs(rateProperties: IRateProperties) {
  return (dispatch: Function) => {
    dispatch({ type: 'SET_IMGS', rateProperties })
  }
}