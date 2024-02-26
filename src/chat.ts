import axios from 'axios'

export type Params = {
  webhookUrl: string
  topicId: string | null
  text: string
}

export type Data = {
  text: string
  thread?: Thread
}
export type Thread = {
  name: string
}

/**
 * メッセージの返信オプション
 * https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create?hl=ja#MessageReplyOption
 */
export const MessageReplyOptions = {
  /**
   * デフォルト。新しいスレッドを開始します。
   * このオプションを使用すると、含まれる thread ID または threadKey がすべて無視されます。
   */
  OptionUnspecified: 'MESSAGE_REPLY_OPTION_UNSPECIFIED',
  /**
   * thread ID または threadKey で指定されたスレッドへの返信としてメッセージを作成します。
   * 失敗した場合は、代わりに新しいスレッドが開始されます。
   */
  FallBackToNewThread: 'REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD',
  /**
   * thread ID または threadKey で指定されたスレッドへの返信としてメッセージを作成します。
   * 新しい threadKey を使用すると、新しいスレッドが作成されます。
   * メッセージの作成に失敗した場合は、代わりに NOT_FOUND エラーが返されます。
   */
  OrFail: 'REPLY_MESSAGE_OR_FAIL'
} as const
export type MessageReplyOption =
  typeof MessageReplyOptions[keyof typeof MessageReplyOptions]

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
            text: params.text
          }
        : {
            text: params.text,
            thread: {
              name: threadName
            }
          }

    const messageReplyOption: MessageReplyOption =
      MessageReplyOptions.FallBackToNewThread

    const url = params.webhookUrl.includes('?')
      ? `${params.webhookUrl}&messageReplyOption=${messageReplyOption}`
      : `${params.webhookUrl}?messageReplyOption=${messageReplyOption}`

    await axios.post(url, data)
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
