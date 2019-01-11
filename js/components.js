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
  <div :id="id" @mousedown.prevent="addItem" @mouseup="removeItem" class="item in-list" :class="data.color" :pfx="data.pfx" :item-method="data.name" :title="data.title" :type="data.type" :theme="data.color"></div>`
})

Vue.component('grid-item', {
  props: ['properties', 'id', 'items', 'i'],
  data: function () {
    return {
      colors: this.$props
    }
  },
  methods: {
  },
  mounted: function () {
    console.log(this.$props.i)
  },
  template: `
  <div :id="id" :title="colors" :style="{left: properties.x, top: properties.y}" class="item grid-item-elem" :class="properties.color" :item-method="properties.name"></div>`
})
