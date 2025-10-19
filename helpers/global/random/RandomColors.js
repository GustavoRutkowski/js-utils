import ErrorHandler from '../ErrorHandler.js';
import Random from './Random.js';

class RandomColors {
    static color(format = 'rgb') {
        const formatsMap = {
            'rgb': () => {
                const red   = Random.int(0, 255);
                const green = Random.int(0, 255);
                const blue  = Random.int(0, 255);

                return `rgb(${red}, ${green}, ${blue})`;
            },
            'rgba': () => {
                const red   = Random.int(0, 255);
                const green = Random.int(0, 255);
                const blue  = Random.int(0, 255);
                const alpha = Random.float(0, 1);

                return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            },
            'hex': () => {
                const allColorsNumber = 256 * 256 * 256;

                const decimalColorNumber = Random.int(0, allColorsNumber - 1);
                const hexadecimal = decimalColorNumber.toString(16).padStart(6, '0');

                return `#${hexadecimal}`;
            },
            'hsl': () => { /* ... */ }
        };

        ErrorHandler.inObject(format, formatsMap, { varName: 'color format' });
        return formatsMap?.[format]?.();
    }

    static gradient(type = 'linear') {
        const firstColor = RandomColors.color('hex');
        const secondColor = RandomColors.color('hex');
        
        const typesMap = {
            'linear': () => {
                const angle = RandomColors.int(0, 360);
                return `linear-gradient(${angle}deg, ${firstColor}, ${secondColor})`;
            },
            'radial': () => {
                const shapes = ['circle', 'ellipse'];
                const positions = ['at top', 'at bottom', 'at left', 'at right', 'at center', ''];

                const shape = `${RandomColors.choice(...shapes)} ${RandomColors.choice(...positions)}`;

                return `radial-gradient(${shape}, ${firstColor}, ${secondColor})`;
            }
        };

        ErrorHandler.inObject(type, typesMap, { varName: 'gradient type' });
        return typesMap?.[type]?.();
    }
}

export default RandomColors;
