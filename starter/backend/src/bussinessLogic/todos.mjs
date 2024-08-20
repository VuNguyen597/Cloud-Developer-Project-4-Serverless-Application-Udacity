import * as uuid from 'uuid'
import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import {
  generateAttachmentUrl,
  getFormattedUrl
} from '../fileStorage/attachmentUtils.mjs'
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

  return await todosAccess.create({
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
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

export async function updateAttachedFileUrl(userId, todoId) {
  logger.info('Adding a attachment')
  const attachmentUrl = await getFormattedUrl(todoId)
  const uploadUrl = await generateAttachmentUrl(todoId)
  await todosAccess.updateAttachedFileUrl(userId, todoId, attachmentUrl)
  return uploadUrl
}
