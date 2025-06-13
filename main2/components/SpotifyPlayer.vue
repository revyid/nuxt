<template>
  <div class="fixed bottom-6 left-6 z-40">
    <div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-300"
         :class="isExpanded ? 'w-80' : 'w-16 h-16'">
      
      <div v-if="!isExpanded" 
           @click="toggleExpanded"
           class="w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
        <Icon name="mdi:spotify" class="text-2xl text-green-500" />
      </div>

      <div v-else class="p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <Icon name="mdi:spotify" class="text-xl text-green-500" />
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Now Playing</span>
          </div>
          <button @click="toggleExpanded" 
                  class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
            <Icon name="mdi:minus" class="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <div v-if="currentTrack" class="space-y-4">
          <div class="flex items-center space-x-3">
            <img :src="currentTrack.albumArt" 
                 :alt="currentTrack.album"
                 class="w-12 h-12 rounded-lg shadow-md">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                {{ currentTrack.name }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ currentTrack.artist }}
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
              <div class="bg-green-500 h-1 rounded-full transition-all duration-300" 
                   :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
            </div>
          </div>

          <div class="flex items-center justify-center space-x-4">
            <button @click="previousTrack" 
                    class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
              <Icon name="mdi:skip-previous" class="text-slate-600 dark:text-slate-300" />
            </button>
            
            <button @click="togglePlayPause" 
                    class="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200">
              <Icon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" class="text-lg" />
            </button>
            
            <button @click="nextTrack" 
                    class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
              <Icon name="mdi:skip-next" class="text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        <div v-else class="text-center py-4">
          <Icon name="mdi:music-off" class="text-3xl text-slate-300 dark:text-slate-600 mb-2" />
          <p class="text-sm text-slate-500 dark:text-slate-400">No track playing</p>
          <button @click="connectSpotify" 
                  class="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-colors duration-200">
            Connect Spotify
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Track {
  name: string
  artist: string
  album: string
  albumArt: string
  duration: number
}

const isExpanded = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const currentTrack = ref<Track | null>(null)

const sampleTracks: Track[] = [
  {
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: 200
  },
  {
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    duration: 183
  },
  {
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: 178
  }
]

let playInterval: NodeJS.Timeout | null = null
let currentTrackIndex = 0

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value && !currentTrack.value) {
    loadRandomTrack()
  }
}

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startPlayback()
  } else {
    stopPlayback()
  }
}

const previousTrack = () => {
  currentTrackIndex = (currentTrackIndex - 1 + sampleTracks.length) % sampleTracks.length
  loadTrack(sampleTracks[currentTrackIndex])
}

const nextTrack = () => {
  currentTrackIndex = (currentTrackIndex + 1) % sampleTracks.length
  loadTrack(sampleTracks[currentTrackIndex])
}

const loadTrack = (track: Track) => {
  currentTrack.value = track
  duration.value = track.duration
  currentTime.value = Math.floor(Math.random() * track.duration * 0.3)
  if (isPlaying.value) {
    startPlayback()
  }
}

const loadRandomTrack = () => {
  currentTrackIndex = Math.floor(Math.random() * sampleTracks.length)
  loadTrack(sampleTracks[currentTrackIndex])
  isPlaying.value = true
  startPlayback()
}

const startPlayback = () => {
  if (playInterval) clearInterval(playInterval)
  playInterval = setInterval(() => {
    if (currentTime.value >= duration.value) {
      nextTrack()
    } else {
      currentTime.value += 1
    }
  }, 1000)
}

const stopPlayback = () => {
  if (playInterval) {
    clearInterval(playInterval)
    playInterval = null
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const connectSpotify = () => {
  alert('Spotify integration would require authentication setup. This is a demo version.')
}

onMounted(() => {
  setTimeout(() => {
    loadRandomTrack()
  }, 2000)
})

onUnmounted(() => {
  stopPlayback()
})
</script>
