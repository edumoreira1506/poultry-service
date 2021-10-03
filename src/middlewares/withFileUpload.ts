import { Response, NextFunction } from 'express'
import { ApiErrorType } from '@cig-platform/types'
import { BaseController } from '@cig-platform/core'

import { ALLOWED_DOCUMENT_TYPES } from '@Constants/document'
import S3 from '@Services/S3Service'
import FileError from '@Errors/FileError'
import { RequestWithFile } from '@Types/requests'
import { createImagePath } from '@Utils/path'

export const withFileUploadFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response) => (req: RequestWithFile, res: Response, next: NextFunction) => {
  if (Array.isArray(req.files)) {
    const files = req?.files ?? []
    const hasSomeInvalidFile = files.some((file) => (
      ALLOWED_DOCUMENT_TYPES.every(documentType => !file.originalname.endsWith(documentType))
    ))
  
    if (hasSomeInvalidFile) return errorCallback(res, new FileError().getError())
  
    const fileNames: string[] = []
  
    files.forEach((file) => {
      const filePath = createImagePath({ folder: 'breeders', subfolder: 'profile', fileName: file.originalname })
      const [fileName] = filePath.split('/').reverse()

      fileNames.push(fileName)
  
      S3.upload(file, filePath)
    })
  
    req.fileNames = fileNames
  }

  next()
}

export default withFileUploadFactory(BaseController.errorResponse)
