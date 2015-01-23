xcopy *.png 1280x768\1280x768_*
xcopy *.png 1280x720\1280x720_*
xcopy *.png 800x480\800x480_*
xcopy *.png 768x1280\768x1280_*
xcopy *.png 720x1280\720x1280_*
xcopy *.png 480x800\480x800_*
xcopy *.png 480x854\480x854_*
xcopy *.png 854x480\854x480_*
%IMAGEMAGICK%\mogrify -resize 1280x768! 1280x768\*.png
%IMAGEMAGICK%\mogrify -resize 1280x720! 1280x720\*.png
%IMAGEMAGICK%\mogrify -resize 800x480! 800x480\*.png
%IMAGEMAGICK%\mogrify -resize 768x1280! 768x1280\*.png
%IMAGEMAGICK%\mogrify -resize 720x1280! 720x1280\*.png
%IMAGEMAGICK%\mogrify -resize 480x800! 480x800\*.png
%IMAGEMAGICK%\mogrify -resize 480x854! 480x854\*.png
%IMAGEMAGICK%\mogrify -resize 854x480! 854x480\*.png
pause

