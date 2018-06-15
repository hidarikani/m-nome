import {noteNames, octaveNames, noteFrequencies} from './modules/musical-constants.js';

class Instrument {
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    getOscillator(frequency) {
        let osc = this.audioContext.createOscillator();
        osc.frequency.value = frequency;
        osc.connect(this.audioContext.destination);
        return osc;
    }

    getNoteFrequency(note) {
        return noteFrequencies[note.octave][note.name];
    }

    scheduleNote(note, startTime, stopTime) {
        let frequency = this.getNoteFrequency(note);
        let oscillator = this.getOscillator(frequency);
        oscillator.start(startTime);
        oscillator.stop(stopTime);
    }
}

// see https://www.html5rocks.com/en/tutorials/audio/scheduling/
class Scheduler {
    constructor(audioContext, instrument, noteSequence) {
        this.audioContext = audioContext;
        this.instrument = instrument;

        this.secondsPerMinute = 60;
        this.beatsPerMinute = 90;
        this.schedulingInterval = 0.025;
        this.lookAhead = 0.1;
        this.isPlaying = false;
        this.currentBeat = 0;
        this.noteSequence = noteSequence;

        this.scheduleNotes = this.scheduleNotes.bind(this);
    }

    calcBeatInterval() {
        this._beatInterval = this.secondsPerMinute / this.beatsPerMinute;
    }

    scheduleNotes() {
        while (this._currentBeatTime < this.audioContext.currentTime + this.lookAhead ) {
            this.scheduleNote();
            this.currentBeat++;
            this._currentBeatTime = this.currentBeat * this._beatInterval;
        }

        if (this.isPlaying) {
            setTimeout(this.scheduleNotes, this.schedulingInterval);
        }
    }

    scheduleNote() {
        let sequenceLength = this.noteSequence.length;
        let sequenceBeat = this.currentBeat % sequenceLength;
        let currentNote = this.noteSequence[sequenceBeat];
        let stopTime = this._currentBeatTime + (this._beatInterval * 0.9);
        this.instrument.scheduleNote(currentNote, this.nextBeatTime, stopTime);
    }

    togglePlayback() {
        if (this.isPlaying) {
            this.isPlaying = false;
            clearTimeout(this.timeoutHandle);
            console.log('⏹ Stopping');
        } else {
            this.calcBeatInterval();
            this._currentBeatTime = this.audioContext.currentTime + 0.1;
            this.isPlaying = true;
            this.timeoutHandle = setTimeout(this.scheduleNotes, this.schedulingInterval);
            console.log('▶ Starting');
        }
    }

    reset() {
        this.isPlaying = false;
        this.currentBeat = 0;
    }
}

class Metronome {
    constructor() {
        let audioContext = new AudioContext();
        // audio time is not discrete
        // a sequence is a simplified representation
        let noteSequence = [
            // in this version a single note can be played at a time
            // note duration is set to the beat duration
            {name: noteNames.D, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.D, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.D, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.D, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
            {name: noteNames.C, octave: octaveNames.four},
        ];
    
        let instrument = new Instrument(audioContext);
        this.scheduler = new Scheduler(audioContext, instrument, noteSequence);
    }

    togglePlayback() {
        this.scheduler.togglePlayback();
    }
}

window.metronome = new Metronome();



