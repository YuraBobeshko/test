import React from 'react';

import validateField from '../validateField/validateField';

class FormAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: JSON.parse(localStorage.getItem("userList")) || [],
      name: "",
      secondName: "",
      sex: "",
      loyalty: "",
      card: "",
      phrase: "phrase",
      id: JSON.parse(localStorage.getItem("id")) || 0,
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

    async componentDidMount() {
      const respons = await fetch('https://meowfacts.herokuapp.com/');
      const phrase = await respons.json();
      this.setState({phrase: phrase.data})
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
    alert(`пользователь ${name} ${secondName} ${id} \nпол:${sex} П.Л. ${loyalty} создан`);

    userListMut.push({
      name: name,
      secondName: secondName,
      sex: sex,
      loyalty: loyalty,
      card: card === "" ? "-" : card,
      data: new Date().toLocaleDateString(),
      id: id
    });
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
    const noValidName = "Имя должно содержать только кириллицу и быть больше 2 символов и меньше 9";
    const noValidSecondName = "Фамилия должна содержать только кириллицу и быть больше 2 символов и меньше 15";
    const noValidSecondCard = "введите номер карты состоящий из 8 цифр или выберите пункт недоступна";

    if (this.state.userList !== []) {
      const stateJson = JSON.stringify(this.state.userList);
      localStorage.setItem("userList", stateJson);
      const idJson = JSON.stringify(this.state.id);
      localStorage.setItem("id", idJson)
    }

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
              {noValidName}
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
              {noValidSecondName}
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
              {noValidSecondCard}
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
            <p className="phrase">{this.state.phrase}</p>
        </section>
      </>
    );
  }
}

export default FormAdd;
