import AngleConverter from './AngleConverter.js';

export default class DegreeToRadian extends AngleConverter {
    convert(degrees) {
        return degrees * (Math.PI / 180);
    }
}
