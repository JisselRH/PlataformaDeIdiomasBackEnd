const Sequelize = require('sequelize');
const md5 = require('md5');
const { usuarios } = require('../models');
const connectionsCtrl = require('../controllers/connections_controller');

module.exports = {

  createUser(request, response) {
    const {
      rut, pass, nombre, apellido, id_tipo,
    } = request.body;

    let passWord = pass;
    passWord = md5(passWord);

    return usuarios
      .create({
        rut,
        pass: passWord,
        nombre,
        apellido,
        id_tipo,
      })
      .then((usuarios) => response.status(200).send(usuarios))
      .catch((error) => response.status(400).send(error));
  },

  getUsers(_, response) {
    return usuarios.findAll({attributes: ['id', 'nombre', 'apellido', 'rut', ['id_tipo', 'tipo']],})
      .then((usuarios) => response.status(200).send(usuarios))
      .catch((error) => response.status(400).send(error));
  },

  getUser(request, response) {
    const { id } = request.body;
    return usuarios.findAll({
      attributes: ['id', 'nombre', 'apellido', 'rut', ['id_tipo', 'tipo']],
      where: {
        id,
      },
      raw: true,
      nest: true,
    })
      .then((usuario) => response.status(200).send(usuario))
      .catch((error) => response.status(400).send(error));
  },

  login(request, response) {
    const { rut, pass } = request.body;
    let passWord = pass;
    passWord = md5(passWord);

    return usuarios.findAll({
      attributes: ['id', 'nombre', 'apellido', 'rut', ['id_tipo', 'tipo']],
      where: {
        rut,
        pass: passWord,
      },
      raw: true,
      nest: true,
    }).then((usuario) => {
      if (usuario[0]?.id === undefined) {
        response.status(404).send('Rut o clave inválidos.');
      } else {
        if(usuario[0].tipo == 2)
          response.render('connections' , { connects: connectionsCtrl.readConnections()});
        else 
          response.status(200).json(usuario);
      }
    }).catch((error) => {
      (error) => response.status(400).send(error);
    });
  },

  updateUser(request, response) {
    const {
      id, pass, nombre, apellido,
    } = request.body;

    let passWord = pass;
    passWord = md5(passWord);

    usuarios.update(
      {
        pass: passWord,
        nombre,
        apellido,
      },
      {
        where: {
          id,
        },
      },
    )
      .then((usuarios) => response.status(200).send(usuarios))
      .catch((error) => response.status(400).send(error));
  },

  deleteUser(request, response) {
    const { id } = request.body;

    return usuarios
      .destroy({
        where: {
          id,
        },
      })
      .then((usuarios) => response.status(200).send(usuarios))
      .catch((error) => response.status(400).send(error));
  },

};
