import * as uuid from 'uuid'
import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('businessLogic')

const todosAccess = new TodosAccess()

export async function getToDosByUserId(userId) {
  logger.info('Getting the list of todos')
  return todosAccess.getToDosByUserId(userId)
}

export async function createTodo(newTodo, userId) {
  logger.info('Creating a new todo')
  const todoId = uuid.v4()
  const env = process.env.TODOS_S3_BUCKET

  return await todosAccess.create({
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: `https://${env}.s3.amazonaws.com/${todoId}`,
    ...newTodo
  })
}

export async function updateTodo(userId, todoId, updateTodo) {
  logger.info('Updating existing todo')
  return await todosAccess.update(userId, todoId, { ...updateTodo })
}

export async function deleteTodo(userId, todoId) {
  logger.info('Deleting a todo')
  return await todosAccess.delete(userId, todoId)
}
