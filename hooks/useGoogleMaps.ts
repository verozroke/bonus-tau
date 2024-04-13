import { useMapStore } from '@/stores/MapStore'
import {
  ratingTypes,
  type Coordinates,
  type ObjectCoordinatesType,
  ratingColors,
  ratingDescriptionMap,
  ratingPercentages
} from '@/types/Map'
import { ObjectOfOrganizationOptionReverseMap, type RatingOption } from '@/types/ObjectBuilding'
import axios from 'axios'

export function getMarkerIcon(rating: RatingOption) {
  return `/marks/rating-${rating}.png`
}

let markersToClusterize: any
let cluster: any
let heatmap: any
let mappedData: any[]

export function getMarkerTitle(rating: RatingOption) {
  switch (rating) {
    case '1':
      return 'Safe'
    case '2':
      return 'Normal'
    case '3':
      return 'Danger'
  }
}

export function createCenterControl(
  map: any,
  addMarkers: () => void,
  clusterizeMarkers: () => void,
  toggleHeatmap: () => void
) {
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
  controlButton.style.margin = '8px 10px 22px'
  controlButton.style.padding = '4px 20px 0 20px'
  controlButton.style.textAlign = 'center'
  controlButton.className = controlButton.className + ' heatmap-button'
  controlButton.textContent = 'Режим тепловой карты'
  controlButton.title = 'Режим тепловой карты'
  controlButton.type = 'button'

  // Setup the click event listeners: simply set the map to Chicago.
  controlButton.addEventListener('click', () => {
    toggleHeatmap()
    toggleHeatMode(map, controlButton, addMarkers, clusterizeMarkers)
  })

  return controlButton
}

export function toggleHeatMode(
  map: any,
  controlButton: HTMLButtonElement,
  addMarkers: () => void,
  clusterizeMarkers: () => void
) {
  if (controlButton.title === 'Режим тепловой карты') {
    controlButton.title = 'Режим просмотра зданий'
    controlButton.innerHTML = 'Режим просмотра зданий'
    markersToClusterize.forEach((marker: any) => {
      // turn off markers and cluster
      marker.setMap(null)
      cluster.setMap(null)
    })
  } else {
    controlButton.title = 'Режим тепловой карты'
    controlButton.innerHTML = 'Режим тепловой карты'
    addMarkers()
    clusterizeMarkers()
  }
}

export function getMarkerContent(body: ObjectCoordinatesType) {
  const { iin, address, organization_object, organization_name, full_name, rating } = body.building
  return `
  <div class="mark">
    <div class="mark__title">${address}</div>
    <div class="mark__field-row">
      <div class="mark__field">ИИН/БИН:</div>
      <div class="mark__value">${iin}</div>
    </div>
    <div class="mark__field-row">
      <div class="mark__field">Адрес:</div>
      <div class="mark__value">${address}</div>
    </div>
    <div class="mark__field-row">
      <div class="mark__field">Объект организации:</div>
      <div class="mark__value">${
        ObjectOfOrganizationOptionReverseMap[
          organization_object as keyof typeof ObjectOfOrganizationOptionReverseMap
        ]
      }</div>
    </div>
    <div class="mark__field-row">
      <div class="mark__field">Наименование организации:</div>
      <div class="mark__value">${organization_name}</div>
    </div>
    <div class="mark__field-row">
      <div class="mark__field">Собственник объекта:</div>
      <div class="mark__value">${full_name}</div>
    </div>
    <div class="mark__field-row" style="color: ${
      ratingColors[rating]
    } !important; font-weight: 700">
      <div class="mark__field">Уровень опасности объекта:</div>
      <div class="mark__value" >${ratingDescriptionMap[rating]}</div>
    </div> 
    <div style="margin-top: 20px" class="mark__field">Почему этот объект имеет такой уровень опасности объекта?</div>
    <div style="margin-top: 8px" class="mark__value">Уровень опасности объекта зависит от того, насколько собственник объекта заполнил свой Паспорт Пожарной Безопасности Объекта.</div>
    <div style="margin-top: 8px; color: ${
      ratingColors[rating]
    } !important; font-weight: 500" class="mark__value">Заполненность Паспорта ПБО этого объекта: ${
    ratingPercentages[rating]
  }</div>
  </div>
  `
}

