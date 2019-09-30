import { reposition } from './'

function getInsertIndex (isAboveCenter, topToBottom, index) {
  if (topToBottom && isAboveCenter) return index - 2
  if (topToBottom && !isAboveCenter) return index - 1
  if (!topToBottom && isAboveCenter) return index - 1

  return index
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
    cards: reposition(group.cards, insertIndex, draggedCard).map((card, i) => {
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

export function moveCards ({
  data,
  isAboveCenter,
  draggedGroupOrder,
  targetGroupOrder,
  draggedCard,
  targetCardOrder
}) {
  const topToBottom = draggedCard.order < targetCardOrder

  const insertIndex = getInsertIndex(
    isAboveCenter,
    topToBottom,
    targetCardOrder
  )

  return [ ...data ]
    .map(data => removeCard(data, draggedGroupOrder, draggedCard))
    .reduce((acc, group) => insertCards(acc, group, targetGroupOrder, insertIndex, draggedCard), [])
}
