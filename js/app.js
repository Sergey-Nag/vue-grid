var app = new Vue({
  el: '#app',
  data: {
    items: items,
    Items: new Items_Class(),
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
//      scrollWrapp: Doc.getElementById('grid_wrapp'),
      GRID: Doc.getElementById('grid'),
      width: 2000,
      height: 1000,
      isDrag: false,
      pos: {
        scrollX: 0,
        scrollY: 0
      }
    },
    Mouse: {
      tapX: 0,
      tapY: 0,
      x: 0,
      y: 0,
      down: false,
      target: false
    }
  },
  methods: {
    searchItemsInList(blocks) {
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
        let step = i * this.lines.step
        line.setAttribute('x1', 0)
        line.setAttribute('x2', this.grid.width)
        line.setAttribute('y1', step)
        line.setAttribute('y2', step)
        Lines.addLine(step, 'top')
        grid.appendChild(line)
      }
      for (let i = 0; i < this.lines.y; i++) {
        let line = Doc.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.classList.add('line')
        line.id = i + '_y-line'
        let step = i * this.lines.step
        line.setAttribute('x1', step)
        line.setAttribute('y1', 0)
        line.setAttribute('x2', step)
        line.setAttribute('y2', this.grid.height)
        Lines.addLine(step, 'left')
        grid.appendChild(line)
      }
    },
    mouseDown($event) {
      this.Mouse.down = true
      this.Mouse.target = $event.target
      this.Mouse.tapX = $event.pageX
      this.Mouse.tapY = $event.pageY
      let wrapp = Doc.getElementById('grid_wrapp');
      this.grid.pos.scrollX = wrapp.scrollLeft
      this.grid.pos.scrollY = wrapp.scrollTop

      if (this.Mouse.target.tagName == 'svg' || this.Mouse.target.tagName == 'line') this.grid.isDrag = true
    },
    mouseMove($event) {
      let Mouse = this.Mouse
      Mouse.x = $event.pageX
      Mouse.y = $event.pageY
      Mouse.target = $event.target


      this.dragGrid($event)

      if (this.Items.focus) {
        setCursor('move')
        let pX = this.posX,
          pY = this.posY;
        this.Items.focus.style.left = pX + 'px'
        this.Items.focus.style.top = pY + 'px'
        if (posOnGrid(Mouse.x, Mouse.y)) {
          this.Items.inGrid()
          this.Items.add(this.grid.Grid)
          this.Items.setPos(this.gridX, this.gridY)
        } else {
          this.Items.outGrid()
        }
      }

    },
    
    mouseUp($event) {
      setCursor()
      this.Mouse.down = false
      this.Mouse.tapX = 0
      this.Mouse.tapY = 0

      this.grid.isDrag = false
      this.Items.removeAvatar()
    },
    
    dragGrid($event) {
      if (this.grid.isDrag) {
        $event.preventDefault()

        setCursor('grabbing')
        let wrapp = this.$refs.scrollWrapp
//        let wrapp = Doc.getElementById('grid_wrapp')
        let Mouse = this.Mouse

        let distX = Mouse.x - Mouse.tapX
        let distY = Mouse.y - Mouse.tapY

        wrapp.scrollLeft = this.grid.pos.scrollX - distX
        wrapp.scrollTop = this.grid.pos.scrollY - distY
      }
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
  },
  computed: {
    posX() {
      return this.Mouse.x - this.Items.focusProp.difX
    },
    posY() {
      return this.Mouse.y - this.Items.focusProp.difY
    },
    gridX() {
      let wrapp = this.$refs.scrollWrapp
      return this.Mouse.x + wrapp.scrollLeft-wrapp.offsetLeft
    },
    gridY() {
      let wrapp = this.$refs.scrollWrapp
      return this.Mouse.y + wrapp.scrollTop-wrapp.offsetTop
    }
  }
})

var gridWrapp = document.getElementById('grid_wrapp')

function posOnGrid(x, y) {
  let gX = gridWrapp.offsetLeft,
    gY = gridWrapp.offsetTop,
    gX1 = gX + gridWrapp.offsetWidth,
    gY1 = gY + gridWrapp.offsetHeight;

  if (x > gX && x < gX1 && y > gY && y < gY1) return true
  else return false
}
