export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const storage = useStorage('data')
  const courses = await storage.getItem<any[]>('courses') ?? []
  const idx = courses.findIndex((c: any) => c.id === id)
  if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Curso não encontrado' })
  courses[idx] = { ...courses[idx], ...body }
  await storage.setItem('courses', courses)
  return courses[idx]
})
