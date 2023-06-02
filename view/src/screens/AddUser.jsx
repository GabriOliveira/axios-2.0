import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddUser({ addUser, handleClose, pegUsuarios }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoUsuario = {
      nome: nome,
      email: email,
      password: senha,
    };
    await addUser(novoUsuario);
    setNome("");
    setEmail("");
    setSenha("");
    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(valor) => setNome(valor.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(valor) => setEmail(valor.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Senha:</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={(valor) => setSenha(valor.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Adicionar Novo Usuário
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
