const { body, validationResult } = require('express-validator');

const taskValidationRules = () => [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').isISO8601().toDate().withMessage('Valid dueDate is required'),
  body('userId').notEmpty().withMessage('userId is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({ errors: errors.array() });
};

module.exports = { taskValidationRules, validate };
