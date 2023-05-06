const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'fuel-types',
      path: '/fuel-types',
      component: resolve(__dirname, 'pages/fuel-types.vue'),
    })
  })
}

export default PortfolioModule
