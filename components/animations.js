export const first = {
  initial: { y: 30, x: 0, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.1, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const second = {
  initial: { y: 30, x: 0, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

export const third = {
  initial: { y: 20, x: 0, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export const fourth = {
  initial: { y: 20, x: 0, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export const songName = {
  initial: { y: 20, x: 0, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};


export const menu = {
  initial: { y: 40, x: 0, opacity: 0 },
  open: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
  close: {
    y: -40, opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  }
}

export const playButton = {
  initial: { y: 40, x: 0, opacity: 0 },
  play: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
}