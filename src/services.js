export function getClosest (e, el) {
  return e.target.closest(el)
}

export function insertCard (arr, index, newItem) {
  console.log(arr, index)
  return [
    ...arr.slice(0, index), // part of the array before the specified index
    newItem,                // inserted item
    ...arr.slice(index)     // part of the array after the specified index
  ]
}

export function addCard (data, _card, card, targetIndex, targetGroup) {
  if (_card.group === targetGroup) {
    return {
      ...data,
      cards: insert(data.cards, targetIndex, card)
    }
  }

  return _card
}

export function removeCard (data, draggedCard) {
  const { id: draggedId, group: draggedGroupName } = draggedCard

  if (data.group === draggedGroupName) {
    return {
      ...data,
      cards: data.cards.filter(card => card.id !== draggedId)
    }
  }

  return data
}
