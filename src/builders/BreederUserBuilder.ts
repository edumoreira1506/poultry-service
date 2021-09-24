import { ValidationError, AccountServiceClient } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import { ACCOUNT_SERVICE_URL } from '@Constants/account'
import Breeder from '@Entities/BreederEntity'
import BreederUser from '@Entities/BreederUserEntity'

export default class BreederUserBuilder {
  private _userId = '';
  private _breeder: Breeder;

  setBreeder(breeder: Breeder): BreederUserBuilder {
    this._breeder = breeder

    return this
  }

  setUserId(userId: string): BreederUserBuilder {
    this._userId = userId

    return this
  }

  async validate(): Promise<void> {
    const accountServiceClient = new AccountServiceClient(ACCOUNT_SERVICE_URL)
    const user = await accountServiceClient.getUser(this._userId)

    if (!user) throw new ValidationError(i18n.__('breeder-user.errors.invalid-user'))
  }


  build = async (): Promise<BreederUser> => {
    await this.validate()

    const breederUser = new BreederUser()

    breederUser.userId = this._userId
    breederUser.breederId = this._breeder.id

    return breederUser
  }
}
