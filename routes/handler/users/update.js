const {User} = require('../../../models');
const bcrypt = require('bcrypt');
// panggil package fastest-validator
const Validator = require('fastest-validator');

// deklarasi validator
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name : "string|empty:false",
    email : "email|empty:false",
    password: "string|optional|min:6",
    profession: "string|optional",
    avatar: "string|optional"
  }

  const validate = v.validate(req.body, schema);

  if(validate.length){
    return res.status(400).json({
      status : "error",
      message: validate
    })
  }

  const id = req.params.id;
  const user = await User.findByPk(id);

  // jika user tidak ditemukan
  if(!user){
    return res.status(404).json({
      status:"error",
      message: "user not found"
    })
  }

  // saat user ditemukan cek email request
  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({
      where: { email }
    });

    // jika email yang diinput terdapat di db dan bukan email miliknya sebelumnya
    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: 'error',
        message: 'email already exist'
      })
    }
  }
  
  const password = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password;
  const {
    name, profession, avatar
  } = req.body;

  await user.update({
    email,
    password,
    name,
    profession,
    avatar
  });

  return res.json({
    status : "success",
    data : {
      id: user.id,
      name,
      email
    }
  })
}