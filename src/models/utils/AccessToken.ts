interface AccessToken {
  token: string;
  expireTime: Date;
}

interface AccessTokenResponse {
  accessToken: string;
  expiresIn: string;
  tokenGerationTime: string;
}

export default AccessToken;
export type { AccessTokenResponse };
