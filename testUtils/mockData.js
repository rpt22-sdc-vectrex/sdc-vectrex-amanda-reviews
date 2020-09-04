export const REVIEW_1 = {
  id: 90,
  username: 'bteaz2h',
  text: 'Phasellus in felis. Donec semper sapien a libero.',
  rating: 4,
  date: '2020 - 02 - 19T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://google.ca',
};

export const REVIEW_2 = {
  id: 94,
  username: 'japted2l',
  text: 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
  rating: 3,
  date: '2017 - 11 - 18T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://shinystat.com',
};

export const REVIEW_LIST = [
  {
    ...REVIEW_1,
    userPicture: 'user90.jpg',
    reviewPicture: 'review90.jpg',
    mainImage: 'https://picsum.photos/75/75',
    itemName: 'Elegant vase',
  },
  {
    ...REVIEW_2,
    userPicture: 'user94.jpg',
    reviewPicture: 'review94.jpg',
    mainImage: 'https://picsum.photos/75/75',
    itemName: 'Elegant vase',
  },
];

export const REVIEW_SUMMARY = {
  storeReviewCount: 86,
  rating: 4,
  productReviewCount: 25,
};
export const REVIEW_PICTURES = [
  [14, 'https://picsum.photos/300/300'],
  [119, 'https://picsum.photos/300/300'],
  [563, 'https://picsum.photos/300/300'],
  [611, 'https://picsum.photos/300/300'],
  [630, 'https://picsum.photos/300/300'],
  [640, 'https://picsum.photos/300/300'],
  [717, 'https://picsum.photos/300/300'],
];
