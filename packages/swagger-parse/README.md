# schemator

schemator middleware for nanoexpress

You can think this middleware combine of **Swagger documentation** and **Ajv** validation like original **nanoexpress** built-in feature + **swagger-ui** middleware

## Installation

```bash
npm i @nanoexpress/middleware-schemator
# or
yarn add @nanoexpress/middleware-schemator
```

## Schema type

- YML (preferred)
- JSON
- RAW JS Object

### YML

```js
const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

app.define(schematorInstance.define);

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

### JSON

```js
const schematorInstance = schemator({ swaggerPath: './swagger.json' });

app.define(schematorInstance.define);

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    path: './auth/docs.json'
  }),
  async (req) => {
    // your logic here
  }
);
```

### RAW JS Object

```js
const schematorInstance = schemator({ swaggerRAW: {} });

app.define(schematorInstance.define);

/// auth/index.js
app.get(
  '/auth',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({
    attach: '/auth',
    method: 'get',
    raw: {
      path: {
        '/': {
          /* infos here */
        }
      }
    }
  }),
  async (req) => {
    // your logic here
  }
);
```

## Example

See the [examples](./examples) directory

## Usage

### ESM Module

```js
import schemator from '@nanoexpress/middleware-schemator';

const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

app.define(schematorInstance.define);

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

### CJS Module

```js
const bodyParser = require('@nanoexpress/middleware-schemator/cjs');

const schematorInstance = schemator({ swaggerPath: './swagger.yml' });

app.define(schematorInstance.define);

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

## Options

### Initialize options

| Options name          | Default | Required                     | Description               |
| --------------------- | ------- | ---------------------------- | ------------------------- |
| `options.swaggerPath` | -       | Yes or `options.swaggerRAW`  | Swagger schema file path  |
| `options.swaggerRAW`  | -       | Yes or `options.swaggerPath` | Swagger schema RAW Object |

### `schematorInstance.load(options, AjvConfig)` options

| Options name     | Default | Required              | Description                                 |
| ---------------- | ------- | --------------------- | ------------------------------------------- |
| `options.method` | -       | Yes                   | Your router method (lowercase)              |
| `options.attach` | -       | Yes                   | Your router path (with Swagger path format) |
| `options.path`   | -       | Yes or `options.raw`  | Route Swagger schema file path              |
| `options.raw`    | -       | Yes or `options.path` | Route Swagger schema RAW Object             |

See [Ajv configurations](https://ajv.js.org/#options) for more customization

### `schematorInstance.render(options)` options

| Options name         | Default   | Required | Description                       |
| -------------------- | --------- | -------- | --------------------------------- |
| `options.title`      | Schemator | Yes      | Swagger UI Title                  |
| `options.exposePath` | -         | Yes      | `schematorInstance.expose()` path |

## License

MIT
