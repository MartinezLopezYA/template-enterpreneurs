import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export type AirtableRecord<T> = T & { id: string };

export async function getRecords<T>(
  tableName: string,
  options: Airtable.SelectOptions<Airtable.FieldSet> = {}
): Promise<AirtableRecord<T>[]> {
  const records = await base(tableName).select(options).all();
  return records.map((r) => ({ id: r.id, ...(r.fields as T) }));
}

export async function getRecord<T>(
  tableName: string,
  id: string
): Promise<AirtableRecord<T>> {
  const record = await base(tableName).find(id);
  return { id: record.id, ...(record.fields as T) };
}

export async function createRecord<T>(
  tableName: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const record = await base(tableName).create(fields as Airtable.FieldSet);
  return { id: record.id, ...(record.fields as T) };
}

export async function updateRecord<T>(
  tableName: string,
  id: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const record = await base(tableName).update(id, fields as Airtable.FieldSet);
  return { id: record.id, ...(record.fields as T) };
}

export async function deleteRecord(
  tableName: string,
  id: string
): Promise<void> {
  await base(tableName).destroy(id);
}

export { base };
