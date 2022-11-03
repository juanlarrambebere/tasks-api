type AccessTokenRaw = {
  userId: number;
  signedAt: string;
};

type AccessToken = {
  userId: number;
  signedAt: Date;
};
