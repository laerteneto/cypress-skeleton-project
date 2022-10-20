CONTAINER_NAME:=cypress-tests

build:
	yarn clean && yarn 

test:
	yarn cy:run:headless
	