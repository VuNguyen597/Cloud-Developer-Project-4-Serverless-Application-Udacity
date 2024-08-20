import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const urlExpiration = process.env.SIGNED_URL_EXPIRATION
const bucket = process.env.TODOS_S3_BUCKET

export async function generateAttachmentUrl(id) {
  return await getSignedUrl(
    new S3Client(),
    new PutObjectCommand({
      Bucket: bucket,
      Key: id
    }),
    {
      expiresIn: urlExpiration
    }
  )
}

export async function getFormattedUrl(id) {
  return `https://${bucket}.s3.amazonaws.com/${id}`
}
