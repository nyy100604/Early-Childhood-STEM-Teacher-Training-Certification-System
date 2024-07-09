export const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      transition: {
        type: "tween",
        duration: 1.5,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        duration: 1.4,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.7],
      },
    },
  };
};
