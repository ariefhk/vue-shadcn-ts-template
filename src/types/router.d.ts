import type { RouteRecordRaw } from 'vue-router'

declare module '*.route.ts' {
  const routes: RouteRecordRaw[]
  export default routes
}
