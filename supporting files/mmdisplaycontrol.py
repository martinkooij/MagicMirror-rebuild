from os import popen,system,path
from time import sleep
import sys

vcgen_out=str(popen('vcgencmd display_power').read()) #Bash command to read display status
state=vcgen_out.find('1')
verbose=False
print (str(popen('date').read()))
print ("Magic Mirror DISPLAY control started: MMDCVERBOSE =" + str(verbose))
sys.stdout.flush()
ip="192.168.68.211-213" #Enter the IP address of the device that should keep the display awake

while True:
    if not path.exists('/home/pi/lock/displayscreenoff.lck') :
        nmap_out=str(popen('nmap -sP '+ip).read()) #nmap command to scan on the given IP address
        vcgen_out=str(popen('vcgencmd display_power').read())
        state=vcgen_out.find('1')
        if verbose : print ("DEBUG:", nmap_out)
        if verbose : print ("DEBUG: state =", state)
        if nmap_out.find('latency') == -1:  #looks for the word "latency" in the output
            if state == -1 :                   #this nested if makes sure that commands are not repeated
               pass
            else :
               if verbose : print ("DEBUG: poweroff")
               system('vcgencmd display_power 0')  #Bash command that turns off the display

        elif nmap_out.find('latency') > 1:
            if state > 1:
               if verbose : print ("DEBUG: state on / goto long sleep")
               sleep(900)
            else :
               if verbose : print ("DEBUG: poweron / goto long sleep")
               system('vcgencmd display_power 1') #Bash command to turn on the display
               sleep(900) #keep on for at least 15 minutes

    if verbose : print ("DEBUG: goto short sleep")
    sys.stdout.flush()
    sleep(10) #Scan rate in seconds when no IP device in range found

