import Joi from 'joi'

import { MINIMUM_CHARACTERS_DESCRIPTION, MAXIMUM_CHARACTERS_DESCRIPTION } from '@Constants/register'
import i18n from '@Configs/i18n'
import RegisterTypeEnum from '@Enums/RegisterTypeEnum'

const descriptionSchema = Joi.string().min(MINIMUM_CHARACTERS_DESCRIPTION).max(MAXIMUM_CHARACTERS_DESCRIPTION).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('register.fields.description') }),
  'any.required': i18n.__('required-field', { field: i18n.__('register.fields.description') })
})

const typeSchema = Joi.string().required().valid(...Object.values(RegisterTypeEnum)) .messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('register.fields.type') }),
  'any.required': i18n.__('required-field', { field: i18n.__('register.fields.type') }),
  'any.only': i18n.__('register.errors.invalid-type')
})

export const storeRegisterSchema = Joi.object({
  description: descriptionSchema,
  type: typeSchema
})
