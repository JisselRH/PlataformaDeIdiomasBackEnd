const avances = require('../models').avances;
const experiencia = require('../models').experiencia;
const tipo_entrenamientos = require('../models').tipo_entrenamientos;
const tipo_evaluacions = require('../models').tipo_evaluacions;
const { sequelize, Op } = require("sequelize");

const getAll = (request, response) => {
  const { id } = request.body;

  const dias = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const fecha = new Date();

  const primerdia = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-01`;

  const diaSemana = dias[new Date(primerdia).getDay() - 1];

  let monday = new Date();

  var aux = 0, experienciaAux;

  switch (diaSemana) {
    case 'Monday':
      aux = 0;
      break;
    case 'Tuesday':
      aux = -1;
      break;
    case 'Wednesday':
      aux = -2;
      break;
    case 'Thursday':
      aux = -3;
      break;
    case 'Friday':
      aux = -4;
      break;
    case 'Saturday':
      aux = -5;
      break;
    case 'Sunday':
      aux = -6;
      break;
  }

  monday.setDate(new Date(primerdia).getDate() + aux);

  monday = `${monday.getFullYear()
  }-${
    monday.getMonth() + 1
  }-${
    monday.getDate()}`;

  experiencia.findAll({
    attributes: ['fecha', 'acumulada_dia'],
    include: [
      {
        model: tipo_entrenamientos,
        attributes: ['tipo'],
        required: false
      }
    ],
    where: {
      id_user: id,
      fecha: {
        [Op.lte]: new Date(new Date(monday).getTime() + 816 * 60 * 60 * 1000)
      },
    },

    order: [
      ['id', 'ASC']
    ]
  }).then(experienciaExist => {
    avances.findAll({
      attributes: ['porcentaje'],
      as: 'avances',
      include: [
        {
          model: tipo_entrenamientos,
          attributes: ['tipo'],
          required: false
        },
         {
          model: tipo_evaluacions,
          attributes: [['tipo', 'tipo_eval']],
          required: false
        }
      ],
      where: {
        id_user: id
      }
    }).then(avances => response.status(200).json({experiencia: experienciaExist, avance: avances }))//agregar o enviar experiencia tambien
      .catch(error => response.status(400).send(error));

  }).catch(error => response.status(400).send(error));

};

const updateAchievement = (request, response) => {
  const { id, tipo, nota, tipo_eval,} = request.body;

  var porcentaje, id_avance;

  return avances.findAll({
    attributes: ['id', 'porcentaje'],
    where: {
      id_user: id,
      id_tipo_entrenamiento: tipo,
    }
  }).then(avanceExist => {
    if (avanceExist[0]?.['id'] === undefined) {

      //return avances.create({
      return avances.create({
        id_user: id,
        porcentaje: nota,
        fecha: new Date(),
        id_tipo_entrenamiento: tipo,
        id_tipo_evaluacion: tipo_eval
      })
        .then(avanceCreate => response.status(200).send(avanceCreate))
        .catch(error => response.status(400).send(error))
    }
    else {
      id_avance = avanceExist[0]['id'];
      porcentaje = avanceExist[0]['porcentaje'];

      console.log(avanceExist[0]['porcentaje']);

      if (porcentaje < nota) {
        //return avances.update(
        return avances.update(
          {
            porcentaje: nota
          },
          {
            where: {
              id: id_avance
            }
          })
          .then(avanceUpdate => response.status(200).send(avanceUpdate))
          .catch(error => response.status(400).send(error));

      } else {
        response.status(201).json({ "Avance ya tiene la mayor nota": porcentaje });
      }
    }
  }).catch((error) => {
    error => response.status(400).send(error)
  });

};

const updateExperience = (request, response) => {
  const { id, tipo, experienciaR } = request.body;

  /*const [user, created] = User.findOrCreate({
    where: { username: 'sdepold' },
    defaults: {
      job: 'Technical Lead JavaScript'
    }
  });*/

  var exp, id_exp;

  let fecha = new Date();

  fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

  return experiencia.findAll({
    attributes: ['id', 'experiencia'],
    where: {
      id_user: id,
      fecha: {
        [Op.gte]: fecha
      },
      id_tipo_entrenamiento: tipo,
    }
  }).then(experienciaExist => {

    if (experienciaExist[0]?.['id'] === undefined) {
      return experiencia.create({
        id_user: id,
        experiencia: experienciaR,
        id_tipo_entrenamiento: tipo,
        fecha: new Date()
      })
        .then(experienciaCr => response.status(200).send(experienciaCr))
        .catch(error => response.status(400).send(error))
    } else {

      id_exp = experienciaExist[0]['id'];
      exp = experienciaExist[0]['dataValues']['experiencia'];
      //exp = experienciaExist[0]['experiencia'];

      exp = Number(exp) + Number(experienciaR);

      return experiencia.update(
        {
          experiencia: exp
        },
        {
          where: {
            id: id_exp
          }
        })
        .then(experienciaUp => response.status(200).send(experienciaUp))
        .catch(error => response.status(400).send(error));

    }
  }).catch((error) => {
    error => response.status(400).send(error)
  });
};

module.exports = {
  getAll,
  updateAchievement,
  updateExperience,
};
