export default defineEventHandler(async () => {
  const storage = useStorage('data')
  return (await storage.getItem('settings')) ?? {}
})
