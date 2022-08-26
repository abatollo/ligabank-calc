const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);

  return formattedPrice;
};

export { formatPrice };
