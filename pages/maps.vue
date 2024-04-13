<template>
  <div class="map-parent">
    <div class="h-100">
      <!-- <input
        id="pac-input"
        class="controls"
        type="text"
        placeholder="Найти по адресу, названию, городу..."
      /> -->
      <MapRoot rootId="map" />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { onMounted, ref } from 'vue'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'
import type { CashbackOfferCoordinatesType } from '~/core/types/map'
import { mapService } from '@/services/map.service'
// const isLoading = ref(false)
// const userStore = useUserStore()
// const snackbarStore = useSnackbarStore()

onMounted(async () => {
  // await userStore.getUser()
  try {
    // isLoading.value = true

    const { clusterizeMarkers, placeOnUserLocation } = await useGoogleMaps(
      'map',
      { lng: 71.43051762734937, lat: 51.12842004128779 }
    )

    placeOnUserLocation()
    clusterizeMarkers()
    // isLoading.value = false
  } catch (error) {
    // FIXME: add toast
    // isLoading.value = false
  }
})
</script>

<style scoped>
.map-parent {
  height: calc(100vh - 56px);
}
</style>
