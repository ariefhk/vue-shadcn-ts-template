import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * Autoload route
 * Will read file with prefix .router.js
 */

interface RouteModule {
  default: RouteRecordRaw[]
}

async function getRoutes(): Promise<RouteRecordRaw[]> {
  const routes: RouteRecordRaw[] = []
  const modules = import.meta.glob('/**/*.route.ts')

  for (const path in modules) {
    try {
      const module = (await modules[path]()) as RouteModule // Assert type to ensure type safety

      // debugging :D
      if (module.default) {
        console.log(`Module loaded from path: ${path}`, module.default)
        routes.push(...module.default)
      } else {
        console.warn(`No default export found in module at path: ${path}`)
      }
    } catch (error) {
      console.error(`Failed to load module at path: ${path}`, error)
    }
  }

  return routes
}

const autoLoadRoute = async () => {
  const routes = await getRoutes()

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
      return { top: 0 }
    },
    routes: [...routes]
  })

  return router
}

export default autoLoadRoute
