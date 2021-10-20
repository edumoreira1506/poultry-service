import Joi from 'joi'

import BreederContactTypeEnum from '@Enums/BreederContactTypeEnum'
import i18n from '@Configs/i18n'

export const storeBreederContactSchema = Joi.object({
  type: Joi.string().required().valid(...Object.values(BreederContactTypeEnum)) .messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder-contact.fields.type') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder-contact.fields.type') }),
    'any.only': i18n.__('breeder-contact.errors.invalid-type')
  }).required(),
  value: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder-contact.fields.value') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder-contact.fields.value') })
  })
}).options({ abortEarly: false })
