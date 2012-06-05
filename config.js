module.exports = {
  name      : 'building',
  base_dir  : __dirname,

  router : {
    rules : {
      '/'             : 'site.lodma',
      'admiral'       : 'site.admiral',
      'building'      : 'site.building',
      'house'         : 'site.house',
      'first_person'  : 'site.first_person',
      'hospital'      : 'site.hospital',
      'lodma'         : 'site.lodma'
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
        WebPlayer : 'standalone/WebPlayer'
      }
    }
  }
}