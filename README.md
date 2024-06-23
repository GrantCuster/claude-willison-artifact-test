# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# claude-willison-artifact-test

Created basically using the guide on https://ui.shadcn.com/docs/installation/vite

Except I needed to move the shadcn components from top level `@` folder where they were installed by default into the `src` folder. Probably a config setting on initializing shadcn could have fixed this.

I also needed to clear out `index.css` and replace it with the `@tailwind` properties from https://tailwindcss.com/docs/guides/vite to get tailwindcss running.

I set it up as a tsx project event though the Claude generated code is `jsx`. So to build I had to remove the tsx checks. Possibly I could also relabel to `App.tsx` to`App.jsx` but I think I'd need to configure some other settings.

The styles are also not quite right, could have to do with the shadcn theme.
