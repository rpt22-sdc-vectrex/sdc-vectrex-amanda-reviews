export const REVIEW_1 = {
  id: 90,
  username: 'bteaz2h',
  text: 'Phasellus in felis. Donec semper sapien a libero.',
  rating: 4,
  date: '2020 - 02 - 19T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://google.ca',
  store_id: 5,
};

export const REVIEW_2 = {
  id: 94,
  username: 'japted2l',
  text: 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
  rating: 3,
  date: '2017 - 11 - 18T08: 00: 00.000Z',
  product_id: 3,
  user_profile_url: 'http://shinystat.com',
  store_id: 5,
};

export const REVIEW_DATA = {
  mainImage: 'https://picsum.photos/75/75',
  avgRating: 3.5,
  itemName: 'Elegant vase',
  reviewsArray: [
    {
      ...REVIEW_1,
      userPicture: 'user90.jpg',
      reviewPicture: 'review90.jpg',
    },
    {
      ...REVIEW_2,
      userPicture: 'user94.jpg',
      reviewPicture: 'review94.jpg',
    }],
};
