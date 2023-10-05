import React, { useState } from "react";
import card from "./cardimage.png";
import "./FirstComp.css";
import sideCard from "./sideCard.png";
import backCard from "./cardBack.png";

function FirstComp() {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [nameOnCardError, setNameOnCardError] = useState("");
  const [expiryMonthError, setExpiryMonthError] = useState("");
  const [expiryYearError, setExpiryYearError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "cardNumber":
        const formattedValue = value
          .replace(/[^\d]/g, "")
          .slice(0, 16)
          .replace(/(.{4})/g, "$1 ");
        setCardNumber(formattedValue.trim());
        if (!/^[0-9]{16}$/.test(formattedValue.replace(/\s/g, ""))) {
          setCardNumberError("Invalid Card Number");
        } else {
          setCardNumberError("");
        }
        break;

      case "nameOnCard":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          setNameOnCardError("Invalid Card Name");
        } else {
          setNameOnCardError("");
        }
        setNameOnCard(value); // Always update the state, even if it's invalid
        break;

        case "expiryMonth":
            let monthValue = value.replace(/[^\d]/g, "");
            if (!/^[0-9]{2}$/.test(monthValue)) {
              setExpiryMonthError("Invalid Card Month");
            } else {
              if (monthValue >= "01" && monthValue <= "12") {
                setExpiryMonthError("");
               
              } else {
                setExpiryMonthError("Invalid Card Month");
              }
            }
            setExpiryMonth(monthValue);
            break;
          
          
            case "expiryYear":
                let yearValue=value.replace(/[^\d]/g, "");
                const currentYear = new Date().getFullYear();
                if (
                    !/^[0-9]{4}$/.test(yearValue)||
                    parseInt(yearValue) < currentYear
                    
                ) {
                  setExpiryYearError("Invalid card Year");
                } else {
                  setExpiryYearError("");
                 
                }
               setExpiryYear(yearValue);
                break;
              
          
          case "cvv":
            let cvvValue=value.replace(/[^\d]/g, "");
            if (!/^[0-9]{3}$/.test(cvvValue)) {
              setCvvError("Invalid Card CVV");
            } else {
              setCvvError("");
              
            }
            setCvv(cvvValue);
            break;
          
      default:
        break;
    }
  };

  

  return (
    <div>
      <img src={card} alt="card" className="cardImg" />
      <img src={sideCard} alt="card2" className="card2Img" />
      <img src={backCard} alt="backCard" className="backCard" />

      <div className="formContainer">
        <form  onSubmit={handleSubmit}>
          {/* Cardholder Name */}
          <div className="nameInput">
            <label className="cardholderName-label">CARDHOLDER NAME:</label>
            <br />
            <input
              type="text"
              className="cardholderName-input"
              placeholder="e.g. Sweta Mishra"
              value={nameOnCard}
              onChange={handleChange}
              required
              name="nameOnCard"
            />
            <p className="error-message">{nameOnCardError}</p>
          </div>
          {/* Card Number */}
          <div className="numberInput">
            <label className="cardholderNumber-label">CARD NUMBER:</label>
            <br />
            <input
              type="text"
              className="cardholderNumber-input"
              placeholder="e.g. 1234 5678 9123 0000"
              value={cardNumber}
              onChange={handleChange}
              required
              name="cardNumber"
            />
            <p className="error-message">{cardNumberError}</p>
          </div>
          {/* ... (previous code) */}
          <div className="lastLine">
            {/* Expiry Date */}
            <div className="expDate">
              <label className="date-label">EXP DATE:</label>
              <br />
              <input
                type="text"
                className="month-input"
                placeholder="MM"
                value={expiryMonth}
                onChange={handleChange}
                required
                name="expiryMonth"
                maxLength={2}//cannot enter more than two number in month field
              />
              <p className="error-message">{expiryMonthError}</p>
              <input
                type="text"
                className="year-input"
                placeholder="YYYY"
                value={expiryYear}
                onChange={handleChange}
                required
                name="expiryYear"
                maxLength={4}//cannot enter more than four number in year field
              />
              <p className="error-message-for-year">{expiryYearError}</p>
            </div>
            {/* CVV */}
            <div className="cvc">
              <label className="cvc-label">CVC:</label>
              <br />
              <input
                type="text"
                className="cvc-input"
                placeholder="e.g. 123"
                value={cvv}
                onChange={handleChange}
                required
                name="cvv"
                maxLength={3}
              />
              <p className="error-message-for-cvv">{cvvError}</p>
            </div>
          </div>
          <button className="submit" type="submit">
            {" "}
            CONFIRM{" "}
          </button>
        </form>
      </div>
      
      {formSubmitted===true && (
        <div className="cardData">
          <div className="cardHolderName">{nameOnCard}</div>
          <div className="cardNumber">{cardNumber} </div>
          <div className="cardMonth">{expiryMonth + " /"}</div>
          <div className="cardYear">{expiryYear}</div>
          <div className="cardCVV">{cvv}</div>
        </div>
      )}
    </div>
  );
}

