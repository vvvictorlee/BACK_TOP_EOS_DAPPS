exports.originCheck = function( req, res, next) {
  const origin = req.get('origin')
  if (process.env.NODE_ENV === 'production'){
    if (origin && origin.indexOf('topeosdapps.com') > -1) {
      next()
    }
    else {
      res.status(500).send({
        message: 'naughty boy'
      })
    }
  }
  else {
    next()
  }
}
