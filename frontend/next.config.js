/** @type {import('next').NextConfig} */
// const nextConfig = {
  
// }

// module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
//   reactStrictMode: true,
//   compiler: {
//     styledComponents: true,
//   }
// })

// module.exports = withBundleAnalyzer()

const withAntdLess = require('next-plugin-antd-less');

module.exports = require("@next/bundle-analyzer")(withAntdLess({
  modifyVars: { 
    '@primary-color': '#4e73df',
    '@success-color': "#1cc88a",
    '@warning-color': "#f6c23e",
    "@error-color": "#e74a3b",
    '@text-color': "#858796",
    '@info-color': "#36b9cc",
    '@background-color-light': "#f8f9fc",
   }, // optional
  lessVarsFilePath: './styles/vars.less', // optional 
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ... 
    mode: "local",
    localIdentName: typeof __DEV__ == "undefined" ? "[local]--[hash:base64:4]" : __DEV__ ? "[hash:base64:8]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },

  // for Next.js ONLY
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  },

  enabled: process.env.ANALYZE === 'true',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  webpack(config) {
    return config;
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
  future: {
    webpack5: true,
  },
}));
