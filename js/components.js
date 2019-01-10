Vue.component('item', {
  props: ['data', 'id'],
  data: function () {
    return {
    }
  },
  methods: {
    addItem($event) {
      app.Items.avatar($event.target, $event.offsetX, $event.offsetY)
    },
    removeItem() {
      app.Items.removeAvatar()
    }
  },
  template: `
  <div :id="id" @mousedown.prevent="addItem" @mouseup="removeItem" :style="{backgroundColor: data.color.bg, borderColor: data.color.bc}" class="item in-list" :pfx="data.pfx" :item-method="data.name" :title="data.title"></div>`
})

Vue.component('grid-item', {
  props: ['properties', 'id'],
  data: function () {
    return {
      colors: '',
    }
  },
  methods: {
  },
  template: `
  <div :id="id" :style="{left: properties.x, top: properties.y}" class="item grid-item-elem" :item-method="properties.name"></div>`
})
