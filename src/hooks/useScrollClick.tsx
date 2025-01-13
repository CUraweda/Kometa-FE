export const useScrollClick = () => ({
  handleScrollClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget?.getAttribute("href");
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      targetElement?.scrollIntoView({ behavior: "smooth" });
    }
  },
});
