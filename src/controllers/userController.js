const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // if (firstName && lastName && username && email && password === '') {
    //   return res.status(200).send({
    //     message: 'field should not be empty',
    //   });
    // }

    const hashedPassword = bcrypt.hashSync(password, 8);

    let insertUser = await user.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    // const token = jwt.sign(
    //   {
    //     id: regis[0],
    //   },
    //   process.env.JWT_KEY,
    //   { expiresIn: 86400 }
    // );

    return res.status(200).send({
      message: 'register success',
      data: insertUser,
      //   token: token,
    });
  } catch (error) {
    return (
      res.status(500),
      send({
        message: 'error',
        code: 500,
      })
    );
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const data = await user.findAll();
    // const userId = req.params.id;

    return res.status(200).send({
      message: 'retrieve data user success',
      data: data,
    });
  } catch (error) {
    return (
      res.status(500),
      send({
        message: error.error,
        code: 500,
      })
    );
  }
};

exports.readme = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await user.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.status(404).send({
        message: 'user not found',
      });
    }

    return res.status(200).send({
      message: 'success retrieve data single user',
      data: data,
    });
  } catch (error) {
    return (
      res.status(500),
      send({
        message: error.error,
        code: 500,
      })
    );
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email } = req.body;
    const data = await user.findOne({
      where: { id: id },
    });
    const updateData = await user.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      { where: { id: id } }
    );
    res.status(201).send({
      message: 'update user data success',
      result: updateData,
    });
    re;
  } catch (error) {
    return (
      res.status(500),
      send({
        message: error.error,
        code: 500,
      })
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await user.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.status(404).send({
        message: 'user data not found, delete proccess canceled',
      });
    }
    const deleteUser = await user.destroy({
      where: { id: id },
    });

    return res.status(200).send({
      message: 'user data deleted',
      data: deleteUser,
    });
  } catch (error) {
    return (
      res.status(500),
      send({
        message: error.error,
        code: 500,
      })
    );
  }
};
