## MagicMirror Rebuild

Package to rebuild native Node.js modules against the currently installed MagicMirror version

This version is a fork of official version of electron rebuild v2.1.1

This version is a special coding for MagicMirror²

# Installation
`npm install magicmirror-rebuild --save`

# Available commmand

`./node_modules/.bin/MagicMirror-rebuild`

# Encountered steps 
When rebuilding magic Mirror on Pi4B, Debian Bullseye in jan 2024, I went through the following steps

*Supporting software*
1. Install nvm and then install node v20
2. Download and install magicMirror as per documentation, Go to MagicMirror directory
3. do an `npm install fetch@v2 digest@v2`, needed for older modules using these dependencies
3. do `npm install serialport` to install serialport
4. do `./node_modules/.bin/MagicMirror-rebuild` from this component to rebuild the electron serialport binaries
5. Make startup shell script: `mm.sh`
5. install pm2
6. got modules and git clone the necessary modules as needed per config. Some modules need a further `npm install`inside their directory. 
7. Edit config.js in the config directory. 

*Connecting to the Pi pico for MMM-LCD-Backlight:*  
1. Used `sudo raspi-config` to enable serial, and disabling a login shell on the serial port 
2. Change `/boot/config.txt` to take care that /dev/serial0 points nicely to Pin 14/15 while still using the PL011 chip (success can be seen when /dev/serial0 is a symbolic link to /dev/ttyAMA0 and communication is established on the pin14/pin15. with two lines:
```
enable_uart=1
dtoverlay=disable-bt
``` 

*Supporting scripts*
1. `mmdisplaycontrol.py` for testing the presence of mobile phones in the house
2. `mmscreenon.sh` and `mmscreenoff.sh` and enter them in /etc/crontab for nightly pause and morning wake-up

*Screen properties*
1. On the desktop screen (with the mouse) set orientation on "right" for portrait mode and black-out on "never" to prevent black screen after 5 minutes. 
2. add the lines to `/boot/config.txt` to allow for vcgencmd display 0/1 to still work and not crash the system
```
dtoverlay=vc4-fkms-v3d
max_framebuffers=2
```

*Todo's* 
1. Install log2ram for reducing SD card interaction
2. Firewall to protect against SSH attacks

*One time shit (upgrade troubles)*
For the record only:
- screen troubles (solved as above)
- vcgencmd display 0 and 1 crashing the system: solved by the old screen driver as overlay (see above)
- serialport electron troubles (solved by MagicMirror-rebuild as above)
- Serialport version troubles, old constructor not valid anymore, updated the js components using serial port
- Python syntax troubles. Upgraded python scripts to python 3 (print statement, vs print function). 
- ics format calendar handling changed in new MagicMirror, bumped my calender to agree with default jan 2024 version. Should be a proper fork with rebasing at some time. Favicons changed names. Both default (calender-alt) and selected (calender-check-o) didn't work anymore. I now selected "calender-check" icon. That works, undocumented: you can change the color of the icon by adding `color:` in the config of the calendar.  
- google api key lost its connection due to an IP change of my Internetprovider. 

