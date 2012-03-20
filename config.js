module.exports = {
  name      : 'building',
  base_dir  : __dirname,

  router : {
    rules : {
      '/' : 'site.index'
    }
  },

  preload_components : [ 'log_router' ],

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
        WebPlayer : 'WebPlayer'
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