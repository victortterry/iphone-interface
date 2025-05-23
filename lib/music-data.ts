import type { Album, Song } from "./types"

// Replace the audioUrl values with the provided Vercel Blob URLs
export const SAMPLE_SONGS: Song[] = [
  {
    id: "1",
    title: "TECH HOUSE VIBES",
    artist: "OLEXY",
    albumArt: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-tech-house-vibes-130-b16na4CaJn5VkEPTAChL1MQDWXUrOT.mp3",
  },
  {
    id: "2",
    title: "SPORTS HIGHLIGHTS",
    artist: "MUSICTOWN",
    albumArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-sports-highlights-51-4faiPJv1YQqwMUm6XXk8Tq5ec5ITfh.mp3",
  },
  {
    id: "3",
    title: "HIP HOP BEATS",
    artist: "FASSounds",
    albumArt: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=300&fit=crop",
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-hip-hop-02-738-PJu3dDvNmS1yrpV1dyCz6R49yIhQqa.mp3",
  },
  {
    id: "4",
    title: "SUN AND HIS DAUGHTER",
    artist: "Alex_MakeMusic",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-sun-and-his-daughter-580-YgPzYiN5rptOgpvCCvcgDio0Cn7HQh.mp3",
  },
  {
    id: "5",
    title: "DEEP URBAN",
    artist: "Urban Beats",
    albumArt: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop",
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixkit-deep-urban-623-wyxr1zey3yGOSKYtp83WLn6cf7Huik.mp3",
  },
]

export const FEATURED_ALBUMS: Album[] = [
  {
    id: "1",
    title: "SUMMER VIBES",
    artist: "OLEXY",
    artwork: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
    songs: SAMPLE_SONGS.slice(0, 2),
  },
  {
    id: "2",
    title: "STUDY BEATS",
    artist: "FASSounds",
    artwork: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=300&fit=crop",
    songs: SAMPLE_SONGS.slice(2, 4),
  },
  {
    id: "3",
    title: "ELECTRONIC MIX",
    artist: "Alex_MakeMusic",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    songs: [SAMPLE_SONGS[3], SAMPLE_SONGS[4]],
  },
  {
    id: "4",
    title: "CHILL COLLECTION",
    artist: "Various Artists",
    artwork: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    songs: SAMPLE_SONGS,
  },
]
