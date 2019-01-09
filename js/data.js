const Doc = document
const wrappCat = Doc.querySelector('.wrapper_categories')
const theme = {
  red: {
    bg: '#ff9898',
    bc: '#dd7676'
  },
  blue: {
    bg: '#bad1ff',
    bc: '#99b3e4'
  },
  green: {
    bg: '#a3ffce',
    bc: '#8decb9'
  },
  yellow: {
    bg: '#f3ff98',
    bc: '#e0ec82'
  },
  default: {
    bg: '#f7f7f7',
    bc: '#cdcaca'
  }
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
  {
    category: 'Condition',
    show: true,
    blocks: [
      {
        name: 'IF',
        pfx: '',
        type: 'condition',
        color: theme.yellow,
        title: 'Условие'
      },
      {
        name: 'IF-ELSE',
        pfx: '',
        type: 'condition',
        color: theme.yellow,
        title: 'Условие'
      }
    ]
  },
]

class Items_Class {
  constructor() {
    this.items = []
    this.avatar = false
  }

  add() {

  }

  createAvatar(elem) {
    let avatar = elem.cloneNode(false)
    avatar.id = 'AVATAR__' + elem.getAttribute('item-method')
    avatar.classList.remove('in-list')
    avatar.classList.add('avatar')

    let width = elem.offsetWidth
    avatar.style.width = width + 'px'

    Doc.body.appendChild(avatar)
    this.avatar = avatar

    let difX = elem.offsetWidth - Mouse.offset.tapX
    let difY = elem.offsetTop - Mouse.offset.tapy

    avatar.style.left = Mouse.x - difX + 'px'
    avatar.style.top = Mouse.y - difY + 'px'
  }

  moveAvatar() {
    this.avatar.style.left = Mouse.x + 'px'
    this.avatar.style.top = Mouse.y + 'px'

  }

  removeAvatar() {
    if (this.avatar) {
      let avtr = Doc.getElementById(this.avatar.id)
      Doc.body.removeChild(avtr)
      this.avatar = false
    }
  }
}

// Items Object
var Items = new Items_Class()

var Mouse = {
  which: false,
  tapX: 0,
  tapY: 0,
  x: 0,
  y: 0,
  offset: {
    tapX: 0,
    tapY: 0
  },
  down: false,
  target: false,
  holdVector: () => {
    return vectorLength(Mouse.tapX, Mouse.tapY, Mouse.x, Mouse.y)
  }
}

// Длина вектора
function vectorLength(aX, aY, bX, bY) {
  let sqr = (a) => a * a;
  return Math.ceil(Math.sqrt(sqr(aX - bX) + sqr(aY - bY)))
}

wrappCat.onmousedown = function () {
  return false;
}
