function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function showresults() {
    w3_close();
    document.getElementById('resmodal').style.display = 'block'
}