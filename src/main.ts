import * as core from '@actions/core'
import * as github from '@actions/github'
import {Chat, Params} from './chat'
import {Context} from '@actions/github/lib/context'

function createLinks(context: Context): string[] {
  const links = []

  links.push(
    `<https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}|#${context.runNumber}>`
  )

  const pr = context.payload.pull_request
  if (pr) {
    links.push(
      `<https://github.com/${context.repo.owner}/${context.repo.repo}/pull/${pr.number}|#PR${pr.number}>`
    )
  }

  return links
}

async function run(): Promise<void> {
  try {
    const webhookUrl: string = core.getInput('webhook-url', {required: true})
    const message: string = core.getInput('message', {required: true})
    const icon: string = core.getInput('prefix')
    const topicId: string = core.getInput('topic-id')

    const texts:string[] =[]
    if(icon.length > 0) {
      texts.push(icon)
    }
    texts.push(...createLinks(github.context))
    if(message.length > 0) {
      texts.push(message)
    }

    const params: Params = {
      webhookUrl,
      text: texts.join(' '),
      topicId: topicId.length === 0 ? null : topicId
    }
    await Chat.send(params)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
