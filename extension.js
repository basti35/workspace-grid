const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Lang = imports.lang;
const Settings = imports.ui.settings;

let bindings = [
	"move-to-workspace-up",
	"move-to-workspace-down",
	"switch-to-workspace-11",
	"switch-to-workspace-12"
];

let bind_handlers = [];
let metaWorkspace;

function get_next_workspace (hint_direction) {
//  global.log("start get_next" + this.numCols+ " " + this.numRows);

  let current_workspace_index = global.screen.get_active_workspace_index();
  let next_workspace;
  let tot_workspaces = this.numCols*this.numRows;
  switch(hint_direction)
  {
    case Meta.MotionDirection.UP:
      next_workspace = current_workspace_index - this.numCols;
      break;
    case Meta.MotionDirection.DOWN:
      next_workspace = current_workspace_index + this.numCols;
      break;
  }


  if (next_workspace < 0)
    next_workspace += tot_workspaces;
  else if (next_workspace >= tot_workspaces)
    next_workspace -= tot_workspaces;

//  global.log("get_next: " + next_workspace);

  this.metaWorkspace = global.screen.get_workspace_by_index(next_workspace);
}

function onSwitch(display, screen, window, binding_o) {
/*
  global.log("onSwitch called");
  global.log("current_workspace_index: "+current_workspace_index);
  global.log("display: "+display);
  global.log("window: "+ window);
  global.log("screen: "+screen);
  global.log("cols: " + this.numCols);
  global.log("rows: " + this.numRows);
*/	
	let binding = binding_o.get_name();
//  global.log(binding);
	
	if (binding == this.bindings[0]) {
    this.get_next_workspace(Meta.MotionDirection.UP);
    window.change_workspace(this.metaWorkspace);
    this.metaWorkspace.activate_with_focus(window, global.get_current_time());
    Main.wm.showWorkspaceOSD();
	} else if (binding == this.bindings[1]) {
    this.get_next_workspace(Meta.MotionDirection.DOWN);
    window.change_workspace(this.metaWorkspace);
    this.metaWorkspace.activate_with_focus(window, global.get_current_time());
    Main.wm.showWorkspaceOSD();
	} else if (binding == this.bindings[2]) {
    this.get_next_workspace(Meta.MotionDirection.UP);
    this.metaWorkspace.activate(global.get_current_time());
    Main.wm.showWorkspaceOSD();
	} else if (binding == this.bindings[3]) {
    this.get_next_workspace(Meta.MotionDirection.DOWN);
    this.metaWorkspace.activate(global.get_current_time());
    Main.wm.showWorkspaceOSD();
	}
    
	if (current_workspace_index !== global.screen.get_active_workspace_index())
        Main.wm.showWorkspaceOSD();
}


function updateWorkspaces() {
	// This is code from workspace-grid@hernejj's applet.
	let new_ws_count = this.numCols * this.numRows;
	let old_ws_count = global.screen.n_workspaces;
	if (new_ws_count > old_ws_count) {
		for (let i=old_ws_count; i<new_ws_count; i++)
			global.screen.append_new_workspace(false, global.get_current_time());
	}
	else if (new_ws_count < old_ws_count) {
		for (let i=old_ws_count; i>new_ws_count; i--) {
			let ws = global.screen.get_workspace_by_index( global.screen.n_workspaces-1 );
			global.screen.remove_workspace(ws, global.get_current_time());
		}
	}
	global.screen.override_workspace_layout(
		Meta.ScreenCorner.TOPLEFT, false, this.numRows, this.numCols);
}

function init(metadata) {
    let settings = new Settings.ExtensionSettings(this, metadata.uuid);
	settings.bindProperty(Settings.BindingDirection.IN,
		"numCols", "numCols", updateWorkspaces)

	settings.bindProperty(Settings.BindingDirection.IN,
		"numRows", "numRows", updateWorkspaces)
}

function enable() {
	for (let k in bindings) {
//    global.log("k: "+k);
		bind_handlers[k] = Meta.keybindings_set_custom_handler(bindings[k], Lang.bind(this, onSwitch));
	}

}

function disable() {
	for (let k in bindings) {
    global.display.disconnect(bind_handlers[k]);
	}
}
