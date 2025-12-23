import AngleConverter from './AngleConverter.js';

export default class RadianToDegree extends AngleConverter {
    convert(radians) {
        return radians * (180 / Math.PI);
    }
}
