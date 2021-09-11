import { AccountServiceClient } from '@cig-platform/core'

import PoultryUserBuilder from '@Builders/PoultryUserBuilder'
import i18n from '@Configs/i18n'

import poultryFactory from '../factories/poultryFactory'
import poultryUserFactory from '../factories/poultryUserFactory'

describe('PoultryUserBuilder', () => {
  describe('.build', () => {
    it('a valid poultry user', async () => {
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id })
      const poultryUserBuilder = await new PoultryUserBuilder()
        .setPoultry(poultry)
        .setUserId(poultryUser.userId)

      expect(await poultryUserBuilder.build()).toMatchObject({
        userId: poultryUser.userId,
        poultryId: poultryUser.poultryId
      })
      expect(mockGetUser).toHaveBeenCalledWith(poultryUser.userId)
    })

    it('throwns an error when the getUser returns null', async () => {
      const mockGetUser = jest.fn().mockReturnValue(null)

      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const poultry = poultryFactory()
      const poultryUser = poultryUserFactory({ poultryId: poultry.id })
      const poultryUserBuilder = await new PoultryUserBuilder()
        .setPoultry(poultry)
        .setUserId(poultryUser.userId)

      await expect(poultryUserBuilder.build).rejects.toThrow(i18n.__('poultry-user.errors.invalid-user'))
    })
  })
})
