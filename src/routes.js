export default [
  { path: "/", redirect: "/news", isExact: true },
  { path: "/news/:itemId", component: "Story" },
  { path: "/news", component: "Home", isExact: true },
  { path: "/about" }
];
