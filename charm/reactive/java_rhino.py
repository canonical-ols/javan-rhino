from charmhelpers.core import hookenv
from charmhelpers.core.host import restart_on_change
from charmhelpers.core.templating import render
from charms.reactive import when, when_not, set_state
from charms.ols import code_dir, logs_dir, user


SYSTEMD_CONFIG = '/lib/systemd/system/javan-rhino.service'


@when('cache.available')
@when('ols.service.installed')
@restart_on_change({SYSTEMD_CONFIG: ['javan-rhino']}, stopstart=True)
def configure(cache):
    deployment = hookenv.config('deployment')
    session_secret = hookenv.config('session_secret')
    memcache_session_secret = hookenv.config('memcache_session_secret')
    if session_secret and memcache_session_secret:
        render(
            source='javan-rhino_systemd.j2',
            target=SYSTEMD_CONFIG,
            context={
                'working_dir': code_dir(),
                'user': user(),
                'session_secret': session_secret,
                'logs_path': logs_dir(),
                'deployment': deployment,
                'cache_hosts': cache.memcache_hosts(),
                'memcache_session_secret': memcache_session_secret,
            })
        set_state('service.configured')
    else:
        hookenv.status_set('blocked',
                           'Service requires session_secret and '
                           'memcache_session_secret to be set')
