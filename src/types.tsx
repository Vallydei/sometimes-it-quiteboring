export type Activity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  accessibility: number;
};

export type Translate = {
    translatedText: string;
}

export type TranslationResponse = {
    body: any; 
    bodyUsed: boolean;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}