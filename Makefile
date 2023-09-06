# globals

RUN_WEB = yarn run
RUN_SERV = poetry run
TO_SERV = cd server

# web
web:
	$(RUN_WEB) dev

build:
	$(RUN_WEB) build

# server
serv:
	$(TO_SERV) && $(RUN_SERV) dev_server

tab_create:
	$(TO_SERV) && $(RUN_SERV) create_tables