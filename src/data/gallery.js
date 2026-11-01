import { srcSet, unsplash } from '../utils/images';

const galleryItem = (id, photoId, caption, width, height) => ({
  id,
  src: unsplash(photoId, 900),
  srcSet: srcSet(photoId, [400, 600, 900, 1200]),
  width,
  height,
  caption,
});

const GALLERY_ITEMS = [
  galleryItem('g1', 'photo-1552566626-52f8b828add9', 'The dining room at dusk', 900, 600),
  galleryItem('g2', 'photo-1517248135467-4c7edcad34c4', 'Long oak tables by the fire', 900, 600),
  galleryItem('g3', 'photo-1555939594-58d7cb561ad1', 'Fire-oven plates', 900, 600),
  galleryItem('g4', 'photo-1556910103-1c02745aae4d', 'The open kitchen', 900, 600),
  galleryItem('g5', 'photo-1432139555190-58524dae6a55', 'Chef Marisol at the pass', 900, 596),
  galleryItem('g6', 'photo-1490645935967-10de6ba17061', 'Wood-fired flatbread', 900, 612),
  galleryItem('g7', 'photo-1544025162-d76694265947', 'The signature ribeye', 900, 601),
  galleryItem('g8', 'photo-1476224203421-9ac39bcb3327', 'Dessert plates from the hearth', 900, 601),
];

export { GALLERY_ITEMS };
export default GALLERY_ITEMS;
