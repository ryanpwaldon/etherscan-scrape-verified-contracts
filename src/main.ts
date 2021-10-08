require('dotenv').config()
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { airtable } from './modules/airtable'
import { AIRTABLE_TABLE_NAME } from './constants'

const main = async () => {
  try {
    const lastAddress = (await airtable.findLatest(AIRTABLE_TABLE_NAME))?.fields.address
    console.log(lastAddress)
    const document = new JSDOM((await axios.get('https://etherscan.io/contractsVerified')).data).window.document
    const rows = Array.from(document.querySelectorAll('#transfers > div > table > tbody > tr'))
    const newRecords = []
    for (const row of rows) {
      const name = row.querySelector('td:nth-child(2)')?.textContent
      const address = row.querySelector('td:nth-child(1) a')?.textContent
      if (address === lastAddress) break
      const newRecord: any = { fields: { name, address } }
      newRecords.push(newRecord)
    }
    await airtable.createMany(AIRTABLE_TABLE_NAME, newRecords.reverse())
    console.log('Done!')
  } catch (err) {
    console.log(err)
  }
}

main()
