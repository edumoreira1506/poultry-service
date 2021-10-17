import { AccountServiceClient } from '@cig-platform/core'
import { breederFactory, breederUserFactory } from '@cig-platform/factories'

import BreederUserBuilder from '@Builders/BreederUserBuilder'
import i18n from '@Configs/i18n'

describe('BreederUserBuilder', () => {
  describe('.build', () => {
    it('a valid breeder user', async () => {
      const mockGetUser = jest.fn().mockReturnValue({})

      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id })
      const breederUserBuilder = await new BreederUserBuilder()
        .setBreeder(breeder as any)
        .setUserId(breederUser.userId)

      expect(await breederUserBuilder.build()).toMatchObject({
        userId: breederUser.userId,
        breederId: breederUser.breederId
      })
      expect(mockGetUser).toHaveBeenCalledWith(breederUser.userId)
    })

    it('throwns an error when the getUser returns null', async () => {
      const mockGetUser = jest.fn().mockReturnValue(null)

      jest.spyOn(AccountServiceClient.prototype, 'getUser').mockImplementation(mockGetUser)

      const breeder = breederFactory()
      const breederUser = breederUserFactory({ breederId: breeder.id })
      const breederUserBuilder = await new BreederUserBuilder()
        .setBreeder(breeder as any)
        .setUserId(breederUser.userId)

      await expect(breederUserBuilder.build).rejects.toThrow(i18n.__('breeder-user.errors.invalid-user'))
    })
  })
})
