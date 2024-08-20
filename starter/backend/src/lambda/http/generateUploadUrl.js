import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { generateFileUrl } from '../../fileStorage/attachmentUtils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('http')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Starting generateUploadUrl event')
    const todoId = event.pathParameters.todoId
    const url = await generateFileUrl(todoId)
    logger.info('Completing generateUploadUrl event')

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  })
