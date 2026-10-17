install:
	npm ci

gendiff:
	node bin/gendiff.js -h

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npx oxlint && npx oxfmt --ignore-path=.oxfmtignore --check

lint-fix:
	npx oxfmt --ignore-path=.oxfmtignore && npx oxlint --fix

.PHONY: install gendiff test test-coverage lint lint-fix
