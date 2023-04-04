<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  onRegistered(r) {
    if (r) {
      // Update SW every minute
      setTimeout(r.update, 60 * 1000)
    }
  }
})

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="needRefresh || offlineReady"
    class="pwa-toast bg-dark-gray text-white max-w-xs p-3"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>

      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>

    <div class="flex space-x-2">
      <button
        v-if="needRefresh"
        class="bg-green px-3 py-1"
        aria-label="Reload app for update"
        @click="updateServiceWorker()"
      >
        Reload
      </button>

      <button
        aria-label="Close prompt modal"
        class="bg-green px-3 py-1"
        @click="close"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  z-index: 1;
  text-align: start;
  box-shadow: 3px 4px 10px 0 rgba(65 184 131 / .3);
  background-color: white;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
</style>
