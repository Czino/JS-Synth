const ChannelMerger = function (context, inputs) {
    this.context = context
    this.channelMerger = this.context.createChannelMerger(inputs || 6);
}

ChannelMerger.prototype.connect = function(destination) {
    this.channelMerger.connect(destination)
}

module.exports = ChannelMerger