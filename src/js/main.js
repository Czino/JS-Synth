const synth = new Synth({
    'polyphony': 8
})
const keyboard = new SynthKeyboard(synth)

keyboard.activate()

connectControls()

function connectControls() {
    let master = document.getElementById('master')
    let waveShape = document.getElementById('waveShape')
    let pan = document.getElementById('pan')
    let lfo = document.getElementById('lfo')
    let attack = document.getElementById('attack')
    let decay = document.getElementById('decay')
    let sustain = document.getElementById('sustain')
    let release = document.getElementById('release')
    let shapes = [
        'sine',
        'square',
        'sawtooth',
        'triangle',
        'sawtooth'
    ]
    master.addEventListener('change', (e) => {
        synth.setMaster(e.target.value / 100)
    })
    waveShape.addEventListener('change', (e) => {
        synth.setWaveShape(shapes[e.target.value])
    })
    attack.addEventListener('change', (e) => {
        synth.setEnvelope({'attack': e.target.value * 100})
    })
    decay.addEventListener('change', (e) => {
        synth.setEnvelope({'decay': e.target.value  * 100})
    })
    sustain.addEventListener('change', (e) => {
        synth.setEnvelope({'sustain': e.target.value / 100})
    })
    release.addEventListener('change', (e) => {
        synth.setEnvelope({'release': e.target.value * 100})
    })
}