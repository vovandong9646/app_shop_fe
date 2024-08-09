export const horizontalMenu = [
  {
    title: 'Dashboard',
    icon: 'ic:baseline-dashboard',
    path: '/dashboard',
    children: [
      {
        title: 'Analytics',
        path: '/dashboard/analytics',
        children: [
          {
            title: 'Analytics 1',
            path: '/dashboard/analytics'
          },
          {
            title: 'Analytics 2',
            path: '/dashboard/ecommerce'
          }
        ]
      },
      {
        title: 'Ecommerce',
        path: '/dashboard/ecommerce'
      }
    ]
  },
  {
    title: 'Product',
    icon: 'fluent-mdl2:product-list',
    path: '/product'
  }
]
