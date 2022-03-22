import * as core from '@actions/core'
import {Chat, Params} from './chat'

async function run(): Promise<void> {
  try {
    const webhookUrl: string = core.getInput('webhook-url', {required: true})
    const message: string = core.getInput('message', {required: true})
    const topicId: string = core.getInput('topic-id')

    core.debug(`webhookUrl: ${webhookUrl}`)
    core.debug(`topicId: ${topicId}`)
    core.debug(`message: ${message}`)

    const params: Params = {
      webhookUrl,
      message,
      topicId: topicId.length === 0 ? null : topicId
    }
    const success = await Chat.send(params)

    core.debug(`success: ${success}`)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
