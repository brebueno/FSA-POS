export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('data')
  const existing = await storage.getItem<any[]>('courses') ?? []
  const newCourse = { ...body, id: body.id || Date.now() }
  await storage.setItem('courses', [...existing, newCourse])
  return newCourse
})
