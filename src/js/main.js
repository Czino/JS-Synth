const synth = new Synth()
if (document.attachEvent) {
    document.attachEvent('onkeydown', play)
} else {
    document.addEventListener('keydown', play)
}

function play() {
    synth.play()
}