export default FirstComp;

/*
import React, { useState } from 'react';
import card from "./cardimage.png";
import "./FirstComp.css";
import card2 from "./card2.png";
import backCard from "./cardBack.png";

function FirstComp() {
    const [formData, setFormData] = useState({
        cardNumber: "",
        nameOnCard: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({
        cardNumberError: "",
        nameOnCardError: "",
        expiryMonthError: "",
        expiryYearError: "",
        cvvError: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset error message when user starts typing
        setErrors({
            ...errors,
            [`${name}Error`]: "",
        });
    };

    const validateInputs = () => {
        let isValid = true;
        const newErrors = {};

        const { cardNumber, nameOnCard, expiryMonth, expiryYear, cvv } = formData;

        if (!/^[0-9]{16}$/.test(cardNumber)) {
            newErrors.cardNumberError = "Invalid Card Number";
            isValid = false;
        }

        if (!/^[a-zA-Z\s]+$/.test(nameOnCard)) {
            newErrors.nameOnCardError = "Invalid Card Name";
            isValid = false;
        }

        if (!/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
            newErrors.expiryMonthError = "Invalid Month";
            isValid = false;
        }

        const currentYear = new Date().getFullYear();
        if (
            !/^\d{4}$/.test(expiryYear) ||
            parseInt(expiryYear) < currentYear ||
            parseInt(expiryYear) > currentYear + 3
        ) {
            newErrors.expiryYearError = "Invalid Year";
            isValid = false;
        }

        if (!/^[0-9]{3}$/.test(cvv)) {
            newErrors.cvvError = "Invalid CVV";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };
  
  return (
    <div>
      <img src={card} alt="card" className="cardImg" />
      <img src={card2} alt="card2" className="card2Img" />
      <img src={backCard} alt="backCard" className="backCard" />

      <div className="formContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          
          <div className="nameInput">
            <label className="cardholderName-label">CARDHOLDER NAME:</label>
            <br />
            <input 
              type="text" 
              className="cardholderName-input" 
              placeholder="e.g. Sweta Mishra" 
              value={formData.nameOnCard}
              onChange={handleChange}
              required
              id="nameOnCard"
            />
            <p className="error-message">
              {errors.nameOnCardError}
            </p>
          </div>
       
          <div className="numberInput">
            <label className="cardholderNumber-label">CARD NUMBER:</label>
            <br />
            <input 
              type="text" 
              className="cardholderNumber-input" 
              placeholder="e.g. 1234 5678 9123 0000"  
              value={formData.cardNumber}
              onChange={handleChange}
              required
              id="cardNumber"
            />
            <p className="error-message">
              {errors.cardNumberError}
            </p>
          </div>
         
          <div className="lastLine">
            <div className="expDate">
              <label className="date-label">EXP DATE:</label>
              <br />
              <input 
                type="number" 
                className="month-input" 
                placeholder="MM" 
                value={formData.expiryMonth}
                onChange={handleChange}
                required
                id="expiryMonth"
              />
              <p className="error-message">
                {errors.expiryMonthError}
              </p>
              <input 
                type="number" 
                className="year-input" 
                placeholder="YY"  
                value={formData.expiryYear}
                onChange={handleChange}
                required
                id="expiryYear"
              />
              <p className="error-message">
                {errors.expiryYearError}
              </p>
            </div>
            <div className="cvc">
              <label className="cvc-label">CVC:</label>
              <br />
              <input 
                type="number" 
                className="cvc-input" 
                placeholder="e.g. 123" 
                value={formData.cvv}
                onChange={handleChange}
                required
                id="cvv"
              />
              <p className="error-message">
                {errors.cvvError}
              </p>
            </div>
          </div>
        </form>
        <button className="submit"  disabled={!validateInputs()}> CONFIRM </button>
      </div>
    </div>
  );
}

export default FirstComp;

*/
