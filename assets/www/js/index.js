/**************
* View
**************/
function showVideoList () {
    $("div.videoList").toggleClass("hide",false);
    $("div.downloadList").toggleClass("hide",true);
    $("div.manageList").toggleClass("hide",true);
}


function showDownloadList () {
    $("div.videoList").toggleClass("hide",true);
    $("div.downloadList").toggleClass("hide",false);
    $("div.manageList").toggleClass("hide",true);

    loadDownloadFiles();
}

function showManageDiv () {
    $("div.videoList").toggleClass("hide",true);
    $("div.downloadList").toggleClass("hide",true);
    $("div.manageList").toggleClass("hide",false);
}

function delSubmit (isDel) {
	$('input[type="checkbox"]').each(function () {
		if($(this).is(':checked')){
			if(isDel){
				alert($(this).attr("id"));
			}else{
				$(this).attr("checked",false).checkboxradio("refresh");
				showDownloadList();
			}
		}
	});
}

/****************
* Logical
****************/
function fail (evt) {
	console.log(evt.target.error.code);
}

function loadDownloadFiles () {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFS, fail);
}

function getFS (fileSystem) {
	fileSystem.root.getDirectory("nplayer", null, getDirectoryEntry, fail);
}

function getDirectoryEntry (dirEntry) {
	var dirReader = dirEntry.createReader();
	dirReader.readEntries(readDirEntriesSuccess,fail);
}

function readDirEntriesSuccess (entries) {
	var i;
	for (i=0; i < entries.length; i++) {
		console.log("###"+entries[i].name);
	};
}