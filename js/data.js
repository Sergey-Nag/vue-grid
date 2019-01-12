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
  }

  add(grid) {
    if (this.item && !this.added) {
      let item = this.item.cloneNode(false)
      // forming template
      
//      item = formingTemplateItem(item)
      this.items.push({
        id: item.id,
        name: item.getAttribute('item-method'),
        type: item.getAttribute('type'),
        color: item.getAttribute('theme'),
        title: item.getAttribute('title'),
        x: item.style.left,
        y: item.style.top,
        startWidth: item.style.width
      })
//      GridItemsId++;
      this.added = true
    }
  }

  setPos(X, Y) {
    if (this.item) {
      let item = this.item
      let lines = Lines
      this.items.map((el) => {
        if (el.id == item.id) {
          let srch = lines.search(X, Y);
          srch.then((res) => {
            el.x = res.xTrue + 3 + 'px'
            el.y = res.yTrue + 3 + 'px'
          }).catch((err) => {
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

      avatar.id += '_'+GridItemsId
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
    this.lines = {
      left: [],
      top: []
    }
    this.map =[]
  }

  addLine(pos, dir) {
    this.lines[dir].push(pos)
  }

  search(x, y) {
    let that = this;
    return new Promise((res, rej) => {
      let xTrue = false
      that.lines.left.forEach((el) => {
        if (x > el && x < el + 20) xTrue = el
      })
      let yTrue = false
      that.lines.top.forEach((el) => {
        if (y > el && y < el + 20) yTrue = el
      })

      if (xTrue && yTrue) {
        res({
          xTrue,
          yTrue
        })
      } else rej({
        xTrue,
        yTrue
      })
    });
  }

}

//var Lines = new Lines_Class()


function setCursor(type) {
  type = type || 'default';
  Doc.body.style.cursor = type;
}

function formingTemplateItem(item) {
  item.style.width = 57+'px'
  return item
}
