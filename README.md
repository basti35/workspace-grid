Workspace Grid for Cinnamon
===========================

Author: Nicola Battilani

Description
-----------
Cinnamon extension to allow a 2d workspace grid, navigate via key-bindings only.


Navigating
----------
The keys required are probably not where you would expect, and probably don't have default
values:

	Switch up   Switch to workspace 11
	Switch down Switch to workspace 12
	Move Up     Move to workspace up
	Move Down   Move to workspace down

Because it looks like the available key-bindings are hard-coded into the cinnamon source.
The other workspace-grid overrides expo and scale keys, and doesn't allow moving windows
up and down.
Using this key-bindings you can have also Expo and Scale.

WARNING: Using Expo (or anything other than this applet) for adding/removing
workspaces will cause Cinnamon to crash! While using this applet ONLY add/remove
desktops via the applet's settings window.


ToDo
-------
Switch applet - Just keybindings for now

Cleanup - It doesn't clean up well after itself, you may need to restart cinnamon
to go back to 'normal'

The user should be able to select which keybinding this overrides, in case they 
have > 10 desktops.

Thanks
------
The idea and some code are taken from "Workspace grid for Cinnamon"
Author:   Damien Whitten (damien@rebase.com.au)

License
-----------
This application is released under the GNU General Public License v2. A full
copy of the license can be found here: http://www.gnu.org/licenses/gpl.txt
Thank you for using free software!

Change Log
----------
v0.1:
	- Initial Release
