import { courses as staticCourses } from '~/data/courses'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  let courses = await storage.getItem<any[]>('courses')
  if (!courses) {
    courses = staticCourses as any[]
    await storage.setItem('courses', courses)
  }
  return courses
})
