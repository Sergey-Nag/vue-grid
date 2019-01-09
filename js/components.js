Vue.component('item', {
  props: ['data', 'id'],
  data: function () {
    return {
      template: '',
      isDrag: false
    }
  },
  methods: {
    initDrag() {
      if (Mouse.down) {
        if (Mouse.holdVector() > 2) this.startDrag()
      } else Items.removeAvatar()
    },
    startDrag() {
      if (!this.isDrag && !Items.avatar) Items.createAvatar(this.$el)
//      Doc.body.style.curosr = "move"
    }
  },
  mounted: function () {},
  template: `<div @mousemove="initDrag" :id="id" :style="{backgroundColor: data.color.bg, borderColor: data.color.bc}" class="item in-list" :pfx="data.pfx" :item-method="data.name" :title="data.title"></div>`
})
