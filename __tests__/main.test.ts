import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('test', () => {
  expect(true).toBeTruthy()
})

// const webhookUrl = '****'
// const topicId = '****'
// test('test runs1', () => {
//   process.env['INPUT_WEBHOOK-URL'] = webhookUrl
//   process.env['INPUT_MESSAGE'] = '送信テスト1'
//
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })
// test('test runs1', () => {
//   process.env['INPUT_WEBHOOK-URL'] = webhookUrl
//   process.env['INPUT_TOPIC-ID'] = topicId
//   process.env['INPUT_MESSAGE'] = '送信テスト2'
//
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })
