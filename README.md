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

###  -i, --interval
capture interval. (seconds)

### -s, --size
capture size. (ex. ```640x480```)

### -w, --width
capture width.

### -h, --height
capture height.

### -b, --basename
output file basename.

### -z, --zero-padding
use zero-padding number. (01, 02, 03...)

### -d, --duration
movie duration.  (seconds)

### --offset
movie start offset time. (seconds)

### -f, --format
output format. (images|sprite|gif)

  - images => output directory ```{:basename}.vidcap```
  - sprite => output ```{:basename}.jpg``` as concated image
  - gif => output ```{:basename}.gif``` as animation
