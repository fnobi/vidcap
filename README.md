vidcap
======

koma video capture.

## install
```
git clone git://github.com/fnobi/vidcap
cd vidcap
npm -g install .
```

## usage
```
# write movie captures
vidcap path/to/movie.mp4

# with interval & capture size
vidcap -i 5 -s 300x200 path/to/movie.mp4

# check captures
ls path/to/movie.mp4.vidcap
```
