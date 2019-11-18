import React from 'react';

function ShowListUsers(list) {
  const userList = list.list;
  return userList.map(user => {
    return (
      <tr className={"tbody__tr"} key={user.id}>
        <td className={"tbody__td"}>{user.name}</td>
        <td className={"tbody__td"}>{user.secondName}</td>
        <td className={"tbody__td"}>{user.sex}</td>
        <td className={"tbody__td"}>{user.loyalty}</td>
        <td className={"tbody__td"}>{user.card}</td>
        <td className={"tbody__td"}>{user.data}</td>
      </tr>
    );
  })
}

export default ShowListUsers;