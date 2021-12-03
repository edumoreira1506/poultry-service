import Poultry from '@Entities/PoultryEntity'
import Register from '@Entities/RegisterEntity'

export default class RegisterBuilder {
  private _poultry: Poultry;
  private _type: string;
  private _description: string;
  private _metadata: Record<string, any>;

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

  build = (): Register => {
    const register = new Register()

    register.type = this._type
    register.description = this._description
    register.poultry = this._poultry 
    register.metadata = this._metadata

    return register
  }
}
