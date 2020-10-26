const {RefreshToken} = require('../../../models');

module.exports = async (req, res) => {
  const refToken = req.query.refresh_token;

  const token = await RefreshToken.findOne({
    where: {
      token: refToken
    }
  })

  if(!token){
    return res.status(400).json({
      status: "error",
      message: "Invalid token"
    })
  }

  return res.json({
    status: "success",
    token
  })
}