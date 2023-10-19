  // Брейкпоинты
  // Десктоп более 1229.5
  const bpLaptop = 1229.5;
  const bpTablet = 929.5;
  const bpMob = 579.5;

  const brakePoints = {
    // Десктоп: > 1229.5
    laptop: 1229.5,
    tablet: 929.5,
    mobile: 579.5,
  }

  const startQty = {
    //columns * raw
    desktop: 4 * 4,
    laptop: 3 * 4,
    tablet: 2 * 4,
    mobile: 1 * 5,
  }

  const loadQty = {
    desktop: 4,
    laptop: 3,
    tablet: 2,
    mobile: 2,
  }

  export {
    brakePoints,
    startQty,
    loadQty,



    bpLaptop,
    bpTablet,
    bpMob
  }
