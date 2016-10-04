# clear default rules
MAKEFLAGS += --no-builtin-rules

NAME ?= javan-rhino
TMPDIR ?= $(CURDIR)/tmp
BUILDDIR ?= $(CURDIR)/charm-dist

$(TMPDIR) $(BUILDDIR):
	mkdir -p $@


# charm stuff

# defaults
CHARM_SERIES ?= xenial
CHARM_SRC ?= $(CURDIR)/charm
JUJU_REPOSITORY = $(BUILDDIR)
CHARMDIR = $(BUILDDIR)/$(CHARM_SERIES)/$(NAME)
GIT_CHARMDIR = $(CHARMDIR)/.git
PAYLOAD = $(CHARMDIR)/files/$(NAME).tgz
CHARM = $(CHARMDIR)/.done
LAYER_PATH = $(TMPDIR)/layer
INTERFACE_PATH = $(TMPDIR)/interface
CHARM_WHEELDIR = $(TMPDIR)/wheels
CHARM_DEPS = $(LAYER_PATH)/.done $(INTERFACE_PATH)/.done
EXTRA_CHARM_BUILD_ARGS ?=
DEPLOY_ENV ?= devel
DISTDIR = dist
DIST = $(DISTDIR)/.done

export INTERFACE_PATH
export LAYER_PATH
export JUJU_REPOSITORY


$(CHARM_DEPS): $(TMPDIR) $(CHARM_SRC)/charm-deps
	cd $(TMPDIR) && codetree $(CHARM_SRC)/charm-deps
	touch $(CHARM_DEPS)

$(CHARM): $(CHARM_SRC) $(CHARM_SRC)/* $(CHARM_PREQS) $(CHARM_DEPS) | $(BUILDDIR)
	PIP_NO_INDEX=true PIP_FIND_LINKS=$(CHARM_WHEELDIR) charm build -o $(BUILDDIR) -s $(CHARM_SERIES) -n $(NAME) $(EXTRA_CHARM_BUILD_ARGS) ./charm
	touch $@

version-info:
	git rev-parse HEAD > $@.txt

.DELETE_ON_ERROR: $(DISTDIR)
.INTERMEDIATE: $(DISTDIR)
$(DIST):
	rm -rf $(DISTDIR)
	mkdir -p $(DISTDIR)
	npm install
	npm run build
	touch $@

$(PAYLOAD): $(CHARM) $(DIST) version-info build-tar-exclude.txt $(SRC) $(SRC)/* $(SRC_PREQS)
	rm -f $(PAYLOAD)
	tar cz --exclude-vcs --exclude-from build-tar-exclude.txt -f $(PAYLOAD) .

## build the charm and payload
build:
	rm -rf $(CHARMDIR)
	$(MAKE) $(PAYLOAD)

deploy: build
	juju deploy local:$(CHARM_SERIES)/$(NAME)
	juju deploy memcached
	juju add-relation $(NAME) memcached
	juju set $(NAME) session_secret='its a secret' \
		environment=$(DEPLOY_ENV) \
		memcache_session_secret='its another secret'

check-git-build-vars:
ifndef BUILDREPO
	$(error BUILDREPO is required)
endif

$(GIT_CHARMDIR): check-git-build-vars
	rm -rf $(BUILDDIR)
	mkdir -p $(BUILDDIR)/$(CHARM_SERIES)
	git clone --branch $(BUILDBRANCH) $(BUILDREPO) $(CHARMDIR)

git-build: BUILDBRANCH ?= staging
git-build: EXTRA_CHARM_BUILD_ARGS = --force
git-build: $(GIT_CHARMDIR) $(PAYLOAD)
	cd $(CHARMDIR) && GIT_DIR=$(GIT_CHARMDIR) git add .
	cd $(CHARMDIR) && GIT_DIR=$(GIT_CHARMDIR) git commit -am "Build of $(NAME) from $$(cat $(CURDIR)/version-info.txt)"
	cd $(CHARMDIR) && GIT_DIR=$(GIT_CHARMDIR) git push origin $(BUILDBRANCH)

clean:
	rm -rf $(BUILDDIR)
	rm -rf $(TMPDIR)
	rm -f $(PAYLOAD)
	rm -rf dist
	rm -rf node_modules

.PHONY: version-info build deploy clean
