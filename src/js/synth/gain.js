const Gain = function (context, gain) {
    this.node = context.createGain()
    this.node.gain.value = gain || .5
}

Gain.prototype.connect = function(out) {
    if (out.node) {
        this.node.connect(out.node)
    } else {
        this.node.connect(out)
    }
}

Gain.prototype.setValue = function(value) {
    this.node.gain.value = value
}

module.exports = Gain