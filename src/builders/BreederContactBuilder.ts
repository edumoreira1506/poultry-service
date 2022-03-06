import BreederContact from '@Entities/BreederContactEntity'
import Breeder from '@Entities/BreederEntity'

export default class BreederContactBuilder {
  private _type: string
  private _value: string
  private _breeder: Breeder

  setBreeder(breeder: Breeder): BreederContactBuilder {
    this._breeder = breeder

    return this
  }

  setType(type: string): BreederContactBuilder {
    this._type = type

    return this
  }

  setValue(value: string): BreederContactBuilder {
    this._value = value

    return this
  }

  build = (): BreederContact => {
    const breederContact = new BreederContact()

    breederContact.breederId = this._breeder.id
    breederContact.type = this._type
    breederContact.value = this._value

    return breederContact
  }
}
