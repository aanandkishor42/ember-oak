const unsplash = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

const srcSet = (id, widths) => widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', ');

const HERO = 'photo-1414235077428-338989a2e8c0';
const STORY_MAIN = 'photo-1552566626-52f8b828add9';
const STORY_SMALL = 'photo-1432139555190-58524dae6a55';
const CHEF_SPECIAL = 'photo-1432139555190-58524dae6a55';

const IMAGES = {
  hero: {
    src: unsplash(HERO, 1600),
    srcSet: srcSet(HERO, [640, 960, 1280, 1600, 2000, 2560]),
    width: 2560,
    height: 1707,
  },
  storyMain: {
    src: unsplash(STORY_MAIN, 900),
    srcSet: srcSet(STORY_MAIN, [480, 700, 900, 1200, 1400]),
    width: 1400,
    height: 933,
  },
  storySmall: {
    src: unsplash(STORY_SMALL, 400),
    srcSet: srcSet(STORY_SMALL, [280, 400, 560, 700]),
    width: 700,
    height: 467,
  },
  chefSpecial: {
    src: unsplash(CHEF_SPECIAL, 1280),
    srcSet: srcSet(CHEF_SPECIAL, [640, 960, 1280, 1600, 1920]),
    width: 1920,
    height: 1280,
  },
};

export { IMAGES, unsplash, srcSet };
export default IMAGES;
