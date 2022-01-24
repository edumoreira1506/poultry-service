import Joi from 'joi'
import { BreederContactTypeEnum } from '@cig-platform/enums'

import i18n from '@Configs/i18n'

const typeSchema = Joi.string().required().valid(...Object.values(BreederContactTypeEnum)) .messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('breeder-contact.fields.type') }),
  'any.required': i18n.__('required-field', { field: i18n.__('breeder-contact.fields.type') }),
  'any.only': i18n.__('breeder-contact.errors.invalid-type')
})

const valueSchema = Joi.string().messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('breeder-contact.fields.value') }),
  'any.required': i18n.__('required-field', { field: i18n.__('breeder-contact.fields.value') })
})

export const storeBreederContactSchema = Joi.object({
  type: typeSchema.required(),
  value: valueSchema.required()
}).options({ abortEarly: false })

export const updateBreederContactSchema = Joi.object({
  type: typeSchema,
  value: valueSchema
})
