export interface ApiError extends Error {
  status: false;
  info?: {
    message?: string | string[];
    error?: string;
    statusCode?: number;
  };
}

export interface LoginResponseData {
  user: {
    id: string;
    email: string;
    name: string;
    privyId: string;
    walletAddress: string;
  };
  token: string;
  message: string;
  success: boolean;
  expiresAt: string;
  balance: {
    balance: string;
    network: string;
    balanceOctas: string;
  };
}

export interface SaveContactRequest {
  nickname: string;
  address: string;
  notes?: string;
}

export interface SaveContactResponse {
  status: boolean;
  data: {
    id: string;
    user_id: string;
    nickname: string;
    address: string;
    notes?: string;
    created_at: string;
    updated_at: string;
  };
}
