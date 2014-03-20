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
