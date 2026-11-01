const unsplash = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

const IMAGES = {
  hero: unsplash('photo-1414235077428-338989a2e8c0', 2560),
  storyMain: unsplash('photo-1552566626-52f8b828add9', 1400),
  storySmall: unsplash('photo-1432139555190-58524dae6a55', 700),
  chefSpecial: unsplash('photo-1432139555190-58524dae6a55', 1920),
};

export { IMAGES };
export default IMAGES;
