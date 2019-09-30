export function reposition (data, index, card) {
  return [
    ...data.slice(0, index), // before index
    card,                    // inserted card
    ...data.slice(index)     // after index
  ]
}

export function sort (data) {
  return data.map((card, i) => ({ ...card, order: i + 1 }))
}
