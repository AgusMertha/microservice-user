const {User} = require('../../../models');
const bcrypt = require('bcrypt');
// panggil package fastest-validator
const Validator = require('fastest-validator');

// deklarasi validator
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: "email|empty:false",
    password: "string|empty:false",
  }

  const validate = v.validate(req.body, schema);

  if(validate.length){
    return res.status(400).json({
      status: "error",
      message: validate
    });
  }

  // cek email apakah sesuai dengan db
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if(!user){
    return res.status(404).json({
      status: "error",
      message: "email not found"
    })
  }

  // cek password saat email sudah benar
  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if(!isValidPassword){
    return res.status(404).json({
      status: "error",
      message: "invalid password"
    })
  }

  return res.json({
    status: "success",
    data : {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar : user.avatar,
      profession: user.profession
    }
  })
}