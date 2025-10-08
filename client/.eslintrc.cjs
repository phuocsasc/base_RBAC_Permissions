module.exports = {
    root: true,
    env: {
        browser: true, // Cho React frontend
        node: true, // Cho Node backend
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Cho phép JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tự động detect version React
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended', // Kết hợp với Prettier
    ],
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    rules: {
        // Đồng bộ với .prettierrc
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                bracketSameLine: false,
                bracketSpacing: true,
                embeddedLanguageFormatting: 'auto',
                htmlWhitespaceSensitivity: 'css',
                insertPragma: false,
                jsxSingleQuote: false,
                printWidth: 100,
                proseWrap: 'preserve',
                quoteProps: 'as-needed',
                requirePragma: false,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
                useTabs: false,
                vueIndentScriptAndStyle: false,
            },
        ],

        // Một số rule hay dùng
        'no-unused-vars': 'warn',
        'react/prop-types': 'off', // Nếu bạn không dùng PropTypes
        'react/react-in-jsx-scope': 'off', // React 17+ không cần import React
    },
};
