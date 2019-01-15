var Doc = document;
var GridItemsId = 0
const theme = {
  red: 'red',
  blue: 'blue',
  green: 'green',
  yellow: 'yellow',
  default: 'default'
}

const items = [
  {
    category: 'Variable',
    show: true,
    blocks: [
      {
        name: 'String',
        pfx: '',
        type: 'variable',
        color: theme.default,
        title: 'Переменная, содержащая строку'
      },
      {
        name: 'Number',
        pfx: '',
        type: 'variable',
        color: theme.default,
        title: 'Переменная, содержащая число'
      },
      {
        name: 'Boolean',
        pfx: '',
        type: 'variable',
        color: theme.default,
        title: 'Переменная-переключатель'
      },
      {
        name: 'Object',
        pfx: '',
        type: 'variable',
        color: theme.default,
        title: 'Объект данных'
      },
      {
        name: 'Array',
        pfx: '',
        type: 'variable',
        color: theme.default,
        title: 'Массив данных'
      }
    ]
  },
  {
    category: 'Telegram',
    show: true,
    blocks: [
      {
        name: 'Bot',
        pfx: 'new',
        type: 'class',
        color: theme.blue,
        title: 'Класс Телеграм-бота'
      },
      {
        name: 'Message',
        pfx: 'on',
        type: 'event',
        color: theme.green,
        title: 'Событие, происходящее при входящем сообщении'
      },
      {
        name: 'Error',
        pfx: 'on',
        type: 'event',
        color: theme.green,
        title: 'Событие, происходящее при ошибке сервера'
      }
    ]
  },
]

// Класс item's на сетке
class Items_Class {
  constructor() {
    this.items = []
    this.item = false
    this.added = false
    this.focus = false
    this.focusProp = {
      difX: 0,
      difY: 0
    }
    this.gridLines={
      x: null,
      y: null
    }
  }

  add(grid) {
    if (this.item && !this.added) {
      let item = this.item.cloneNode(false)
      // forming template
      let width
      let height = 35
      switch (item.getAttribute('type')) {
        case 'variable':
          width = 95
          break;
        case 'class':
          width = 155
          break;
        default:
          width = 135
          break;
      }

      this.items.push({
        id: item.id,
        name: item.getAttribute('item-method'),
        type: item.getAttribute('type'),
        color: item.getAttribute('theme'),
        title: item.getAttribute('title'),
        isActive: false,
        opacity: 1,
        permit: true,
        x: item.style.left,
        y: item.style.top,
        width,
        height,
        params: [
          {
            name: 'name',
            input: 'text',
            value: '',
            plchold: 'Введите название данных (имя переменной)'
          },
          {
            name: 'color',
            input: 'color',
            value: '#ffffff'
          }
        ]
      })
      //      GridItemsId++;
      this.added = true
    }
  }

  setPos(Lines, X, Y) {
    if (this.item) {
      let item = this.item
      let lines = Lines
      this.items.map((el) => {
        if (el.id == item.id) {
          let srch = Lines.search(X, Y);

          srch.then((res) => {
            el.permit = true
            el.x = res.x[0] + 3 + 'px'
            el.y = res.y[0] + 3 + 'px'
            this.gridLines.x = res.x[1]
            this.gridLines.y = res.y[1]
          }).catch((err) => {
            el.permit = false
            el.x = err.x[0] + 3 + 'px'
            el.y = err.y[0] + 3 + 'px'
            // ** ? **
          })
        }
      })
    }
  }
  

  remove() {
    if (this.item) {
      this.item = false
    }
  }

  avatar(elem, offX, offY) {
    if (!this.focus) {
      let avatar;
      if (!elem) avatar = this.item
      else avatar = elem.cloneNode(false)
      avatar.classList.remove('in-list')
      avatar.classList.add('avatar')

      this.focusProp.difX = offX
      this.focusProp.difY = offY

      avatar.id += '_' + GridItemsId
      GridItemsId++;

      avatar.style.width = elem.offsetWidth + 'px'
      avatar.style.left = -100 + 'px'
      avatar.style.top = -100 + 'px'

      this.focus = avatar
      Doc.getElementById('app').appendChild(avatar)
    }
  }

  removeAvatar() {
    if (this.focus) {
      Doc.getElementById('app').removeChild(this.focus)
      this.focus = false
      this.focusProp = {
        difX: 0,
        difY: 0
      }
    }
  }

  inGrid() {
    if (!this.item) {
      this.item = this.focus
      this.focus.style.opacity = 0
    }
  }

  outGrid() {
    this.focus.style.opacity = 1
    this.item = false
  }

}

//  Класс линий сетки
class Lines_Class {
  constructor() {
    this.left = []
    this.top = []
  }

  addLine(pos, dir) {
    this.lines[dir].push(pos)
  }

  search(x, y) {
    let that = this;
    return new Promise((res, rej) => {
      let xPos = undefined
      let yPos = undefined
      that.left.forEach((el, i) => x > el.pos && x < el.pos + 20 ? xPos = {el,id:i}:undefined)
      that.top.forEach((el, i) => y > el.pos && y < el.pos + 20 ? yPos = {el,id: i}:undefined)
      if (xPos !== undefined && yPos !== undefined) {
        if (!xPos.el.pinned || !yPos.el.pinned) {
          res({
            x: [xPos.el.pos, xPos.id],
            y: [yPos.el.pos, yPos.id],
          })
        } else {
          rej({
            x: [xPos.el.pos, xPos.id],
            y: [yPos.el.pos, yPos.id],
          })
        }
      }
    });
  }
  
  pinnItem(pos) {
    let X = pos.x
    let Y = pos.y
    this.left[X].pinned = true
    this.top[Y].pinned = true
  }

}

//var Lines = new Lines_Class()


function setCursor(type) {
  type = type || 'default';
  Doc.body.style.cursor = type;
}
