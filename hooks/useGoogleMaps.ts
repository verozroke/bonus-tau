import axios from 'axios'
import { colors } from '~/core/color/color'
import type { CashbackOfferCoordinatesType, Coordinates } from '~/core/types/map'
import {
  CategoriesCashbackPercentage,
  CategoriesMap,
  CategoriesReverseMap
} from '~/core/constants/constants'
import { mapService } from './../services/map.service'
import { routerKey } from 'vue-router'

export function getMarkerIcon() {
  return `/marks/.png`
}

let markersToClusterize: any
let cluster: any
let mappedData: any[]
// @ts-expect-error cdn global object
let service: window.google.maps.places.PlacesService

export function createCenterControl(map: any) {
  const controlButton = document.createElement('button')

  // Set CSS for the control.
  controlButton.style.backgroundColor = '#fff'
  controlButton.style.border = '2px solid #fff'
  controlButton.style.borderRadius = '3px'
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlButton.style.color = 'rgb(25,25,25)'
  controlButton.style.cursor = 'pointer'
  controlButton.style.fontFamily = "'Overpass', sans-serif"
  controlButton.style.fontSize = '16px'
  controlButton.style.lineHeight = '38px'
  controlButton.style.margin = '8px 20px 22px'
  controlButton.style.padding = '4px 20px 0 20px'
  controlButton.style.textAlign = 'center'
  controlButton.className = controlButton.className + 'heatmap-button'
  controlButton.textContent = 'Фильтры'
  controlButton.title = 'Фильтры'
  controlButton.type = 'button'

  // Setup the click event listeners: simply set the map to Chicago.
  controlButton.addEventListener('click', () => {})

  return controlButton
}
// markersData?: CashbackOfferCoordinatesType[]

function parseMarkers(queryResults: any, category: string): CashbackOfferCoordinatesType[] {
  const parsedMarkers: CashbackOfferCoordinatesType[] = queryResults.map((location: any) => {
    return {
      cashback_percentage:
        CategoriesCashbackPercentage[category as keyof typeof CategoriesCashbackPercentage],
      category_id: CategoriesReverseMap[category as keyof typeof CategoriesReverseMap],
      lat: location.geometry.location.lat(),
      lng: location.geometry.location.lng()
    }
  })
  return parsedMarkers
}

export async function useGoogleMaps(rootId: string, center: Coordinates) {
  // @ts-expect-error cdn global object
  const { Map, InfoWindow } = await window.google.maps.importLibrary('maps')
  // @ts-expect-error cdn global object
  const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker')

  let possibleAdresses: string[] = []

  const map = new Map(document.getElementById(rootId), {
    center: center,
    zoom: 15,
    mapId: 'a65b6aab6aeb1170'
  })

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement('div')
  // Create the control.
  const centerControl = createCenterControl(map)
  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl)
  // @ts-expect-error cdn global object
  map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv)

  let currentMarker: { setMap: (arg0: null) => void } | null = null

  const input = document.getElementById('pac-input')
  // @ts-expect-error cdn global object
  const searchBox = new window.google.maps.places.SearchBox(input)
  // @ts-expect-error cdn global object
  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input)
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds())
  })

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces()

    if (places.length == 0) {
      return
    }

    // For each place, get the icon, name and location.
    // @ts-expect-error cdn global object
    const bounds = new window.google.maps.LatLngBounds()

    places.forEach((place: { geometry: { location: any; viewport: any } }) => {
      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry')
        return
      }
      // Create a marker for each place.

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    map.fitBounds(bounds)
  })

  const placeOnUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const centerOfTheMap = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(centerOfTheMap)
    })
  }

  getMarkers(CategoriesMap[1])

  async function getMarkers(category: $FixMe) {
    // @ts-expect-error cdn global object
    var pyrmont = new window.google.maps.LatLng(51.08, 71.26)

    var request = {
      location: pyrmont,
      radius: '5000',
      query: 'restaurant'
    }

    // @ts-expect-error cdn global object

    service = new window.google.maps.places.PlacesService(map)
    service.textSearch(request, callback)

    function callback(results: any, status: any) {
      // @ts-expect-error cdn global object
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        addMarkers(parseMarkers(results, category))
        clusterizeMarkers()
      }
    }
  }

  function addMarkers(markersData: CashbackOfferCoordinatesType[]) {
    markersToClusterize = markersData!.map((mark) => {
      const markerIcon = document.createElement('div')
      markerIcon.style.width = '48px'
      markerIcon.style.height = '48px'
      markerIcon.style.display = 'flex'
      markerIcon.style.alignItems = 'center'
      markerIcon.style.justifyContent = 'center'
      markerIcon.style.borderRadius = '50%'
      markerIcon.style.backgroundColor = colors.EMERALD
      markerIcon.style.padding = '4px'
      markerIcon.style.fontSize = '16px'
      markerIcon.style.fontWeight = '700'
      markerIcon.style.border = '2px solid white'
      markerIcon.style.color = colors.WHITE
      markerIcon.innerHTML = `
        <span>${mark.cashback_percentage}%</span>
      `

      const marker = new AdvancedMarkerElement({
        position: mark,
        map,
        title: 'Marker',
        content: markerIcon
      })

      marker.element.addEventListener('click', () => {
        goToOffer(mark.category_id)
      })
      return marker
    })
  }

  const renderer = {
    render: function ({
      count,
      position,
      markers
    }: {
      count: number
      position: Coordinates
      markers: any
    }) {
      const clusterIcon = document.createElement('div')
      clusterIcon.className = 'cluster-icon'
      clusterIcon.textContent = count.toString()
      clusterIcon.style.border = `4px solid ${colors.EMERALD}`
      return new AdvancedMarkerElement({
        position,
        content: clusterIcon,
        title: 'Zoom in to view resources in this area',
        // @ts-expect-error cdn global object
        zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count
      })
    }
  }

  const goToOffer = (category_id: number) => {
    window.location.pathname = '/recommendations/' + category_id
  }

  function clusterizeMarkers() {
    // @ts-expect-error cdn global object
    cluster = new window.markerClusterer.MarkerClusterer({
      map,
      markers: markersToClusterize,
      renderer: renderer
    })
  }
  return {
    addMarkers,
    placeOnUserLocation,
    clusterizeMarkers
  }
}
