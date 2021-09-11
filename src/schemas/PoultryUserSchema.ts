import Joi from 'joi'

import i18n from '@Configs/i18n'

export const storePoultryUserSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('poultry-user.fields.user-id') }),
    'any.required': i18n.__('required-field', { field: i18n.__('poultry-user.fields.user-id') }),
    'string.guid': i18n.__('invalid-uuid', { field: i18n.__('poultry-user.fields.user-id') }),
  }),
}).options({ abortEarly: false })
