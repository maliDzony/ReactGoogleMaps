import React from 'react'

const substringAddress = address => address.substring(0, address.indexOf(','))

export const labelFormatter = (item) => {
  const cityFrom = substringAddress(item.routes[0].legs[0].start_address)
  const cityTo = substringAddress(item.routes[0].legs[0].end_address)

  return (`${cityFrom} - ${cityTo}`)
}

export const previouslyEnteredRoute = (item, index) => <span>{`#${index + 1}`} {labelFormatter(item)}</span>
