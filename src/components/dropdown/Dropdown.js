import React, { useState } from 'react'
import currency from '../currency/currency'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Dropdown = ({ exchangeRates, changeHaveRate, changeNeedRate, marginTopSize }) => {

    // variables to set selection of currency type and open and close dropdown menu.
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState([])
    const toggle = () => setOpen(!open)

    // On click function that sets the dropdown selection and closes the dropdown menu.
    const handleOnClick = (item) => {
        setSelection(item)
        toggle()
    }

    // Sets the exchange rate for the currency the user has or needs. In Calculator Component the first dropdown has a prop related to currency the user has and the second dropdown has a prop related to currency the user need.
    const setExchangeRate = (amt) => {
            if (changeHaveRate) {
                changeHaveRate(amt)
            }
            else if (changeNeedRate) {
                changeNeedRate(amt)
            }
    }
    
    // Iterate through all exchange rates to display them in the Dropdown Menu.
    const allExchangeRates = exchangeRates.map(exchangeRateArray => (
        <li className="dd-list-item" key={exchangeRateArray[0]}>
            <button type="button" 
            onClick={() => {
                handleOnClick(exchangeRateArray)
                setExchangeRate(exchangeRateArray[1])
                }}>
                <span>{`${currency[exchangeRateArray[0]]} (${exchangeRateArray[0]})`}</span>
                <span>{selection[0] === exchangeRateArray[0] && 'X'}</span>
            </button>
        </li>))

    return (
        <div className='dd-wrapper'>
            <div tabIndex={0} 
            className='dd-header' 
            role="button" 
            onKeyPress={() => toggle(!open)} 
            onClick={() => toggle(!open)}>
                <div className="dd-header__title">
                    <p className="dd-header__title--bold">{selection.length > 0 && `${currency[selection[0]]} (${selection[0]})`}</p>
                </div>
                <div className="dd-header__action">
                    <p><ExpandMoreIcon /></p>
                </div>
            </div>
            {open && (
                <ul className="dd-list" style={{ marginTop: marginTopSize }}>
                    {allExchangeRates}
                </ul>
            )}
        </div>
    )
}

export default Dropdown