const Keyboard = function (out) {
    this.out = out
    this.octave = 3
    this.keyMap = {
        'a': 69,
        'w': 70,
        's': 71,
        'e': 72,
        'd': 73,
        'f': 74,
        't': 75,
        'g': 76,
        'z': 77,
        'y': 77,
        'h': 78,
        'u': 79,
        'j': 80,
        'k': 81,
        'l': 82
    }
}

Keyboard.prototype.activate = function() {
    if (document.attachEvent) {
        document.attachEvent('onkeydown', this.onKeyDown.bind(this))
        document.attachEvent('onkeyup', this.onKeyUp.bind(this))
    } else {
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }
}

Keyboard.prototype.deactivate = function() {
    if (document.detachEvent) {
        document.detachEvent('onkeydown', this.onKeyDown)
        document.detachEvent('onkeyup', this.onKeyUp)
    } else {
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener('keyup', this.onKeyUp)
    }
}

Keyboard.prototype.connect = function(out) {
    this.out = out
}

Keyboard.prototype.onKeyDown = function(e) {
    if (this.keyMap.hasOwnProperty(e.key)) {
        this.out.play(this._MIDIToFrequency(this.keyMap[e.key]))
    }
    if (!isNaN(e.key)) {
        this.octave = parseInt(e.key)
    }
}
Keyboard.prototype.onKeyUp = function(e) {
    this.out.stop()
}

Keyboard.prototype._MIDIToFrequency = function(MIDINote) {
    return Math.pow(2, (MIDINote - 69) / 12) * 440.0 * this.octave / 3
}

module.exports = Keyboard