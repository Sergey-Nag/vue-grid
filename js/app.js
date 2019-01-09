var app = new Vue({
  el: '#app',
  data: {
    items: items,
    searchItemsList: "",
    windowSize: {
      height: 0
    },
    wrappCats: {
      height: 0
    },
    lines: {
      x: 100,
      y: 100,
      step: 20
    },
    grid: {
      el: Doc.getElementById('grid-map'),
      scrollWrapp: Doc.getElementById('grid_wrapp'),
      width: 2000,
      height: 1000,
      isDrag: false,
      pos: {
        scrollX: 0,
        scrollY: 0
      }
    }
  },
  methods: {
    searchItemsInList(catg) {
      let blocks = catg.blocks
      if (this.searchItemsList !== "") {
        let byName = blocks.filter(el => el.name.toLowerCase().indexOf(this.searchItemsList.toLowerCase()) !== -1)
        if (byName.length > 0) return byName
        else {
          let byPfx = blocks.filter(el => el.pfx.toLowerCase().indexOf(this.searchItemsList.toLowerCase()) !== -1)
          if (byPfx.length > 0) return byPfx
          else {
            let byTitle = blocks.filter(el => el.title.toLowerCase().indexOf(this.searchItemsList.toLowerCase()) !== -1)
            if (byTitle.length > 0) return byTitle
          }
        }
      } else return blocks
    },
    appHeight: function () {
      let searchWr = Doc.getElementsByClassName('menu_nav')[0];
      this.windowSize.height = window.innerHeight
      this.wrappCats.height = this.windowSize.height - searchWr.offsetHeight - 40
    },
    drawLines: function () {
      let grid = this.grid.el
      for (let i = 0; i < this.lines.x; i++) {
        let line = Doc.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.classList.add('line')
        line.id = i + '_x-line'
        line.setAttribute('x1', 0)
        line.setAttribute('x2', this.grid.width)
        line.setAttribute('y1', i * this.lines.step)
        line.setAttribute('y2', i * this.lines.step)
        grid.appendChild(line)
      }
      for (let i = 0; i < this.lines.y; i++) {
        let line = Doc.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.classList.add('line')
        line.id = i + '_y-line'
        line.setAttribute('x1', i * this.lines.step)
        line.setAttribute('y1', 0)
        line.setAttribute('x2', i * this.lines.step)
        line.setAttribute('y2', this.grid.height)
        grid.appendChild(line)
      }
    },
    mouseDown($event) {
      Mouse.which = $event.which
      Mouse.down = true
      Mouse.tapX = $event.pageX
      Mouse.tapY = $event.pageY
      Mouse.offset.tapX = $event.offsetX
      Mouse.offset.tapY = $event.offsetY
      let wrapp = Doc.getElementById('grid_wrapp');
      this.grid.pos.scrollX = wrapp.scrollLeft
      this.grid.pos.scrollY = wrapp.scrollTop
    },
    
    mouseMove($event) {
      Mouse.x = $event.pageX
      Mouse.y = $event.pageY
      Mouse.target = $event.target

      if (Mouse.down && Mouse.which == 1) {
        if (!Items.avatar) {
          if (Mouse.target.tagName == 'svg' || Mouse.target.tagName == 'line') this.grid.isDrag = true
        } else {
          Items.moveAvatar()
        }
      } else {
        this.grid.isDrag = false
        if (Items.avatar) Items.removeAvatar()
      }


      this.dragGrid()
    },
    mouseUp($event) {
      Mouse.which = false
      Mouse.down = false
      Mouse.tapX = 0
      Mouse.tapY = 0
      Mouse.offset.tapX = 0
      Mouse.offset.tapY = 0
    },
    dragGrid() {
      if (this.grid.isDrag) {
        Doc.body.style.cursor = 'grabbing'
        let wrapp = Doc.getElementById('grid_wrapp')

        let distX = Mouse.x - Mouse.tapX
        let distY = Mouse.y - Mouse.tapY

        wrapp.scrollLeft = this.grid.pos.scrollX - distX
        wrapp.scrollTop = this.grid.pos.scrollY - distY
      } else Doc.body.style.cursor = 'default'
    },
    scrollToCenter() {
      let wrp = Doc.getElementById('grid_wrapp')
      let grid = this.grid
      wrp.scrollLeft = grid.width / 2 - wrp.offsetWidth / 2
      wrp.scrollTop = grid.height / 2 - wrp.offsetHeight / 2
    }
  },
  created: function () {
    this.appHeight()
    this.drawLines()
    window.addEventListener('resize', this.appHeight)
  },
  mounted: function () {
    this.scrollToCenter()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.appHeight)
  }
})
