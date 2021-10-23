import Joi from 'joi'

import i18n from '@Configs/i18n'
import PoultryTypeEnum from '@Enums/PoultryTypeEnum'
import PoultryGenderEnum from '@Enums/PoultryGenderEnum'
import { MAXIMUM_CHARACTERS_NAME, MINIMUM_CHARACTERS_NAME } from '@Constants/poultry'
import { MAXIMUM_CHARACTERS_REGISTER, MINIMUM_CHARACTERS_REGISTER } from '@Constants/breeder'

const typeSchema = Joi.string().valid(...Object.values(PoultryTypeEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.type') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.type') }),
  'any.only': i18n.__('poultry.errors.invalid-type')
})

const genderSchema = Joi.string().valid(...Object.values(PoultryGenderEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.gender') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.gender') }),
  'any.only': i18n.__('poultry.errors.invalid-gender')
})

const birthDateSchema = Joi.date().messages({
  'date.base': i18n.__('invalid-date', { field: i18n.__('poultry.fields.birth-date') })
})

const colorsSchema = Joi.object({
  plumage: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.plumage') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.plumage') })
  }),
  shins: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.shins') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.shins') })
  }),
  eyes: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.eyes') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.eyes') })
  }),
})

const videosSchema = Joi.object({
  walking: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.videos.walking') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.videos.walking') })
  }),
  presentation: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.videos.presentation') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.videos.presentation') })
  }),
  measurement: Joi.string().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.videos.measurement') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.videos.measurement') })
  }),
})

const nameSchema = Joi.string().min(MINIMUM_CHARACTERS_NAME).max(MAXIMUM_CHARACTERS_NAME).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.name') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.name') })
})

const registerSchema = Joi.string().min(MINIMUM_CHARACTERS_REGISTER).max(MAXIMUM_CHARACTERS_REGISTER).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.register') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.register') })
})

export const storePoultrySchema = Joi.object({
  type: typeSchema.required(),
  birthDate: birthDateSchema,
  colors: colorsSchema,
  videos: videosSchema,
  gender: genderSchema.required(),
  name: nameSchema,
  register: registerSchema
})

export const updatePoultrySchema = Joi.object({
  type: typeSchema,
  birthDate: birthDateSchema,
  colors: colorsSchema,
  videos: videosSchema,
  name: nameSchema,
  register: registerSchema
})
