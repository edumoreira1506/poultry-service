import { poultryRegisterFactory } from '@cig-platform/factories'
import { RegisterTypeEnum } from '@cig-platform/enums'

import RegisterBuilder from '@Builders/RegisterBuilder'
import { TYPES_WITH_METADATA } from '@Constants/register'
import i18n from '@Configs/i18n'

const typesWithouthMetadata = Object.values(RegisterTypeEnum).filter(type => !TYPES_WITH_METADATA.includes(type))

describe('RegisterBuilder', () => {
  describe('.build', () => {
    it('a valid register', () => {
      const register = poultryRegisterFactory()
      const registerBuilder = new RegisterBuilder()
        .setDate(register.date.toString())
        .setDescription(register.description)
        .setType(register.type)
        .setMetadata({})

      expect(registerBuilder.build()).toMatchObject({
        description: register.description,
        type: register.type,
      })
    })

    typesWithouthMetadata.forEach((type) => {
      it(`throwns an error when has metadata and the type is ${type}`, () => {
        const register = poultryRegisterFactory({ type })
        const metadata = { a: 'oi' }
        const registerBuilder = new RegisterBuilder()
          .setDate(register.date.toString())
          .setDescription(register.description)
          .setType(register.type)
          .setMetadata(metadata)
  
        expect(registerBuilder.build).toThrow(i18n.__('register.errors.invalid-metadata'))
      })
    })
  })
})
