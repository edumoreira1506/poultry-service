import Joi from 'joi'

import i18n from '@Configs/i18n'
import PoultryTypeEnum from '@Enums/PoultryTypeEnum'

export const storePoultrySchema = Joi.object({
  type: Joi.string().required().valid(...Object.values(PoultryTypeEnum)) .messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry.fields.type') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry.fields.type') }),
    'any.only': i18n.__('poultry.errors.invalid-type')
  }),
  birhtDate: Joi.date().messages({
    'date.base': i18n.__('invalid-date', { field: i18n.__('poultry.fields.birth-date') })
  }),
  colors: Joi.object({
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
  }),
  videos: Joi.object({
    walking: Joi.string().messages({
      'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.videos.walking') }),
      'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.videos.walking') })
    }),
    presentation: Joi.string().messages({
      'string.empty': i18n.__('empty-field', { field: i18n.__('breeder.fields.videos.presentation') }),
      'any.required': i18n.__('required-field', { field: i18n.__('breeder.fields.videos.presentation') })
    }),
  })
})
