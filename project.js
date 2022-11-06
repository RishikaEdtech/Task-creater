window.addEventListener('load', (event) => {
  showCards('initial')
})
function taskHandler() {
  const task = document.getElementById('task').value
  const description = document.getElementById('description').value
  const date = document.getElementById('date').value
  const time = document.getElementById('time').value
  const dateSplit = date.split('-')
  const year = dateSplit[0]
  const month = dateSplit[1]
  const day = dateSplit[2]
  const timeSplit = time.split(':')
  const hour = timeSplit[0]
  const minute = timeSplit[1]
  const dateObj = new Date(year, month, day, hour, minute)
  const cardObj = {
    task: task,
    description: description,
    date: dateObj,
  }
  if (localStorage.getItem('cardsInfo')) {
    const items = JSON.parse(localStorage.getItem('cardsInfo'))
    localStorage.setItem('cardsInfo', JSON.stringify([...items, cardObj]))
  } else {
    localStorage.setItem('cardsInfo', JSON.stringify([cardObj]))
  }
  showCards('upcoming')
}

function showCards(type) {
  if (localStorage.getItem('cardsInfo')) {
    let parseInfo = JSON.parse(localStorage.getItem('cardsInfo'))
    parseInfo.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date)
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })

    const upcomingRef = document.getElementById('render-data')
    if (upcomingRef) {
      if (type === 'initial') {
        parseInfo = parseInfo.splice(0, 3)
      } else {
        if (type === 'upcoming') {
          parseInfo = parseInfo.splice(0, 3)
        }
        const item = document.getElementsByClassName('cards-container')
        if (item?.length > 0) {
          item[0].remove()
        }
      }
      const parentdiv = document.createElement('div')
      parentdiv.classList.add('cards-container')
      for (let i = 0; i < parseInfo.length; i++) {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
        taskDiv.innerHTML = parseInfo[i].task
        const descDiv = document.createElement('div')
        descDiv.classList.add('description')
        descDiv.innerHTML = parseInfo[i].description
        const dateDiv = document.createElement('div')
        dateDiv.classList.add('date')
        dateDiv.innerHTML = parseInfo[i].date
        cardDiv.appendChild(taskDiv)
        cardDiv.appendChild(descDiv)
        cardDiv.append(dateDiv)
        parentdiv.appendChild(cardDiv)
      }
      upcomingRef.appendChild(parentdiv)
    }
  }
}
