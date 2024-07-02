// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
//   test: /\.css$/,
//   use: ["style-loader", "css-loader", "postcss-loader"],
// };
export const module = {
  rules: [
    {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader", // Add postcss-loader here
      ],
    },
    // ... other rules for different file types ...
  ],
};
