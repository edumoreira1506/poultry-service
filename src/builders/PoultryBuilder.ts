import { ValidationError } from '@cig-platform/core'
import { IPoultryColors, IPoultryVideos } from '@cig-platform/types'

import Poultry from '@Entities/PoultryEntity'
import PoultryTypeEnum from '@Enums/PoultryTypeEnum'

export default class PoultryBuilder {
  private _type: string;
  private _birthDate: Date;
  private _colors: IPoultryColors;
  private _videos: IPoultryVideos;

  setType(type: string) {
    this._type = type

    return this
  }

  setBirthDate(birthDate: Date) {
    this._birthDate = birthDate

    return this
  }

  setColors(colors: IPoultryColors) {
    this._colors = colors

    return this
  }

  setVideos(videos: IPoultryVideos): PoultryBuilder {
    this._videos = videos

    return this
  }

  validate(): void {
    const allowedTypes = Object.values(PoultryTypeEnum) as string[]

    if (!allowedTypes.includes(this._type)) {
      throw new ValidationError(i18n.__('poultry.errors.invalid-type'))
    }
  }

  build = async (): Promise<Poultry> => {
    this.validate()

    const poultry = new Poultry()

    poultry.type = this._type
    poultry.birthDate = this._birthDate
    poultry.colors = this._colors
    poultry.videos = this._videos

    return poultry
  }
}
