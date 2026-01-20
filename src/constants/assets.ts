// Asset paths and constants for the application

export const ASSETS = {
  IMAGES: {
    NETFLIX_LOGO: 'Netflix_Logo_RGB.png',
    PLAY_BUTTON: 'play-button-round-white-icon.png',
    CHECK: 'check.png',
    ADD_ROUND: 'add-round-outline-white-icon.png',
    LIKE: 'like.png',
    DOWN_ARROW: 'down_arrow.png',
    SPEAKER: 'speaker.png',
    MUTE: 'mute.png',
    SEARCH: 'search_icon.png',
    BELL: 'bell.png',
    USER: 'user.jpeg',
    USER1: 'user1.jpeg',
    TRIANGLE: 'triangle.png',
    CROSS: 'cross.png',
    PLAY: 'play.png',
  },
} as const;

// Timing constants (in milliseconds)
export const TIMING = {
  PREVIEW_START_DELAY: 800,
  MUTE_DISPLAY_TIMEOUT: 2000,
  VIDEO_TRANSITION: 500,
  NAVIGATION_DELAY: 1000,
  RESIZE_THROTTLE: 200,
} as const;
