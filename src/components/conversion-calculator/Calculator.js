import React, { useEffect, useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import CurrencyPopUp from '../currency/CurrencyPopUp';
import currency from '../currency/currency'


const Calculator = () => {

    // variables to handle currency conversion.
    const [exchangeRates, setExchangeRates] = useState([["EUR", 1]])
    const [loading, setLoading] = useState(false)
    const [moneyHave, setMoneyHave] = useState(0)
    const [moneyNeed, setMoneyNeed] = useState(0)
    const [convertFrom, setConvertFrom] = useState(null)
    const [convertTo, setConvertTo] = useState(null)
    const [showCurrencyTypes, setShowCurrencyTypes] = useState(false)

    // Fetch exchangeRates from API and add the to the array variable.
    const fetchExchangeRates = () => {
        setLoading(true)
        fetch(`https://api.exchangeratesapi.io/latest`)
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            setExchangeRates(exchangeRates.concat(Object.entries(data.rates)))
        })
    }
    
    // On mount fetch all exchange rates.
    useEffect(fetchExchangeRates, [])
    
    
    // Function to handle user input of money they are looking to convert.
    const onChange = (event) => {
        if (event.target.value < 0) {
            alert("please enter a value greater than 0.")
            setMoneyHave(0)
        }
        else {
            setMoneyHave(event.target.value)
            setMoneyNeed(((event.target.value * convertTo) / convertFrom).toFixed(2))
        }
    }

    // Sets the exchange rate for the currency the user has.
    const changeHaveRate = (amt) => {
        setConvertFrom(amt)
        setMoneyNeed(((moneyHave * convertTo) / amt).toFixed(2))
    }

    // Sets the exchange rate for the currency the user wants.
    const changeNeedRate = (amt) => {
        setConvertTo(amt)
        setMoneyNeed(((moneyHave * amt) / convertFrom).toFixed(2))
    }

    // Function that finds the exchange rate and returns the exchange rate 3 letter code.
    const findCurrency = (rate) => {
        return exchangeRates.find(exchangeRate => (
            exchangeRate[1] === rate
        ))
    }

    return (
        <div>
            { loading 
                ? 
                    <h1>Loading</h1>
                :
                <>
                    <p className='converting-header'>Converting From</p>
                    <Dropdown 
                    marginTopSize={'115px'}
                    changeHaveRate={changeHaveRate}
                    exchangeRates={exchangeRates}/>
                    <p className='converting-header'>Converting To</p>
                    <Dropdown 
                    marginTopSize={'225px'}
                    changeNeedRate={changeNeedRate}
                    exchangeRates={exchangeRates}/>
                    <div className="conversion-information">
                        <p>If you convert</p>
                        <p><input type="number" min="0" value={moneyHave} onChange={onChange} /></p>
                        <p>{convertFrom ? currency[findCurrency(convertFrom)[0]] : 'Converting from currency'}</p>
                        <hr />
                        <p>You will receive</p>
                        <p>{convertFrom && convertTo ? moneyNeed : '0.00'}</p>
                        <p>{convertTo ? currency[findCurrency(convertTo)[0]] : 'Converting to currency'}</p>
                    </div>
                    <div className="bottom-btns">
                        <button onClick={() => setShowCurrencyTypes(!showCurrencyTypes)}>View all exchange rates</button>
                    </div>
                    {showCurrencyTypes ? <CurrencyPopUp exchangeRates={exchangeRates} /> : null}
                </>
            }
        </div>
    )
}

export default Calculator