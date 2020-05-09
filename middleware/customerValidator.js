const { body, validationResult } = require('express-validator');
const customerValidationRules = () => {
  return [
    // username must be an email
    body('email')
      .not().isEmpty()
      .isEmail(),
    // password must be at least 7 chars long
    body('name')
      .not().isEmpty()
      .isLength({ min: 7 }),
    // phoneNumber must be a Nigerian number
    body('phoneNumber')
      .isLength({ min: 10, max: 15 })
      .withMessage('Mobile Number must between 10 to 15 characters long')
      .matches(/^[+-\d]+$/)
      .withMessage('Mobile Number must be a valid Nigerian number'),
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