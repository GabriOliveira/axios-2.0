import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import "./UserList.css";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const pegUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:30000/usuarios");
      setUsers(resposta.data);
    } catch (erros) {
      console.log(erros);
    }
  };

  const criaUsuario = async (novoUsuario) => {
    try {
      await axios.post("http://localhost:30000/usuarios", novoUsuario);
      pegUsuarios();
    } catch (erros) {
      console.log(erros);
    }
  };

  const deletarUsuario = async (userId) => {
    const respostaConfirm = window.confirm(
      "Você realmente quer deletar esse usuário?"
    );
    if (respostaConfirm) {
      try {
        await axios.delete(`http://localhost:30000/usuarios/${userId}`);
        pegUsuarios();
      } catch (erros) {
        console.log(erros);
      }
    }
  };

  const auxiliarEdicao = (user) => {
    setEditUser(user);
    setEditModalShow(true);
  };

  const atualizaUsuario = async (atualizaUsuario) => {
    try {
      await axios.put(
        `http://localhost:30000/usuarios/${atualizaUsuario.id}`,
        atualizaUsuario
      );
      pegUsuarios();
    } catch (erros) {
      console.log(erros);
    }
  };

  useEffect(() => {
    pegUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <button
        className="btn btn-primary mb-2"
        onClick={() => setAddModalShow(true)}
      >
        Adicionar usuário
      </button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => auxiliarEdicao(user)}>Atualizar</button>
                <button onClick={() => deletarUsuario(user.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addModalShow && (
        <AddUser
          handleClose={() => setAddModalShow(false)}
          addUser={criaUsuario}
          pegUsuarios={pegUsuarios}
        />
      )}
      {editModalShow && (
        <EditUser
          user={editUser}
          handleClose={() => setEditModalShow(false)}
          atualizaUsuario={atualizaUsuario}
          pegUsuarios={pegUsuarios}
        />
      )}
    </div>
  );
}
