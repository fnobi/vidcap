vidcap
======

koma video capture.

## install
```
npm -g install vidcap
```

## usage
```
# write movie captures
vidcap path/to/movie.mp4

# with interval & capture size
vidcap -i 5 -s 300x200 path/to/movie.mp4

# check captures
ls movie.vidcap

# convert movie to sprite
vidcap path/to/movie.mp4 -f sprite

# convert movie to gif animation
vidcap path/to/movie.mp4 -f gif
```

## options

### --help
show this help.                     [boolean]  [default: false]
###  -i, --interval
capture interval.                   [string]  [default: 0.25]
### -s, --size
capture size.                       [string]
### -w, --width
capture width.                      [string]
### -h, --height
capture height.                     [string]
### -b, --basename
output file basename.               [string]
### -z, --zero-padding
use zero-padding number.            [boolean]  [default: false]
### -d, --duration
movie duration.                     [string]
### --offset
movie start offset time.            [string]  [default: 0]
### -f, --format
output format. (images|sprite|gif)  [string]  [default: "images"]
