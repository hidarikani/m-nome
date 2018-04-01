// see https://en.wikipedia.org/wiki/Musical_note

// todo add sharps and flats
const noteNames = {
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    G: 'G',
    A: 'A',
    B: 'B'
}

const octaveNames = {
    pegativeOne: 'negativeOne',
    zero: 'zero',
    one: 'one',
    two: 'two',
    three: 'three',
    four: 'four',
    five: 'five',
    six: 'six',
    seven: 'seven',
    eight: 'eight'
};


// see https://en.wikipedia.org/wiki/Piano_key_frequencies
// todo add all octaves
let noteFrequencies = {};
noteFrequencies[octaveNames.four] = {};
noteFrequencies[octaveNames.four][noteNames.C] = 261.626;
noteFrequencies[octaveNames.four][noteNames.D] = 293.665;
noteFrequencies[octaveNames.four][noteNames.E] = 329.628;
noteFrequencies[octaveNames.four][noteNames.F] = 349.228;
noteFrequencies[octaveNames.four][noteNames.G] = 391.995;
noteFrequencies[octaveNames.four][noteNames.G] = 440.000;
noteFrequencies[octaveNames.four][noteNames.G] = 493.883;

export {noteNames, octaveNames, noteFrequencies};
