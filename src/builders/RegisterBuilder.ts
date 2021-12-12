import { ValidationError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import { TYPES_WITH_METADATA } from '@Constants/register'
import Poultry from '@Entities/PoultryEntity'
import Register from '@Entities/RegisterEntity'
import RegisterTypeEnum from '@Enums/RegisterTypeEnum'
import { vaccinationRegisterSchema } from '@Schemas/RegisterSchemas'

const metadataSchemas: Record<string, any> = {
  [RegisterTypeEnum.Vaccination]: vaccinationRegisterSchema,
}

export default class RegisterBuilder {
  private _poultry: Poultry;
  private _type: string;
  private _description: string;
  private _metadata: Record<string, any>;
  private _date: Date;

  setDate(date: string) {
    if (date) {
      this._date = new Date(date)
    }

    return this
  }

  setMetadata(metadata: Record<string, any>) {
    this._metadata = metadata

    return this
  }

  setDescription(description: string) {
    this._description = description

    return this
  }

  setPoultry(poultry: Poultry) {
    this._poultry = poultry

    return this
  }

  setType(type: string) {
    this._type = type

    return this
  }

  validateMetadata() {
    const metadata = this._metadata
    const type = this._type
    const schema = metadataSchemas?.[type]

    const { error } = schema?.validate(metadata) ?? { error: undefined }

    if (error) {
      const errorMessage = error.message.toString()

      throw new ValidationError(errorMessage)
    }
  }

  validate() {
    const type = this._type as RegisterTypeEnum
    const metadata = this._metadata
    const hasMetadata = Boolean(Object.values(metadata).length)
    const typeHasMetadata = TYPES_WITH_METADATA.includes(type)

    if (!typeHasMetadata && hasMetadata) {
      throw new ValidationError(i18n.__('register.errors.invalid-metadata'))
    }

    if (hasMetadata && typeHasMetadata) {
      this.validateMetadata()
    }
  }

  build = (): Register => {
    this.validate()

    const register = new Register()

    register.type = this._type
    register.description = this._description
    register.poultry = this._poultry 
    register.metadata = this._metadata

    if (this._date) {
      register.date = this._date
    }

    return register
  }
}
