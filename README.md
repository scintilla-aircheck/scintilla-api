# General

### Browser Support

Chrome
Firefox
IE9+


# Dev Environment

### Setup
```
apt-get install curl
```

### Postgres (psycopg2)
```
apt-get install python-dev libpq-dev
```

### sass, susy, compass

```
apt-get install ruby
gem install sass
gem install susy
apt-get install ruby-dev
gem install compass
```

### Node
```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

probably a good idea to create a package.json
```
{
  "name": "app_name",
  "version": "0.2.0",
  "description": "Your description here",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Chris Del Guercio",
  "license": "Apache-2.0",
  "devDependencies": {
    "bower-files": "^3.9.1"
  }
}
```

then do:
```
cd app_name/static
npm install
```

### Installing Grunt (if NOT using package.json)
```
cd app_name/static
npm install grunt
```

### Using Grunt

Create a Gruntfile.js
```
lib = require('bower-files')({
  overrides: {
    modernizr: {
      main: 'modernizr.js',
      dependencies: {}
    }
  }
});

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compileJoined: {
        options : {
          join: true,
          sourceMap: true
        },
        files: {
          'build/pages-coffee.js': ['**/coffee/*.coffee']  // concat then compile into single file
        }
      }
    },
    sass: {
      dist: {
        options: {
          compass: true,
          require: 'susy'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: './css',
          ext: '.css'
        }]
      }
    },
    watch: {
      reload: {
        files: ['**/*.css', '**/js/**/*.js'],
        options: {
          livereload: true
        }
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      coffee: {
        files: '**/coffee/*.coffee' ,
        tasks: ['coffee']
      },
      pages: {
        files: ['**/js/**/*.js'],
        tasks: ['concat']
      }
    },
    concat: {
      pages: {
        src: ['**/js/**/*.js'],
        dest: 'build/pages.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkg.name %> */\n'
      },
      bower_components: {
        files: {
          'build/lib.min.js': lib.ext('js').files
        }
      },
      pages: {
        files: {
          'build/pages.min.js': 'build/pages.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //grunt.registerTask('concat-dashboard', ['concat:dashboard_js', 'uglify:dashboard_js']);
  grunt.registerTask('build', ['sass', 'concat', 'uglify']);
  grunt.registerTask('default', ['sass', 'watch'])
};

```

To watch for changes in SASS/Coffee/JS files, simply run `grunt`. If preparing the app for production, run `grunt compress` which will run uglify.

### Installing bower  (if NOT using package.json)
```
cd app_name/static
npm install bower
```

### Configuring bower
```
{
  "name": "GhostAudio",
  "version": "0.1.0",
  "homepage": "http://ghostaudio.com",
  "authors": [
    "Chris Del Guercio <cdelguercio@gmail.com>"
  ],
  "license": "Apache-2.0",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular": "~1.4.5"
  },
  "devDependencies": {
    "angular-mocks": "~1.4.4"
  }
}
```

### Docker

```
wget -qO- https://get.docker.com/ | sh
systemctl enable docker

docker-compose up
```

To rebuild the docker image after changing the system requirements

```
docker-compose build
```

List containers
```
docker ps -a
```

List images
```
docker images
```

Stop and remove all Docker containers
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

Remove all Docker images
```
docker rmi $(docker images -q)
```

##### Mac Specific
Install [Docker Toolbox](https://www.docker.com/toolbox)

Create a new docker machine, and import boot2docker. If no previous boot2docker vm, remove --virtualbox-import-boot2docker-vm.
```
docker-machine create -d virtualbox --virtualbox-import-boot2docker-vm boot2docker-vm docker-vm
```

Export environment variables
```
docker-machine env boot2docker-vm
```

Get your machine's IP. This replaces 127.0.0.1 in the hosts file.
```
docker-machine ls
docker-machine ip boot2docker-vm
```

Start docker-compose
```
docker-compose up
```

Let it build. You should be able to access it via the IP above.

### Dump and Load Database

Pull database info from Production or Staging into a .json file
```
python manage.py dumpdata --exclude contenttypes --exclude sessions -e auth.Permission -e admin > db.json
```

Load database info into Dev environment
```
rm db.sqlite3
python manage.py migrate
python manage.py loaddata db.json
```

### Git flow

##### List Branches
```
git branch
```

##### New Branch
```
git checkout master
git branch features/new_feature
git checkout features/new_feature
git push --set-upstream origin features/new_feature
```

##### Merge Branch
```
git checkout staging
git merge features/new_feature
```

##### Delete Branch
```
git branch -d features/feature_branch
```

##### Hotfix branch
```
git checkout master
git branch hotfixes/new_hotfix
...work on hotfix...
git merge hotfixes/new_hotfix
```

##### New Release
```
git checkout master
git branch releases/release.1.2.3
```