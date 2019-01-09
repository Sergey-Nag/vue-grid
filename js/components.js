Vue.component('item', {
  props: ['data', 'id'],
  data: function () {
    return {
      template: '',
      drag: false,
    }
  },
  methods: {
    addItem($event) {
      Items.avatar($event.target,$event.offsetX,$event.offsetY)
    },
    removeItem() {
      Items.removeAvatar()
    }
  },
  template: `
  <div :id="id" @mousedown.prevent="addItem" @mouseup="removeItem" :style="{backgroundColor: data.color.bg, borderColor: data.color.bc}" class="item in-list" :pfx="data.pfx" :item-method="data.name" :title="data.title"></div>`
})
