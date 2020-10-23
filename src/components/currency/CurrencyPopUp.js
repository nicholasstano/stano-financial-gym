import React from 'react'
import currency from './currency'

const CurrencyPopUp = ({ exchangeRates }) => {

    // Iterate through all exchange rates and return the currency name and 3 letter code.
    let allExchangeRates = exchangeRates.map(rate => (
        <p key={rate[0]}>{`${currency[rate[0]]} (${rate[0]})`}</p>
    ))

    return (
        <div className="currency-types">
            {allExchangeRates}
        </div>
    )
}

export default CurrencyPopUp