import Airtable, { FieldSet, RecordData } from 'airtable'
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '../constants'

const client = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)

export const airtable = {
  async findLatest(table: string) {
    return (
      await client(table)
        .select({ sort: [{ field: 'timestamp', direction: 'desc' }] })
        .firstPage()
    )[0]
  },
  async createMany(table: string, records: RecordData<Partial<FieldSet>>[]) {
    for (const record of records) {
      record.fields.timestamp = Date.now()
      await client(table).create([record])
    }
  },
}
