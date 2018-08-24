const ChannelMerger = function (context, inputs) {
    this.context = context
    this.channelMerger = this.context.createChannelMerger(inputs || 6);
}

ChannelMerger.prototype.connect = function(out) {
    if (out.node) {
        this.channelMerger.connect(out.node)
    } else {
        this.channelMerger.connect(out)
    }
}

module.exports = ChannelMerger