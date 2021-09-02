const cryptoCompareApiKey =
  "ac46ad52677000cb3e028837fe082e332c4479d5d2bf24232df895c38a24746d";

// const storageKeyName = "crypto-monitoring";

const tickersHandlers = new Map(); // {}
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${cryptoCompareApiKey}`
);

const AGGREGATE_INDEX = "5";
const INVALID_SUB_INDEX = "500";

socket.addEventListener("message", (e) => {
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
  } = JSON.parse(e.data);
  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }

  if (type === INVALID_SUB_INDEX) {
    // TODO: Logical on error code
    return;
  }

  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
});

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}

function subscribeToTickerOnWs(ticker) {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

function unsubscribeFromTickerOnWs(ticker) {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

const subscribeTickers = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
};

const unsubscribeTickers = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
};

export { subscribeTickers, unsubscribeTickers };
