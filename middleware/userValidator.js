const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    body("name")
      .not().isEmpty()
      .isLength({min: 5})
      .trim()
      .escape()
      .withMessage('Name must have more than 5 characters'),
    // email must be an email
    body('email')
      .not().isEmpty()
      .isEmail()
      .normalizeEmail(),
    // password must be at least 8 chars long
    body('password')
      .not().isEmpty()
      .isLength({ min: 8 })
      .withMessage('Password must have at least 8 characters'),
    // phoneNumber must be  Nigerian Number
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
  userValidationRules,
  validate
}