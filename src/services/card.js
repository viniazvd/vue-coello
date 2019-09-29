import { reposition } from './'

function getInsertIndex (draggedOffsetTop, targetCenterHorizontal, draggedGroupOrder, targetGroupOrder, targetCardOrder) {
  const isAbove = draggedOffsetTop < targetCenterHorizontal
  const isSameGroup = draggedGroupOrder === targetGroupOrder

  if (isSameGroup) return targetCardOrder - 1

  return isAbove ? targetCardOrder - 1 : targetCardOrder
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
