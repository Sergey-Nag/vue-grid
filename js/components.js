Vue.component('item', {
  props: ['data', 'id'],
  data: function () {
    return {}
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
  props: ['properties', 'id', 'isLineDrag'],
  data: function () {
    return {
      prop: this.$props.properties
    }
  },
  methods: {
    active() {
      let index = this.$props.id.split('_')[0]
      let fromArr = this.$root.$data.Items.items[index]
      let focusContrl = this.$root.$data.focusItem
      console.log(fromArr)
      fromArr.isActive = true
      this.$root.$data.focusItem = fromArr
      console.log(this.$root.$data.focusItem)
    }
  },
  mounted: function () {},
  template: `
  <div :id="id"
    :style="{
      opacity: properties.opacity,
      left: properties.x,
      top: properties.y,
      width: properties.width+'px',
      height: properties.height+'px'
}"

    class="item grid-item-elem"

    :class="[properties.color, {active : properties.isActive}]"

    @click="active()"
    :item-method="properties.name">

      <div class="input" :class="isLineDrag ? 'hide': ''"><div class="inp_bg"></div></div>
      <div class="output"><div class="inp_bg"></div></div>
</div>`
})
