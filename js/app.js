var app = new Vue({
  el: '#app',
  data: {
    items: items,
    windowSize: {
      height: 0
    },
    lines: {
      x: 100,
      y: 100,
      step: 20
    },
    grid: {
      el: document.getElementById('grid-map'),
      scrollWrapp: document.getElementById('grid_wrapp'),
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
    appHeight: function () {
      this.windowSize.height = window.innerHeight
    },
    drawLines: function () {
      let grid = this.grid.el
      for (let i = 0; i < this.lines.x; i++) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.classList.add('line')
        line.id = i + '_x-line'
        line.setAttribute('x1', 0)
        line.setAttribute('x2', this.grid.width)
        line.setAttribute('y1', i * this.lines.step)
        line.setAttribute('y2', i * this.lines.step)
        grid.appendChild(line)
      }
      for (let i = 0; i < this.lines.y; i++) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
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
      this.Mouse.down = true
      this.Mouse.tapX = $event.pageX
      this.Mouse.tapY = $event.pageY
      let wrapp = document.getElementById('grid_wrapp');
      this.grid.pos.scrollX = wrapp.scrollLeft
      this.grid.pos.scrollY = wrapp.scrollTop
    },
    mouseMove($event) {
      let Mouse = this.Mouse
      Mouse.x = $event.pageX
      Mouse.y = $event.pageY
      Mouse.target = $event.target

      if (Mouse.down) {
        if (Mouse.target.tagName == 'svg' || Mouse.target.tagName == 'line') this.grid.isDrag = true
      } else this.grid.isDrag = false

      this.dragGrid()
    },
    mouseUp($event) {
      this.Mouse.down = false
      this.Mouse.tapX = 0
      this.Mouse.tapY = 0
    },
    dragGrid() {
      if (this.grid.isDrag) {
        document.body.style.cursor = 'grabbing'
        let wrapp = document.getElementById('grid_wrapp')
        let Mouse = this.Mouse

        let distX = Mouse.x - Mouse.tapX
        let distY = Mouse.y - Mouse.tapY

        wrapp.scrollLeft = this.grid.pos.scrollX - distX
        wrapp.scrollTop = this.grid.pos.scrollY - distY
      } else document.body.style.cursor = 'default'
    },
    scrollToCenter() {
      let wrp = document.getElementById('grid_wrapp')
      let grid = this.grid
      wrp.scrollLeft = grid.width/2 - wrp.offsetWidth/2
      wrp.scrollTop = grid.height/2 - wrp.offsetHeight/2
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
