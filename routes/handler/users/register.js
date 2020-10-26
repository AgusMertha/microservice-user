const {User} = require('../../../models');
const bcrypt = require('bcrypt');

// panggil package fastest-validator
const Validator = require('fastest-validator');

// deklarasi validator
const v = new Validator();
module.exports = async (req, res) => {
  // buat skema validasi
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional"
  }

  // ambil data kemudian validasi
  const validate = v.validate(req.body, schema);

  // jika validasi berjalan dan ada error
  if(validate.length){
    return res.status(400).json({
      status: "error",
      message: validate
    });
  }

  // cek email apakah sudah ada yang menggunakan
  const emailCheck = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if(emailCheck){
    // 409 menandakan conflict berarti data sudah ada
    return res.status(409).json({
      status: "error",
      message : "email already exist"
    })
  }
  
  // hash password
  const password = await bcrypt.hash(req.body.password, 10);
  const data = {
    name: req.body.name,
    profession: req.body.profession,
    role: 'student',
    email: req.body.email,
    password : password,
  }

  // simpan ke db
  const create = await User.create(data);
  return res.json({
    status: "success",
    data : {
      id: create.id
    }
  })
}