export function findMostFrequentAwTypeColor(markers: any[]) {
  const count = {
    Safe: 0,
    Normal: 0,
    Danger: 0
  }

  // Count the occurrences of each "targetElement.title" type
  markers.forEach((marker: any) => {
    switch (marker.targetElement.title) {
      case 'Safe':
        count['Safe']++
        break
      case 'Normal':
        count['Normal']++
        break
      case 'Danger':
        count['Danger']++
        break
    }
  })

  // Find the type with the maximum count
  let mostFrequentType = 'Safe'
  let maxCount = count['Safe']

  for (const type in count) {
    if (count[type as keyof typeof count] > maxCount) {
      mostFrequentType = type
      maxCount = count[type as keyof typeof count]
    }
  }

  return ratingColors[
    ratingTypes[mostFrequentType as keyof typeof ratingTypes] as keyof typeof ratingColors
  ]
}

export async function useGoogleMaps(
  rootId: string,
  center: Coordinates,
  markersData?: ObjectCoordinatesType[]
) {
  // @ts-expect-error cdn global object
  const { Map, InfoWindow } = await window.google.maps.importLibrary('maps')
  // @ts-expect-error cdn global object
  const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker')

  const mapStore = useMapStore()

  let possibleAdresses: string[] = []

  const map = new Map(document.getElementById(rootId), {
    center: center,
    zoom: 15,
    mapId: 'a65b6aab6aeb1170'
  })

  if (markersData) {
    // @ts-expect-error cdn global object
    mappedData = markersData.map((marker) => new window.google.maps.LatLng(marker.lat, marker.lng))
    // @ts-expect-error cdn global object

    heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: mappedData,
      map
    })

    toggleHeatmap()
  }

  function toggleHeatmap(): void {
    heatmap.setMap(heatmap.getMap() ? null : map)
  }

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement('div')
  // Create the control.
  const centerControl = createCenterControl(map, addMarkers, clusterizeMarkers, toggleHeatmap)
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

  const allowClicking = () => {
    map.addListener('click', async (mapMouseEvent: any) => {
      if (currentMarker) {
        currentMarker!.setMap(null)
      }
      currentMarker = new AdvancedMarkerElement({
        position: mapMouseEvent.latLng,
        map,
        title: 'Click here'
      })

      const { data } = await axios.get<{
        results: any[]
      }>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapMouseEvent.latLng.lat()},${mapMouseEvent.latLng.lng()}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API
        }`
      )
      possibleAdresses = data.results.map((item) => {
        return item.formatted_address as string
      })

      mapStore.latLng = {
        lat: mapMouseEvent.latLng.lat(),
        lng: mapMouseEvent.latLng.lng()
      }
      mapStore.address = possibleAdresses[0]
    })
  }

  const placeOnUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const centerOfTheMap = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(centerOfTheMap)
    })
  }

  function addMarkers() {
    markersToClusterize = markersData!.map((mark) => {
      const markerIcon = document.createElement('img')
      markerIcon.width = 24
      markerIcon.height = 24
      markerIcon.src = getMarkerIcon(mark.building.rating)

      const marker = new AdvancedMarkerElement({
        position: mark,
        map,
        title: getMarkerTitle(mark.building.rating),
        content: markerIcon
      })

      const infoWindow = new InfoWindow()
      marker.element.addEventListener('click', () => {
        infoWindow.close()

        infoWindow.setContent(getMarkerContent(mark))
        infoWindow.open({
          anchor: marker,
          map
        })
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
      const color = findMostFrequentAwTypeColor(markers)
      clusterIcon.style.border = `4px solid ${color}`
      return new AdvancedMarkerElement({
        position,
        content: clusterIcon,
        title: 'Zoom in to view resources in this area',
        // @ts-expect-error cdn global object
        zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count
      })
    }
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
    clusterizeMarkers,
    allowClicking
    // heatMapToggle,
  }
}
