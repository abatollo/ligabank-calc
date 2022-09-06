const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);

  return formattedPrice;
};

const formatPercentage = (percentage) => {
  const formattedPercentage = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(percentage);

  return formattedPercentage;
};

const formatRound = (value) => {
  const formattedValue = new Intl.NumberFormat('ru-RU').format(Math.ceil(value));

  return formattedValue;
};

export { 
  formatPrice,
  formatPercentage,
  formatRound
};
