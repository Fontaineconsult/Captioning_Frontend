del /S C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\static\react\*
&& if exist C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\templates\index.html
del C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\templates\index.html
&& move "C:\Users\DanielPC\Desktop\servers\Captioning Front Ned\Captioning_Frontend\build\index.html" C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\templates
&& move "C:\Users\DanielPC\Desktop\servers\Captioning Front Ned\Captioning_Frontend\build\*" C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\static\react
&& move "C:\Users\DanielPC\Desktop\servers\Captioning Front Ned\Captioning_Frontend\build\static\css\*" C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\static\react\static\css
&& move "C:\Users\DanielPC\Desktop\servers\Captioning Front Ned\Captioning_Frontend\build\static\js\*" C:\Users\DanielPC\Desktop\Servers\alt_media_services\accessiblebookchecker\flask_site\pages\static\react\static\js
pause