module.exports = {
  name      : 'building',
  base_dir  : __dirname,

  router : {
    rules : {
      '/' : 'site.index'
    }
  },

  preload_components : [ 'log_router' ],
  cache_views        : true,

  components : {
    log_router          : {

      routes : {
        console : {
          levels : [ 'trace', 'info', 'warning', 'error' ]
        }
      }
    },

    http : {
      port : 3000,
      root_folders : {
        WebPlayer : 'standalone/WebPlayer',
        ai_files  : 'standalone/ai_files'
      },
      basic_auth : {
        message : 'Who are you?',
        users   : {
          'admin'   : 'LJUji9'
        }
      }
    }
  }
}