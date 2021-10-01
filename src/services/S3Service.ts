import AWS_SDK from 'aws-sdk'

import { AWS_ACCESS_KEY, AWS_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from '@Constants/s3'

const s3Provider = new AWS_SDK.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

export default class S3 { 
  static upload(file: Express.Multer.File, fileName: string) {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
    }

    s3Provider.upload(params, (err: any, data: { Location: string }) => {
      if (err) {
        console.log(`Error uploading ${fileName}`)
        return
      }

      console.log(`File uploaded successfully. ${data.Location}`)
    })
  }
}
