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
]

class Items {
  constructor() {
    this.items = []

  }

  add() {

  }
}
