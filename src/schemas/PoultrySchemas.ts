import Joi from 'joi'

import i18n from '@Configs/i18n'
import { AVAILABLE_PROVINCES, MAXIMUM_CHARACTERS_DESCRIPTION, MAXIMUM_CHARACTERS_NAME, MINIMUM_CHARACTERS_DESCRIPTION, MINIMUM_CHARACTERS_NAME } from '@Constants/poultry'

const CEP_REGEX = new RegExp(/^\d{5}-\d{3}$/)

const nameSchema = Joi.string().min(MINIMUM_CHARACTERS_NAME).max(MAXIMUM_CHARACTERS_NAME).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.name') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.name') })
})

const descriptionSchema = Joi.string().min(MINIMUM_CHARACTERS_DESCRIPTION).max(MAXIMUM_CHARACTERS_DESCRIPTION).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.name') }),
})

const addressSchema = Joi.object({
  city: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.address.city') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.address.city') })
  }),
  province: Joi.string().required().valid(...AVAILABLE_PROVINCES) .messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.address.province') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.address.province') }),
    'any.only': i18n.__('poultry.errors.invalid-address-province')
  }),
  street: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.address.street') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.address.street') })
  }),
  zipcode: Joi.string().required().regex(CEP_REGEX).messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.address.zipcode') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.address.zipcode') }),
    'string.pattern.base': i18n.__('poultry.errors.invalid-address-zipcode')
  }),
  number: Joi.number().required().min(1).messages({
    'number.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.address.number') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.address.number') }),
    'number.min': i18n.__('poultry.errors.invalid-address-number')
  }),
})

export const storePoultrySchema = Joi.object({
  name: nameSchema.required(),
  description: descriptionSchema,
  address: addressSchema
}).options({ abortEarly: false })

export const updatePoultrySchema = Joi.object({
  name: nameSchema,
  description: descriptionSchema,
  address: addressSchema
}).options({ abortEarly: false })
