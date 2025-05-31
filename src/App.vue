<template>
  <component :is="activePanel" :key="selectedPlatform" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TikTokPanel from './panels/TikTokPanel.vue'
import InstagramPanel from './panels/InstagramPanel.vue'

const selectedPlatform = ref(localStorage.getItem('selectedPlatform') || 'tiktok')

const activePanel = computed(() => {
  return selectedPlatform.value === 'instagram' ? InstagramPanel : TikTokPanel
})

// Watch for changes to localStorage
watch(selectedPlatform, (newPlatform) => {
  localStorage.setItem('selectedPlatform', newPlatform)
  console.log(`Platform changed to: ${newPlatform}`)
})

onMounted(() => {
  console.log('App.vue mounted ✅')
  
  // Define global switchPlatform
  window.switchPlatform = (platform) => {
    selectedPlatform.value = platform
    console.log(`Switched to ${platform}`)
  }
  
  // Also create a global variable that we can watch
  window.selectedPlatform = selectedPlatform
  
  // Check localStorage periodically (as fallback)
  setInterval(() => {
    const storedPlatform = localStorage.getItem('selectedPlatform')
    if (storedPlatform && storedPlatform !== selectedPlatform.value) {
      selectedPlatform.value = storedPlatform
    }
  }, 500)
})
</script>
