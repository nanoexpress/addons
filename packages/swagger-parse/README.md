# swagger-parse [Alpha]

TypeScript and Ajv generator add-on for nanoexpres

> **This add-on may not work as expected or not work at all**

## Installation

```bash
npm i @nanoexpress/addon-swagger-parse
# or
yarn add @nanoexpress/addon-swagger-parse
```

## Schema type

- YML (preferred)
- JSON
- RAW JS Object

### Usage

```js
await swaggerParse(fs.readFileSync('docs.yml'));
const { default: routeInterface } = await import('validations/xxxx.d.ts');
const { default: routeAjvSchema } = await import('validations/xxxx.json');

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.yml'
  }),
  async (req) => {
    // your logic here
  }
);
```

## License

GPL-3.0 License
