import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //仓库持久化

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from './modules/user'
// export { useUserStore }

// import { useCountStore } from './modules/counters'
// export { useCountStore }
export * from './modules/user'
export * from './modules/counters'
