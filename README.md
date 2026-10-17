# Вычислитель отличий (JS)

[![hexlet-check](https://github.com/kicha3007-boop/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kicha3007-boop/frontend-project-46/actions)
[![CI](https://github.com/kicha3007-boop/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/kicha3007-boop/frontend-project-46/actions/workflows/main.yml)

`gendiff` сравнивает два конфигурационных файла (JSON или YAML) и показывает разницу между ними.
Вложенные структуры сравниваются рекурсивно. Форматы вывода: `stylish` (по умолчанию), `plain`, `json`.

Учебный проект Хекслета: https://ru.hexlet.io/programs/frontend

## Требования

- Node.js 22 или новее
- npm, make

## Установка

```bash
git clone https://github.com/kicha3007-boop/frontend-project-46.git
cd frontend-project-46
make install
npm link
```

## Запуск

```bash
gendiff -h
gendiff __fixtures__/file1.json __fixtures__/file2.json
gendiff --format plain __fixtures__/file1.yml __fixtures__/file2.yml
gendiff -f json __fixtures__/file1.json __fixtures__/file2.yml
```

Как библиотека:

```javascript
import genDiff from '@hexlet/code';

console.log(genDiff('file1.json', 'file2.yml', 'plain'));
```

### stylish

```text
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
    ...
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}
```

### plain

```text
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting5' was added with value: [complex value]
Property 'group2' was removed
```

### json

Сериализация внутреннего дерева различий: у каждого узла есть `key` и `type`
(`added`, `removed`, `changed`, `unchanged`, `nested`), значения лежат в `value` (или `value1`
и `value2` у изменённых), дочерние узлы — в `children`.

## Разработка

```bash
make test            # vitest
make test-coverage   # тесты с порогом покрытия 90%
make lint            # oxlint + проверка форматирования oxfmt
```
