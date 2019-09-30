import { sort } from './'

function getInsertIndex (draggedOffsetTop, targetCenterHorizontal, draggedGroupOrder, targetGroupOrder, targetCardOrder) {
  const isAbove = draggedOffsetTop < targetCenterHorizontal
  const isSameGroup = draggedGroupOrder === targetGroupOrder

  if (isSameGroup) return targetCardOrder - 1

  return isAbove ? targetCardOrder - 1 : targetCardOrder
}

export function insertCard (data, index, card) {
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
  const λ = insertCard(group.cards, insertIndex, draggedCard)

  return { ...group, cards: sort(λ) }
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

export function moveCard ({
  data,
  targetCenterHorizontal,
  draggedOffsetTop,
  draggedGroupOrder,
  targetGroupOrder,
  draggedCard,
  targetCardOrder
}) {
  const insertIndex = getInsertIndex(
    draggedOffsetTop,
    targetCenterHorizontal,
    draggedGroupOrder,
    targetGroupOrder,
    targetCardOrder
  )

  return [ ...data ]
    .map(data => removeCard(data, draggedGroupOrder, draggedCard))
    .reduce((acc, group) => insertCards(acc, group, targetGroupOrder, insertIndex, draggedCard), [])
}
