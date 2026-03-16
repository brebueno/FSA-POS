export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('data')
  const existing = (await storage.getItem<any>('settings')) ?? {}
  const updated = { ...existing, ...body }
  await storage.setItem('settings', updated)
  return updated
})
