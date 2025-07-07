## 使い方
```yaml
uses: t-fujisaka-d1g/google-chat-notify
with:
  webhook-url: <Webhook URL>
  message: <送信するメッセージ>
```

```yaml
uses: t-fujisaka-d1g/google-chat-notify
with:
  webhook-url: <Webhook URL>
  message: <送信するメッセージ>
  icon: <ワークフローリンクなどの前に配置するテキスト>
```

## パラメータ
| パラメータ名 | 必須 | 説明 |
|:---|:---:|:---|
|webhook-url |必須 |Google Chat Webhook URL ([取得方法](https://developers.google.com/hangouts/chat/how-tos/webhooks#define_an_incoming_webhook)) |
|message |必須 |送信するメッセージ |
|icon | |ワークフローリンクなどの前に配置するテキスト |
