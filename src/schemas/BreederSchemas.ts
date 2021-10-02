import Joi from 'joi'

import i18n from '@Configs/i18n'
import {
  AVAILABLE_PROVINCES,
  MAXIMUM_CHARACTERS_DESCRIPTION,
  MAXIMUM_CHARACTERS_NAME,
  MINIMUM_CHARACTERS_DESCRIPTION,
  MINIMUM_CHARACTERS_NAME,
} from '@Constants/breeder'

const CEP_REGEX = new RegExp(/^\d{5}-\d{3}$/)

const nameSchema = Joi.string().min(MINIMUM_CHARACTERS_NAME).max(MAXIMUM_CHARACTERS_NAME).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.name') }),
  'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.name') })
})

const descriptionSchema = Joi.string().min(MINIMUM_CHARACTERS_DESCRIPTION).max(MAXIMUM_CHARACTERS_DESCRIPTION).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.name') }),
})

const foundationDateSchema = Joi.date().messages({
  'date.base': i18n.__('invalid-date', { field: i18n.__('breeder.fields.foundation-date') })
})

const addressSchema = Joi.object({
  city: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.address.city') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.address.city') })
  }),
  province: Joi.string().required().valid(...AVAILABLE_PROVINCES) .messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.address.province') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.address.province') }),
    'any.only': i18n.__('breeder.errors.invalid-address-province')
  }),
  street: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.address.street') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.address.street') })
  }),
  zipcode: Joi.string().required().regex(CEP_REGEX).messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.address.zipcode') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.address.zipcode') }),
    'string.pattern.base': i18n.__('breeder.errors.invalid-address-zipcode')
  }),
  number: Joi.number().required().min(1).messages({
    'number.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.address.number') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.address.number') }),
    'number.min': i18n.__('breeder.errors.invalid-address-number')
  }),
})

export const storeBreederSchema = Joi.object({
  name: nameSchema.required(),
  description: descriptionSchema,
  address: addressSchema,
  foundationDate: foundationDateSchema,
}).options({ abortEarly: false })

export const updateBreederSchema = Joi.object({
  name: nameSchema,
  description: descriptionSchema,
  address: Joi.string(),
  foundationDate: foundationDateSchema
}).options({ abortEarly: false })
