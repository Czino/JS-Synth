const Keyboard = function (out) {
    this.out = out
}

Keyboard.prototype.activate = function() {
    if (document.attachEvent) {
        document.attachEvent('onkeydown', this.play.bind(this))
    } else {
        document.addEventListener('keydown', this.play.bind(this))
    }
}

Keyboard.prototype.deactivate = function() {
    if (document.detachEvent) {
        document.detachEvent('onkeydown', this.play.bind(this))
    } else {
        document.removeEventListener('keydown', this.play.bind(this))
    }
}

Keyboard.prototype.connect = function(out) {
    this.out = out
}

Keyboard.prototype.play = function(out) {
    this.out.play()
}

module.exports = Keyboard