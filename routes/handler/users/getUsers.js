const {User} = require('../../../models');

module.exports = async (req,res) => {
  // membuat variabel untuk filer data, jika tidak ada maka dibuat array kosong
  const userIds = req.query.user_ids || [];
  
  const sqlOptions = {
    attributes : ['id', 'name', 'email', 'profession', 'role', 'avatar']
  }

  if(userIds.length){
    sqlOptions.where = {
      id: userIds
    }
  }

  const users = await User.findAll(sqlOptions);

  return res.json({
    status : "success",
    data : {
      users
    }
  })
}