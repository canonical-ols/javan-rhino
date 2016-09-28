# clear default rules
MAKEFLAGS += --no-builtin-rules

NAME ?= javan-rhino
TMPDIR ?= $(CURDIR)/tmp
BUILDDIR ?= $(CURDIR)/dist

$(TMPDIR) $(BUILDDIR):
	mkdir -p $@


# charm stuff

# defaults
CHARM_SERIES ?= xenial
CHARM_SRC ?= $(CURDIR)/charm
JUJU_REPOSITORY = $(BUILDDIR)
CHARMDIR = $(BUILDDIR)/$(CHARM_SERIES)/$(NAME)
PAYLOAD = $(CHARMDIR)/files/$(NAME).tgz
CHARM = $(CHARMDIR)/.done
LAYER_PATH = $(TMPDIR)/layer
INTERFACE_PATH = $(TMPDIR)/interface
CHARM_WHEELDIR = $(TMPDIR)/wheels
CHARM_DEPS = $(LAYER_PATH)/.done $(INTERFACE_PATH)/.done

export INTERFACE_PATH
export LAYER_PATH
export JUJU_REPOSITORY


$(CHARM_DEPS): $(TMPDIR) $(CHARM_SRC)/dependencies.txt
	cd $(TMPDIR) && codetree $(CHARM_SRC)/dependencies.txt
	touch $(CHARM_DEPS)

$(CHARM): $(CHARM_SRC) $(CHARM_SRC)/* $(CHARM_PREQS) $(CHARM_DEPS) | $(BUILDDIR)
	rm -rf $(CHARMDIR)
	PIP_NO_INDEX=true PIP_FIND_LINKS=$(CHARM_WHEELDIR) charm build -o $(BUILDDIR) -s $(CHARM_SERIES) -n $(NAME) ./charm
	touch $@

version-info:
	git rev-parse HEAD > $@.txt

.DELETE_ON_ERROR: node_modules
.INTERMEDIATE: node_modules
node_modules:
	rm -rf $@
	mkdir -p $@
	npm install

$(PAYLOAD): $(CHARM) node_modules version-info build-tar-exclude.txt $(SRC) $(SRC)/* $(SRC_PREQS)
	tar cz --exclude-vcs --exclude-from build-tar-exclude.txt -f $(PAYLOAD) .

## build the charm and payload
build: $(PAYLOAD)

deploy: build
	juju deploy local:$(CHARM_SERIES)/$(NAME)
	juju deploy memcached
	juju add-relation $(NAME) memcached

clean:
	rm -rf $(BUILDDIR)
	rm -rf $(TMPDIR)
	rm -f $(PAYLOAD)

.PHONY: version-info build deploy clean
