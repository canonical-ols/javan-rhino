BIN = ./node_modules/.bin
DIST = ./dist
DATA_DIR=data

install:
	npm i

build:
	./scripts/build.sh

start-db: ARGS=--dbpath $(DATA_DIR)
start-db:
	mkdir -p ./data
	mongod $(ARGS)

start-dev:
	$(MAKE) start_dev_webpack &
	$(MAKE) start_dev_server &

start_dev_webpack:
	node webpack/webpack-dev-server.js

start_dev_server:
	node server/

start_production: build
	NODE_ENV=production node dist/server/

test:
	BABEL_DISABLE_CACHE=1 NODE_ENV=TEST \
	$(BIN)/nyc --require babel-core/register \
	$(BIN)/mocha --compilers js:babel-register --recursive ${ARGS}

lint:
	$(BIN)/eslint -c ./.eslintrc.js '**/*.js'

coverage:
	$(BIN)/nyc report --reporter=text-lcov | $(BIN)/coveralls

clean:
	rm -rf ./node_modules
	rm -rf $(DIST)
	rm -rf ./data

.PHONY: test build clean lint install
