import { useAppStore } from "@/stores/appStore";
import { LoginResponseData } from "@/types/apis";

export function getUser() {
  return useAppStore.getState().user;
}

export function getBalance() {
  return useAppStore.getState().balance;
}

export function setBalance(balance: LoginResponseData["balance"]) {
  useAppStore.getState().setBalance(balance);
}
