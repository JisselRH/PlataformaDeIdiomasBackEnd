
const { sequelize, Op } = require("sequelize");
const fs = require('fs');


const updateConnections = (id, status, origin) => {

  var f = new Date();
  const name = f.getDate() + "-"+((f.getMonth())+1) + "-" +f.getFullYear();
  //console.log(name);;

  try {

    if (fs.existsSync(name) === false) {
    
      let objeto = [];

      objeto[0] = {
        iduser: id,
        status: status,
        origin: origin,
      };
      fs.writeFileSync(name, JSON.stringify(objeto));

    } else {
      let Datos = fs.readFileSync(name);
      Datos = JSON.parse(Datos);

      Datos[Datos.length] = {
        iduser: id,
        status: status,
        origin: origin,
      };

      fs.writeFileSync(name, JSON.stringify(Datos));
    }
  } catch (e) {
    console.log('**** Error ******' + e);
  }
};

const readConnections = () => {

  var f = new Date();
  const name = f.getDate() + "-"+((f.getMonth())+1) + "-" +f.getFullYear();

  try {

    if (fs.existsSync(name) === false) {
    
      return false;

    } else {

      let Datos = fs.readFileSync(name);
      Datos = JSON.parse(Datos);
      console.log(Datos);

      return Datos;
    }
  } catch (e) {

    return false;

  }
};

module.exports = {
  updateConnections,
  readConnections
};