import { env } from "@/constants";
import { apiFetch } from "@/lib/api";
import { SaveContactRequest, SaveContactResponse } from "@/types/apis";

const API_BASE_URL = `${env.apiUrl}/api/contacts`;

export async function saveContact(
  nickname: string,
  address: string,
  notes?: string
): Promise<SaveContactResponse["data"]> {
  if (!nickname || !address) {
    throw new Error("Nickname and address are required");
  }

  const requestBody: SaveContactRequest = {
    nickname,
    address,
    ...(notes && { notes }),
  };

  const response = await apiFetch<SaveContactResponse>(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  return response.data;
}
