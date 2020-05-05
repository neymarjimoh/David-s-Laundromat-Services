const { body, validationResult } = require('express-validator')
const customerValidationRules = () => {
  return [
    // username must be an email
    body('email').not().isEmpty().isEmail(),
    // password must be at least 7 chars long
    body('name').not().isEmpty().isLength({ min: 7 }),
    // phoneNumber must be numeric
    body('phoneNumber').not().isEmpty().isNumeric(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  customerValidationRules,
  validate,
}