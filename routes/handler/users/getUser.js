const {User} = require('../../../models');

module.exports = async(req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    // tentukan atribut yang akan diambil
    attributes : ['id', 'name', 'email', 'profession', 'role', 'avatar']
  });

  if(!user){
    return res.status(404).json({
      status : "error",
      message: "User not found"
    })
  }

  return res.json({
    status : "success",
    data: {
      user
    }
  })
}