import NetInfo from "@react-native-community/netinfo";

export async function assertOnline() {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    throw new Error("No internet connection");
  }
}

export function withTimeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Network timeout")), ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
