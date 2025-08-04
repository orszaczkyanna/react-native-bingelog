module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // enables imports like `import { API_KEY } from "@env"`
          path: ".env", // relative path to the .env file
          allowUndefined: false, // throws error if an imported variable is missing
        },
      ],
    ],
  };
};
