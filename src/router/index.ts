import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@/pages/auth/Login.vue') },
  { path: '/register', component: () => import('@/pages/auth/Register.vue') },
  { path: '/', component: () => import('@/pages/home/Home.vue') },
  { path: '/checkin', component: () => import('@/pages/home/Checkin.vue') },
  { path: '/lottery', component: () => import('@/pages/home/Lottery.vue') },
  { path: '/compose', component: () => import('@/pages/home/Compose.vue') },
  { path: '/swap', component: () => import('@/pages/home/Swap.vue') },
  { path: '/supply', component: () => import('@/pages/home/Supply.vue') },
  { path: '/vote', component: () => import('@/pages/home/Vote.vue') },
  { path: '/market', component: () => import('@/pages/market/MarketList.vue') },
  { path: '/market/:id', component: () => import('@/pages/market/CollectionDetail.vue') },
  { path: '/market/:id/order/:orderId', component: () => import('@/pages/market/OrderDetail.vue') },
  { path: '/market/:id/order/:orderId/pending', component: () => import('@/pages/market/PendingPayment.vue') },
  { path: '/discover', component: () => import('@/pages/market/Discover.vue') },
  { path: '/discover/:id', component: () => import('@/pages/market/AnnouncementDetail.vue') },
  { path: '/profile', component: () => import('@/pages/profile/Profile.vue') },
  { path: '/assets', component: () => import('@/pages/profile/Assets.vue') },
  { path: '/assets/:id', component: () => import('@/pages/profile/AssetDetail.vue') },
  { path: '/wallet', component: () => import('@/pages/profile/Wallet.vue') },
  { path: '/orders', component: () => import('@/pages/profile/Orders.vue') },
  { path: '/profile/info', component: () => import('@/pages/profile/PersonalInfo.vue') },
  { path: '/profile/security', component: () => import('@/pages/profile/SecuritySettings.vue') },
  { path: '/profile/settings', component: () => import('@/pages/profile/Settings.vue') },
  { path: '/profile/realname', component: () => import('@/pages/profile/RealNameAuth.vue') },
  { path: '/profile/operation-password', component: () => import('@/pages/profile/SetOperationPassword.vue') },
  { path: '/profile/change-password', component: () => import('@/pages/profile/ChangeLoginPassword.vue') },
  { path: '/invite', component: () => import('@/pages/profile/Invite.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
