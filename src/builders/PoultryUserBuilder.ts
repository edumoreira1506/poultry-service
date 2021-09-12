import { ValidationError, AccountServiceClient } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import { ACCOUNT_SERVICE_URL } from '@Constants/account'
import Poultry from '@Entities/PoultryEntity'
import PoultryUser from '@Entities/PoultryUserEntity'

export default class PoultryUserBuilder {
  private _userId = '';
  private _poultry: Poultry;

  setPoultry(poultry: Poultry): PoultryUserBuilder {
    this._poultry = poultry

    return this
  }

  setUserId(userId: string): PoultryUserBuilder {
    this._userId = userId

    return this
  }

  async validate(): Promise<void> {
    const accountServiceClient = new AccountServiceClient(ACCOUNT_SERVICE_URL)
    const user = await accountServiceClient.getUser(this._userId)

    if (!user) throw new ValidationError(i18n.__('poultry-user.errors.invalid-user'))
  }


  build = async (): Promise<PoultryUser> => {
    await this.validate()

    const poultryUser = new PoultryUser()

    poultryUser.userId = this._userId
    poultryUser.poultryId = this._poultry.id

    return poultryUser
  }
}
