import { breederFactory } from '@cig-platform/factories'

import { createImagePath } from '@Utils/path'

describe('Path utils', () => {
  describe('createImagePath', () => {
    it('applies the folder', () => {
      const folder = 'folder'
      const fileName = breederFactory().profileImageUrl
      const imagePath = createImagePath({ folder, fileName })

      expect(imagePath.includes(folder)).toBeTruthy()
    })

    it('applies the subfolder', () => {
      const folder = 'folder'
      const subfolder = 'subfolder'
      const fileName = breederFactory().profileImageUrl
      const imagePath = createImagePath({ folder, fileName, subfolder })

      expect(imagePath.includes(subfolder)).toBeTruthy()
    })

    it('applies the filename', () => {
      const folder = 'folder'
      const fileName = breederFactory().profileImageUrl
      const imagePath = createImagePath({ folder, fileName })

      expect(imagePath.includes(fileName)).toBeTruthy()
    })
  })
})
