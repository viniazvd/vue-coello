import { reposition } from './'

function getInsertIndex (isLeftCenter, isLeftToRight, order) {
  if (!isLeftCenter && !isLeftToRight) return order
  if (isLeftCenter && isLeftToRight) return order - 2

  return order - 1
}

export function moveGroups ({ data, isLeftCenter, draggedGroup, draggingGroupOver }) {
  const isLeftToRight = draggedGroup.order < draggingGroupOver.order
  const filtered = data.filter(group => group.order !== draggedGroup.order)
  const index = getInsertIndex(isLeftCenter, isLeftToRight, draggingGroupOver.order)

  return reposition(filtered, index, draggedGroup)
}
