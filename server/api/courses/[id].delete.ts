export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const storage = useStorage('data')
  const courses = await storage.getItem<any[]>('courses') ?? []
  await storage.setItem('courses', courses.filter((c: any) => c.id !== id))
  return { ok: true }
})
