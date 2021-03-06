export default {
  // 支持值为 Object 和 Array
  'GET /api/products': {
    data: [
      {
        id: 'p-1',
        shopIds: ['s-1', 's-1', 's-1'],
        shop: '院落创意菜',
        tag: '免预约',
        picture:
          'https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0',
        product: '「3店通用」百香果（冷饮）1扎',
        currentPrice: 19.9,
        oldPrice: 48,
        saleDesc: '已售6034',
      },
      {
        id: 'p-2',
        shopIds: ['s-2'],
        shop: '正一味',
        tag: '免预约',
        picture:
          'https://p0.meituan.net/deal/4d32b2d9704fda15aeb5b4dc1d4852e2328759.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0',
        product: '[5店通用] 肥牛石锅拌饭+鸡蛋羹1份',
        currentPrice: 29,
        oldPrice: 41,
        saleDesc: '已售15500',
      },
      {
        id: 'p-3',
        shopIds: ['s-3', 's-3'],
        shop: 'Salud冻酸奶',
        tag: '免预约',
        picture:
          'https://p0.meituan.net/deal/b7935e03809c771e42dfa20784ca6e5228827.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0',
        product: '[2店通用] 冻酸奶（小杯）1杯',
        currentPrice: 20,
        oldPrice: 25,
        saleDesc: '已售88719',
      },
      {
        id: 'p-4',
        shopIds: ['s-4'],
        shop: '吉野家',
        tag: '免预约',
        picture:
          'https://p0.meituan.net/deal/63a28065fa6f3a7e88271d474e1a721d32912.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0',
        product: '吉汁烧鱼+中杯汽水/紫菜蛋花汤1份',
        currentPrice: 14,
        oldPrice: 23.5,
        saleDesc: '已售53548',
      },
      {
        id: 'p-5',
        shopIds: ['s-5'],
        shop: '醉面 一碗醉香的肉酱面',
        tag: '免预约',
        picture:
          'https://p1.meituan.net/deal/a5d9800b5879d596100bfa40ca631396114262.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0',
        product: '单人套餐',
        currentPrice: 17.5,
        oldPrice: 20,
        saleDesc: '已售23976',
      },
    ],
  },

  // GET 可忽略
  '/api/users/1': { id: 1 },
};
