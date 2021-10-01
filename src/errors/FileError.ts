import { ApiError } from '@cig-platform/core'

import i18n from '@Configs/i18n'

export default class FileError extends ApiError {
  constructor() {
    super(i18n.__('errors.invalid-file'))

    this.name = 'FileError'
  }
}
