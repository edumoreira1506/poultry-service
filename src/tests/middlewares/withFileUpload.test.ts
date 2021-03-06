import FileError from '@Errors/FileError'
import { withFileUploadFactory } from '@Middlewares/withFileUpload'
import S3 from '@Services/S3Service'
import * as Path from '@Utils/path'

describe('withFileUpload', () => {
  it('calls next', () => {
    const request: any = {}
    const response: any = {}
    const errorCallback = jest.fn()
    const mockNext = jest.fn()

    const withFileUpload = withFileUploadFactory({ folder: '' }, errorCallback)

    withFileUpload(request, response, mockNext)

    expect(mockNext).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
  })

  it('calls errorCallback when is an invalid file', () => {
    const file = {
      originalname: 'file.pdf'
    }
    const request: any = {
      files: [file]
    }
    const response: any = {}
    const errorCallback = jest.fn()
    const mockNext = jest.fn()

    const withFileUpload = withFileUploadFactory({ folder: '' }, errorCallback)

    withFileUpload(request, response, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalledWith(response, new FileError().getError())
  })

  it('uploades the image on S3', () => {
    const file = {
      originalname: 'exemplo.png',
    }
    const request: any = {
      files: [file]
    }
    const response: any = {}
    const errorCallback = jest.fn()
    const mockNext = jest.fn()
    const mockUpload = jest.fn()
    const mockCreateImagePath = jest.fn().mockReturnValue(file.originalname)
    const folder = 'breeders'
    const subfolder = 'profile'

    jest.spyOn(S3, 'upload').mockImplementation(mockUpload)
    jest.spyOn(Path, 'createImagePath').mockImplementation(mockCreateImagePath)

    const withFileUpload = withFileUploadFactory({ folder, subfolder }, errorCallback)

    withFileUpload(request, response, mockNext)

    expect(mockNext).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockUpload).toHaveBeenCalledWith(file, file.originalname)
    expect(mockCreateImagePath).toHaveBeenCalledWith({ folder, subfolder, fileName: file.originalname })
    expect(request.fileNames).toStrictEqual([file.originalname])
  })
})
