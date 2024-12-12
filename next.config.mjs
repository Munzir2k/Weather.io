/** @format */

const eslintConfig = [
    ...compat.config({
        extends: ["next"],
        rules: {
            "react/no-unescaped-entities": "off",
            "@next/next/no-page-custom-font": "off",
        },
    }),
];

export default eslintConfig;
