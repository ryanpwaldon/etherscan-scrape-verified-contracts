import { IncomingWebhook } from '@slack/webhook'

const client = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)

export const sendText = (text: string) => {
  client.send({ text })
}
