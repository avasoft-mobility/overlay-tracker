interface SampleStores {
  shopID: number;
  shopName: string;
  categories: string[];
  dbFriendlyShopName: string;
  shopDBA?: string;
  shopLocationGUID?: string;
  merchantID?: string;
  shopWebURL: string;
  shopSovrnWebURL?: string;
  shopLogoURL?: string;
  shopLogoBG?: string;
  isAJAXWebpage: number;
  initialJSContentURL?: string;
  finalJSContentURL?: string;
  gridPageCommonURL?: string;
  gridPageButtonCode?: string;
  gridPageJSCodeURL?: string;
  pdpPageCommonURL?: string;
  pdpPageButtonCode?: string;
  pdpPageJSCodeURL?: string;
  checkoutPageCommonURL?: string;
  checkoutPageButtonCode?: string;
  checkoutPageJSCodeURL?: string;
  cartPageCommonURL?: string;
  cartPageButtonCode?: string;
  cartPageJSCodeURL?: string;
  paymentCardNumber?: string;
  paymentCardExpiryMonth?: string;
  paymentCardExpiryYear?: string;
  paymentCardCVV?: string;
  isShoppable: number;
  isPopular: number;
  isNew: number;
  isDelete: number;
  cartPageNavigatingContent?: string;
}

export default SampleStores;
