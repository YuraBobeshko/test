import React from 'react';

import Phrase from './Phrase';
import validateField from './validateField';

class FormAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      name: "",
      secondName: "",
      sex: "",
      loyalty: "",
      card: "",
      phrase: null,
      id: 0,
      formValid: false,
      valid: {
        name: "first",
        secondName: "first",
        sex: "first",
        loyalty: true,
        card: true
      }
    };

    this.setData = this.setData.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.setValid = this.setValid.bind(this);
    }

  setValid (valid, formValid) {
    this.setState({ formValid, valid });
  }

  setData(event, data) {
    const value = event.target.value;
    switch (data) {
      case "name":
        this.setState({ name: value }, () => {
          validateField(value, "nameValid", this.setValid, this.state.valid);
        });
        break;
      case "secondName":
        this.setState({ secondName: value }, () => {
          validateField(
            value,
            "secondNameValid",
            this.setValid,
            this.state.valid
          );
        });
        break;
      case "sex":
        this.setState({ sex: value }, () => {
          validateField(
            value, 
            "sexValid", 
            this.setValid, 
            this.state.valid
          );
        });
        break;
      case "loyalty":
        this.setState({ loyalty: value }, () => {
          validateField(
            value, 
            "loyaltyValid", 
            this.setValid, 
            this.state.valid
          );
        });
        break;
      case "card":
        this.setState({ card: value }, () => {
          validateField(
            value, 
            "cardValid", 
            this.setValid, 
            this.state.valid
          );
        });
        break;
      default:
        break;
    }
  }

  createNewUser(event) {
    let {userList, name, secondName, sex, loyalty, card, id} = this.state;
    const userListMut =  [...userList];
    console.log(userList)
    userListMut.push({
      name: name, 
      secondName: secondName, 
      sex: sex, 
      loyalty: loyalty,
      card: card === "" ? "-" : card, 
      data: new Date().toLocaleDateString(), 
      id: id,
    })
    this.setState(prevState => ({
      userList: userListMut,
      name: "",
      secondName: "",
      sex: "",
      loyalty: "",
      card: "",
      id: prevState.id = prevState.id + 1,
    }));
    this.props.func(userListMut);
    event.preventDefault();
  }
  
  render() {
    const {name, secondName, sex, card} = this.state.valid;
    
    return (
      <>
        <section className={"section"}>
          <form action="#" className={"form"}>
            <input
              placeholder={"Имя"}
              className={`${
                name === "first"
                  ? "firstInput"
                  : name === false
                  ? "notValid"
                  : "firstInput"
              }`}
              type="text"
              value={this.state.name}
              onChange={event => this.setData(event, "name")}
            />
            <div hidden={name} className={"noValidInput"}>
              Имя должно содержать только латиницу и быть больше 2 символов и меньше 9
            </div>
            <input
              placeholder={"Фамилия"}
              className={`${
                secondName === "first"
                  ? "firstInput"
                  : secondName === false
                  ? "notValid"
                  : "firstInput"
              }`}
              type="text"
              value={this.state.secondName}
              onChange={event => this.setData(event, "secondName")}
            />
            <div hidden={secondName} className={"noValidInput"}>
              Фамилия должна содержать только латиницу и быть больше 2 символов и меньше 15
            </div>
            <div className={"selectList"}>
              <label>
                <p>Пол:</p>
                <select
                  value={this.state.sex}
                  className={"select"}
                  onChange={event => this.setData(event, "sex")}
                >
                  <option value="" hidden={true}></option>
                  <option value="мужской">мужской</option>
                  <option value="женский">женский</option>
                </select>
                <div hidden={sex} className={"noValidSex"}>
                  выберете ваш пол
                </div>
              </label>
              <label>
                <p>Программа лояльности:</p>
                <select
                  value={this.state.loyalty}
                  className={"select"}
                  onChange={event => this.setData(event, "loyalty")}
                >
                  <option value="unavailable">недоступна</option>
                  <option value="card">пластиковая карта</option>
                  <option value="mobilApp">мобильное приложение</option>
                </select>
              </label>
            </div>
            <input
              placeholder={"Номер карты"}
              className={`${
                card === "first"
                  ? "firstInput"
                  : card === false
                  ? "notValid"
                  : "firstInput"
              }`}
              onChange={event => this.setData(event, "card")}
              type="text"
              hidden={this.state.loyalty !== "card"}
            />
            <div hidden={card} className={"noValidInput"}>
              введите номер карты состоящий из 8 цифр или выберите пункт
              недоступна
            </div>
            <button
              className={`button ${
                this.state.formValid === true ? "activeButton" : ""
              }`}
              onClick={this.createNewUser}
              disabled={!this.state.formValid}
            >
              Сохранить
            </button>
          </form>
          <Phrase />
        </section>
      </>
    );
  }
}

export default FormAdd;
