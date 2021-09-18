const generateAward = (position: number): number => {
  switch (position) {
    case 1:
      return 5
    case 2:
      return 3
    case 3:
      return 2
    default:
      return 0
  }
}

export default generateAward
