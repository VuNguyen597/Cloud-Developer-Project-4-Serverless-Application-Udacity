import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateTodo } from '../../bussinessLogic/todos.mjs'
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
    logger.info('Starting updateToDo event')
    const updateRequest = JSON.parse(event.body)
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    await updateTodo(userId, todoId, updateRequest)
    logger.info('Completing updateToDo event')

    return {
      statusCode: 200
    }
  })
