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
        'o': 82,
        'l': 83,
        'p': 84
    }
    this.activeKeys = {}
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

Keyboard.prototype.pressKey = function(key) {
    this.out.play(
        this._MIDIToFrequency(this.keyMap[key]),
        key
    )
}

Keyboard.prototype.offKey = function(key) {
    this.out.stop(key)
}

Keyboard.prototype.onKeyDown = function(e) {
    if (!isNaN(e.key)) {
        this.octave = parseInt(e.key)
    }
    if (e.metaKey || e.shiftKey || !isNaN(e.key) ||this.activeKeys[e.key]) {
        return
    }

    this.activeKeys[e.key] = true

    Object.keys(this.activeKeys).forEach((key) => {
        if (this.activeKeys[key] && this.keyMap.hasOwnProperty(key)) {
            this.pressKey(key)
        }
    })
}
Keyboard.prototype.onKeyUp = function(e) {
    if (e.metaKey || e.shiftKey || !isNaN(e.key) || !this.activeKeys[e.key]) {
        return
    }
    this.activeKeys[e.key] = false
    this.offKey(e.key)
}

Keyboard.prototype._MIDIToFrequency = function(MIDINote) {
    return Math.pow(2, (MIDINote - 69) / 12) * 440.0 * this.octave / 6
}

module.exports = Keyboard