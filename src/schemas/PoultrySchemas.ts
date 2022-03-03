import Joi from 'joi'
import {
  PoultryTypeEnum,
  PoultryDewlapEnum,
  PoultryCrestEnum,
  PoultryTailEnum,
  PoultryColorEnum,
  PoultryGenderCategoryEnum,
  PoultryGenderEnum
} from '@cig-platform/enums'

import i18n from '@Configs/i18n'
import {
  MAXIMUM_CHARACTERS_DESCRIPTION,
  MAXIMUM_CHARACTERS_NAME,
  MINIMUM_CHARACTERS_DESCRIPTION,
  MINIMUM_CHARACTERS_NAME,
} from '@Constants/poultry'
import { MAXIMUM_CHARACTERS_REGISTER, MINIMUM_CHARACTERS_REGISTER } from '@Constants/breeder'

const typeSchema = Joi.string().valid(...Object.values(PoultryTypeEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.type') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.type') }),
  'any.only': i18n.__('poultry.errors.invalid-type')
})

const tailSchema = Joi.string().valid(...Object.values(PoultryTailEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.tail') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.tail') }),
  'any.only': i18n.__('poultry.errors.invalid-tail')
})

const crestSchema = Joi.string().valid(...Object.values(PoultryCrestEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.crest') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.crest') }),
  'any.only': i18n.__('poultry.errors.invalid-crest')
})

const dewlapSchema = Joi.string().valid(...Object.values(PoultryDewlapEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.dewlap') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.dewlap') }),
  'any.only': i18n.__('poultry.errors.invalid-dewlap')
})

const genderSchema = Joi.string().valid(...Object.values(PoultryGenderEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.gender') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.gender') }),
  'any.only': i18n.__('poultry.errors.invalid-gender')
})

const genderCategorySchema = Joi.string().valid(...Object.values(PoultryGenderCategoryEnum)).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.gender-category') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.gender-category') }),
  'any.only': i18n.__('poultry.errors.invalid-gender-category')
})

const birthDateSchema = Joi.date().messages({
  'date.base': i18n.__('invalid-date', { field: i18n.__('poultry.fields.birth-date') })
})

const colorsSchema = Joi.object({
  plumage: Joi.string().valid(...Object.values(PoultryColorEnum)).messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.plumage') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.plumage') }),
    'any.only': i18n.__('poultry.errors.invalid-color')
  }),
  shins: Joi.string().valid(...Object.values(PoultryColorEnum)).messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.shins') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.shins') }),
    'any.only': i18n.__('poultry.errors.invalid-color')
  }),
  eyes: Joi.string().valid(...Object.values(PoultryColorEnum)).messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.colors.eyes') }),
    'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.colors.eyes') }),
    'any.only': i18n.__('poultry.errors.invalid-color')
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

const descriptionSchema = Joi.string().min(MINIMUM_CHARACTERS_DESCRIPTION).max(MAXIMUM_CHARACTERS_DESCRIPTION).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.description') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.description') })
})

const registerSchema = Joi.string().min(MINIMUM_CHARACTERS_REGISTER).max(MAXIMUM_CHARACTERS_REGISTER).messages({
  'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.register') }),
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.register') })
})

const forSaleSchema = Joi.boolean().messages({
  'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.for-sale') })
})

const currentAdvertisingPriceSchema = Joi.number().allow(null)

export const storePoultrySchema = Joi.object({
  type: typeSchema.required(),
  tail: tailSchema,
  birthDate: birthDateSchema,
  colors: colorsSchema,
  videos: videosSchema,
  gender: genderSchema.required(),
  genderCategory: genderCategorySchema.required(),
  name: nameSchema,
  register: registerSchema,
  dewlap: dewlapSchema,
  crest: crestSchema,
  description: descriptionSchema
})

export const transferPoultrySchema = Joi.object({
  breederId: Joi.string().required()
})

export const updatePoultrySchema = Joi.object({
  type: typeSchema,
  birthDate: birthDateSchema,
  colors: colorsSchema,
  videos: videosSchema,
  name: nameSchema,
  genderCategory: genderCategorySchema,
  register: registerSchema,
  dewlap: dewlapSchema,
  crest: crestSchema,
  tail: tailSchema,
  description: descriptionSchema,
  forSale: forSaleSchema,
  currentAdvertisingPrice: currentAdvertisingPriceSchema
})
