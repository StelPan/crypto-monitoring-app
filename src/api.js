//const cryptoCompareApiKey =
//  "ac46ad52677000cb3e028837fe082e332c4479d5d2bf24232df895c38a24746d";

const storageKeyName = "crypto-monitoring";

// const axios = window.axios ? window.axios : undefined;

// const cryptoData = [];

/**
 * Получает все тикеты из хранилища localStorage
 *
 * @returns array
 */
const getTickersInStorage = () => {
  const tickers = localStorage.getItem(storageKeyName);
  return tickers ? JSON.parse(tickers) : [];
};

/**
 *
 * @param tickersData
 */
const saveTickersDataInStorage = (tickersData) => {
  if (typeof tickersData !== "string") {
    tickersData = JSON.stringify(tickersData);
  }

  localStorage.setItem(storageKeyName, tickersData);
};

/**
 *
 * @param tickerName
 */
const addTicker = (tickerName) => {
  const tickers = getTickersInStorage();
  tickers.push(tickerName);
  saveTickersDataInStorage(tickers);
};

/**
 *
 * @param tickerName
 */
const removeTicker = (tickerName) => {
  saveTickersDataInStorage(
    getTickersInStorage().filter((ticker) => ticker !== tickerName)
  );
};

/**
 *
 * @param tickerName
 * @returns {Promise<void>}
 */
const subscribeTickers = (tickerName) => {
  addTicker(tickerName);
};

/**
 * Отписывается от ранее добавленных криптовалют
 *
 * @returns {Promise<void>}
 */
const unsubscribeTickers = async (tickerName) => {
  removeTicker(tickerName);
};

export { subscribeTickers, unsubscribeTickers, getTickersInStorage };
