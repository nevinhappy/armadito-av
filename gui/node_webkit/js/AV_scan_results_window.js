var gui = require('nw.gui');

// New scan instance here
// Init connexion to AV

// Step 1
var scan_id = create_IHM_scan_server();

// Parsing of IHM user inputs
var scan = parse_json_str(global.new_scan);
if( scan == null){
	console.error("Error when parsing : " + new_scan);
	shutdown_scan_server();
}
else{
	
	// We connect to AV 
	connect_to_AV();
	
	// We ask for a new scan by sending a message to AV
	if( ask_for_new_scan(scan, scan_id) < 0){	
	
	    // TODO : message to user in window, ask him to retry scan.
		console.error("ask_for_new_scan failed, closing connections. Shutdown server.");
		shutdown_scan_server();
		client_socket.destroy();
		global.new_scan = null;
	}
	
	// Waiting for connexions on scan_server
}

// Demo implementation of an HTML progress bar, updated from JS
function update_scan_progress_bar() {
  var progress = document.getElementById("scan_progress");
  var prc = document.getElementById("pourcentage");
  prc.innerHTML = progress.value + "%";
}

update_scan_progress_bar(); //Initialisation de la progress bar

// TODO : Call this function when receive a message from AV scan in progress
function scan_progress_on_change (val) {
  var progress = document.getElementById("scan_progress");
  if((progress.value+val)<=progress.max && (progress.value+val)>=0) {
     progress.value += val;
  }
  update_scan_progress_bar();
}