export function getClosest (e, el) {
  return e.target.closest(el)
}

function getInsertIndex (draggedOffsetTop, targetCenter, draggedGroupOrder, targetGroupOrder, targetCardOrder) {
  const isAbove = draggedOffsetTop < targetCenter
  const isSameGroup = draggedGroupOrder === targetGroupOrder

  if (isSameGroup) return targetCardOrder - 1

  return isAbove ? targetCardOrder - 1 : targetCardOrder
}

function insertCard (data, index, card) {
  return [
    ...data.slice(0, index), // before index
    card,                    // inserted card
    ...data.slice(index)     // after index
  ]
}

function removeCard (data, draggedGroupOrder, draggedCard) {
  if (data.order === draggedGroupOrder) {
    return {
      ...data,
      cards: data.cards.filter(card => card.id !== draggedCard.id)
    }
  }
  return data
}

function getNewGroup (group, insertIndex, draggedCard) {
  return {
    ...group,
    cards: insertCard(group.cards, insertIndex, draggedCard).map((card, i) => {
      return { ...card, order: i + 1 }
    })
  }
}

function insertCards (acc, group, targetGroupOrder, insertIndex, draggedCard) {
  acc = [
    ...acc,
    group.order === targetGroupOrder
      ? getNewGroup(group, insertIndex, draggedCard)
      : group
  ]

  return acc
}

export function move (data, draggedGroupOrder, draggedCard, targetGroupOrder, draggedOffsetTop, targetCenter, targetCardOrder) {
  const insertIndex = getInsertIndex(
    draggedOffsetTop,
    targetCenter,
    draggedGroupOrder,
    targetGroupOrder,
    targetCardOrder
  )

  return [ ...data ]
    .map(data => removeCard(data, draggedGroupOrder, draggedCard))
    .reduce((acc, group) => insertCards(acc, group, targetGroupOrder, insertIndex, draggedCard), [])
}
