import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../bussinessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'

const logger = createLogger('http')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Starting createTodo event')
    const newTodo = JSON.parse(event.body)
    const userId = getUserId(event)
    const item = await createTodo(newTodo, userId)
    logger.info('Completing createTodo event')
    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    }
  })
