const covers = ["/assets/blog/cover1.jpg", "/assets/blog/cover2.jpg"];

export function getRandomCoverImg() {
  return covers[Math.floor(Math.random() * covers.length)];
}
