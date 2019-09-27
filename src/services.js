export function getClosest (e, el) {
  return e.target.closest(el)
}

export function getInsertIndex (draggedOffsetTop, targetCenter, draggedGroupOrder, targetGroupOrder, targetCardOrder) {
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

export function removeCard (data, draggedGroupOrder, draggedCard) {
  if (data.order === draggedGroupOrder) {
    return {
      ...data,
      cards: data.cards.filter(card => card.id !== draggedCard.id)
    }
  }
  return data
}

export function move (acc, group, targetGroupOrder, insertIndex, draggedCard) {
  if (group.order === targetGroupOrder) {
    const newGroups = {
      ...group,
      cards: insertCard(group.cards, insertIndex, draggedCard).map((coe, i) => {
        return {
          ...coe,
          order: i + 1
        }
      })
    }

    acc = [ ...acc, newGroups ]
  } else {
    acc = [ ...acc, group ]
  }

  return acc
}
