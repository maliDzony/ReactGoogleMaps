export const loadMap = (state, okCallback, failCallback) => {
  const google = window.google

  const routeRequest = {
    origin: state.from,
    destination: state.to,
    travelMode: 'DRIVING'
  }

  const directionsService = new google.maps.DirectionsService()
  directionsService.route(routeRequest, (route, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      okCallback(route)
    } else {
      failCallback()
    }
  })
}
