import { Response, NextFunction } from 'express'

import { ALLOWED_DOCUMENT_TYPES } from '@Constants/document'
import S3 from '@Services/S3Service'
import { BaseController } from '@cig-platform/core'
import FileError from '@Errors/FileError'
import { RequestWithFile } from '@Types/requests'

export default function withFileUpload(req: RequestWithFile, res: Response, next: NextFunction) {
  if (Array.isArray(req.files)) {
    const files = req?.files ?? []
    const hasSomeInvalidFile = files.some((file) => (
      ALLOWED_DOCUMENT_TYPES.every(documentType => !file.originalname.endsWith(documentType))
    ))
  
    if (hasSomeInvalidFile) return BaseController.errorResponse(res, new FileError().getError())
  
    const fileNames: string[] = []
  
    files.forEach((file) => {
      const fileName = `breeders/profile/${new Date().getTime()}-${file.originalname.trim()}`
  
      fileNames.push(fileName)
  
      S3.upload(file, fileName)
    })
  
    req.fileNames = fileNames
  }

  next()
}
