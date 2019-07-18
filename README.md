# simter-vue-components

Combine all simter-vue component to a single file.

## Develop

```shell
$ yarn install
$ yarn start
```

> `'yarn start'` use [Parcel] to run `'demo/index.html'`.

## Build

```shell
$ yarn build
```

### Build to AMD

1. global register all simter-vue components.
2. Build each component to AMD.
3. Use RequireJs combine all AMD component to a single file.
4. The vue dependency in RequireJs should be configuable.


[Vue]: https://vuejs.org
[Parcel]: https://parceljs.org
[Rollup]: https://rollupjs.org