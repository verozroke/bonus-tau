<template>
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
  />
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />
  <main class="profile-page">
    <section class="relative block h-500-px">
      <div class="absolute top-0 w-full h-full bg-center bg-cover">
        <span
          id="blackOverlay"
          v-ripple
          :style="{
            backgroundColor: colors.INDIGO
          }"
          :class="'text-white w-full h-full absolute'"
        ></span>
      </div>
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
        style="transform: translateZ(0px)"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
    <section class="relative py-16 bg-blueGray-200">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <NuxtImg
                  v-ripple
                  alt="Avatar"
                  src="data:image/png;base64,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"
                  class="shadow-xl rounded-full h-[150px] object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px w-[150px]"
                />
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div class="py-6 px-3 mt-32 sm:mt-0"></div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8"></div>
              </div>
            </div>
            <div class="text-center mt-12">
              <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {{
                  userStore.user ? userStore.user.name + ' ' + userStore.user.surname : 'Your name'
                }}
              </h3>
              <LogoutButton />
            </div>
            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
              <AccountSettings />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { colors } from '~/core/color/color'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.getUser()
})
// const formattedCreatedAt = computed(() => formatDate(userStore.user ? userStore.user.createdAt : new Date()))

// onMounted(async () => {
// await userStore.getUser()
// })
useHead({
  title: 'Профиль | Bonastau'
})
</script>

<style scoped></style>
