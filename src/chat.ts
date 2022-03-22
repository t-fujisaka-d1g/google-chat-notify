import axios from 'axios'

export type Params = {
  webhookUrl: string
  topicId: string | null
  message: string
}

export type Data = {
  text: string
  thread?: Thread
}
export type Thread = {
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Chat {
  static async send(params: Params): Promise<void> {
    const threadName = this.calcThreadName(
      params.webhookUrl,
      params.topicId ?? null
    )
    const data: Data =
      threadName === null
        ? {
            text: params.message
          }
        : {
            text: params.message,
            thread: {
              name: threadName
            }
          }
    await axios.post(params.webhookUrl, data)
  }

  private static calcThreadName(
    webhookUrl: string,
    topicId: string | null
  ): string | null {
    const spaceId = this.calcSpaceId(webhookUrl)
    if (spaceId === null || topicId === null) {
      return null
    }
    return `spaces/${spaceId}/threads/${topicId}`
  }

  private static calcSpaceId(webhookUrl: string): string | null {
    return webhookUrl.split('/')[5]
  }
}
