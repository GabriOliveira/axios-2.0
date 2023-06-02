import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default function EditUser({
  user,
  handleClose,
  atualizaUsuario,
  pegUsuarios,
}) {
  const [editedUser, setEditedUser] = useState(user);

  const auxiliadoraAtualizaUsuario = async () => {
    try {
      await atualizaUsuario(editedUser);
      handleClose();
      pegUsuarios();
    } catch (erros) {
      console.log(erros);
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Atualizar usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={auxiliadoraAtualizaUsuario}>
          Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
