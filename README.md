# Background 

The much more in-depth motivation for creating this is located at the below link, but it's basically to see and listen to minimal pairs at the same time.

Preliminary checking suggests that circa 400 youtube clips (each around 15 minutes) is still not enough data to create a very useful resource. I'm currently investigating feeding the system with closer to 1000 clips. Also, the sound clips are filtered to only use minimal pairs of over 0.5 seconds in duration, so possibly increasing this minimum length might improve the data.

## Description

This is a very basic frontend (via python 2, no less!) for a sample configuration to serve up the static assets created in [MinimalPairGenerator](https://github.com/lpmi-13/minimalPairGenerator).

Basically, just make sure that your index.html is served from the root of wherever the webserver is listening at, and that it points to the correct location for directory.json, load.js, and the data assets.

## Configuration

The particular sample configuration used here is as follows:
```
Root
  |app.py (or whatever starts your webserver)
  |
  |_templates
  |  |
  |  |_index.html
  |
  |_static
     |_js
     | |_load.js
     | |_bootstrap.min.js
     | |_directory.json
     |
     |_data (generated via MinimalPairGenerator)
     |
     |_assets
       |_stylesheets
          |_boostrap.min.css
          |_custom.css
```
