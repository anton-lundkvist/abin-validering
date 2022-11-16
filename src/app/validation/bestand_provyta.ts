import { isPositiveInteger, isInteger } from './utils';
import { ValidationResult } from './validationResult.model';

export const validateBestandProvyta = (dataRows: any[][]) => {
    const validationResult: ValidationResult[] = [];
    dataRows.forEach((dataRow, ind) => {
        const row = ind + 1;
        if (!validateBestandIdAndBestandCoords(dataRow)) {
            validationResult.push({
                row: row,
                description: 'Om bestID>0 ska beståndskoordinater finnas',
                severity: 'error'
            });
        }

        if (!validateBestandHojd(dataRow)) {
            validationResult.push({
                row: row,
                description:
                    'Bestånds höjd saknas, ska finnas för alla bestånd där inv_krit=1',
                severity: 'error'
            });
        }
        if (!validateBestandAlder(dataRow)) {
            validationResult.push({
                row: row,
                description:
                    'Bestånds ålder saknas, ska finnas för alla bestånd där inv_krit=1',
                severity: 'error'
            });
        }
        if (!validateSummaTradslagsandelar(dataRow)) {
            validationResult.push({
                row: row,
                description: 'Summa av trädslagsandelar <>100',
                severity: 'error'
            });
        }
        if (!validateStandortsindex(dataRow)) {
            validationResult.push({
                row: row,
                description:
                    'Ståndortsindex saknas, ska finnas för alla bestånd där inv_abin=1',
                severity: "warning"
            });
        }
    });
    return validationResult;
};

const validateBestandIdAndBestandCoords = (dataRow: Record<string, any>) => {
    /*1. Om bestID>0 ska beståndskoordinater finnas*/
    const bestandId = dataRow['BEST_ID'];
    if (bestandId && Number.isInteger(bestandId) && bestandId > 0) {
        const bestandX = dataRow['BEST_X'];
        const bestandY = dataRow['BEST_Y'];
        if (!bestandX || !bestandY) {
            return false;
        }
    }
    return true;
};

const validateBestandHojd = (dataRow: any[]) => {
    /*2. Bestånds höjd saknas, ska finnas för alla bestånd där inv_krit=1*/
    const invKrit: any = dataRow['INV_KRIT'];
    if (invKrit && Number.isInteger(invKrit) && invKrit === 1) {
        const bestHjd = dataRow['BEST_HJD'];
        if (!bestHjd) {
            return false;
        }
    }
    return true;
};

const validateBestandAlder = (dataRow: Record<string, any>) => {
    const invKrit = dataRow['INV_KRIT'];
    if (invKrit && Number.isInteger(invKrit) && invKrit === 1) {
        const bestAlder = dataRow['BEST_ALD'];
        if (!bestAlder) {
            return false;
        }
    }
    return true;
};

const validateSummaTradslagsandelar = (dataRow: Record<string, any>) => {
    const invAbin = dataRow['INV_ABIN'];
    if (isPositiveInteger(invAbin) && invAbin === 1) {
        const tallAnd = dataRow['TALL_AND'];
        const granAnd = dataRow['GRAN_AND'];
        const bjorkAnd = dataRow['BJOR_AND'];
        const ovrigAnd = dataRow['OVRI_AND'];
        if (
            !isInteger(tallAnd) ||
            !isInteger(granAnd) ||
            !isInteger(bjorkAnd) ||
            !isInteger(ovrigAnd)
        ) {
            return false;
        }
        const sum = tallAnd + granAnd + bjorkAnd + ovrigAnd;

        if (sum < 100 || sum > 100) {
            return false;
        }
    }
    return true;
};

const validateStandortsindex = (dataRow: Record<string, any>) => {
    const invAbin = dataRow['INV_ABIN'];
    if (isPositiveInteger(invAbin) && invAbin === 1) {
        const si = dataRow['BEST_SI'];
        if (!si) {
            return false;
        }
    }
    return true;
};
