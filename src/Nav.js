import React from 'react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import FormAdd from './FormAdd';
import ShowListUsers from './ShowListUsers';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };

    this.addUsers = this.addUsers.bind(this);
  }

  addUsers = (userList) => {
    this.setState({userList})
  }

  render() {
    return (
      <BrowserRouter>
        <header className={"header"}>
          <nav className={"nav"}>
            <ul className={"navList"}>
              <li className={"navList__item"}>
                <NavLink to="/" exact>Форма регистрации</NavLink>
              </li>
              <li className={"navList__item"}>
                <NavLink to="/userList">Список клиентов</NavLink>
              </li>
              <li className={"navList__item"}>
                <NavLink to="/info">Информация об авторе</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact>
            <FormAdd list={this.state.userList} func={this.addUsers} />
          </Route>
          <Route path="/userList">
            <section className={"section"}>
              <table className={"table"}>
                <thead>
                  <tr className={"table__tr"}>
                    <td className={"table__td"}>Имя</td>
                    <td className={"table__td"}>Фамилия</td>
                    <td className={"table__td"}>Пол</td>
                    <td className={"table__td"}>Программа лояльности</td>
                    <td className={"table__td"}>Номер карты</td>
                    <td className={"table__td"}>Время</td>
                  </tr>
                </thead>
                <tbody className={"tbody"}>
                  <ShowListUsers list={this.state.userList} />
                </tbody>
              </table>
            </section>
          </Route>
          <Route path="/info">
            <section className={"section"}>
              <ol class="rounded">
                <li><a className={"notActive"} href="#">Юрий Бобешко</a></li>
                <li><a className={"notActive"} href="#">HTML5/CSS3, SASS(SCSS), JavaScript(ES6), React</a></li>
                <li><a href="https://docs.google.com/document/d/18CiDxH0iUpZMcwsidRFXRsAzjl2zMiRCdZVPw3aZyqY/edit">Резюме</a></li>
                <li><a href="https://github.com/YuraBobeshko">Профиль github</a></li>
                <li><a href="https://github.com/YuraBobeshko/test/tree/Yura_test">Репозиторий этой страницы</a></li>
              </ol>
            </section>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Nav;