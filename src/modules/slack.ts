import { IncomingWebhook } from '@slack/webhook'
import { SLACK_WEBHOOK_URL } from '../constants'

const client = new IncomingWebhook(SLACK_WEBHOOK_URL)

export const sendText = (text: string) => {
  client.send({ text })
}
