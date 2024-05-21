export type PaymentMode = 'ONCE' | 'RECURRING';

export type RedirectRoute = `/${string}`;

export type ContributionData = {
  description?: string;
  imageUrl?: string;
  name: string;
  price: number;
};

export type SessionData = {
  contributionData: ContributionData;
  mode: PaymentMode;
  redirectRoute: RedirectRoute;
};
