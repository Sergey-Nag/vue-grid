Vue.component('item', {
  props: ['data', 'id'],
  data: function () {
    return {
      template: ''
    }
  },
  methods: {},
  mounted: function () {
  },
  template: `<div :id="id" :style="{backgroundColor: data.color.bg, borderColor: data.color.bc}" class="item in-list" :pfx="data.pfx" :item-method="data.name" :title="data.title"></div>`
})
