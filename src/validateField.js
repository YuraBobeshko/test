
function validateField (value, data, setValid, getValid) {
  const valid = getValid;
    switch (data) {
      case "nameValid":
        if(value.length >= 2 && value.length <= 8 && (value.replace(/[а-я]/ig, "") === "")) {
          valid.name = true;
        } else {
          valid.name = false;
        }
        break;
      case "secondNameValid":
        if(value.length >= 2 && value.length <= 14 && value.replace(/[а-я]/ig, "") === "") {
          valid.secondName = true;
        } else {
          valid.secondName = false;
        }
        break;
      case "sexValid":
          if(value !== "") {
            valid.sex = true;
          } else {
            valid.sex = false;
          }
        break;
      case "loyaltyValid":
          if(value !== "") {
            valid.loyalty = true;
          } else {
            valid.loyalty = false;
          }
          if (value === "card") {
            setValid({...valid, card: false}, false)
            valid.card = false;
          } else if (value !== "card") {
            setValid({...valid, card: true}, false)
            valid.card = true;
          }
        break;
      case "cardValid":
          if(value.length === 8 && value.replace(/\d/ig, "") === "") {
            valid.card = true;
          } else {
            valid.card = false;
          }
        break;
      default:
        break;
    }
    
    setValid({...valid}, 
      Object.values(valid).every(item => item === true))
}

export default validateField;