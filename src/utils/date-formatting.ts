/**
 * @file: Date Formatting Utils
 *
 * @author Yashvardhan Nehra <yashvardhan.nehra@thoughtspot.com>
 *
 * Copyright: ThoughtSpot Inc. 2023
 */

import _ from 'lodash';
import { DateTime } from 'luxon';
import {
    ChartColumn,
    ColumnTimeBucket,
    ColumnType,
    DataType,
} from '../types/answer-column.types';

export interface CustomCalendarDate {
    v: {
        s: number;
        e: number;
    };
    d: string;
}

export const dateFormatPresets = {
    DATE_SHORT: 'DATE_SHORT',
    DATE_SHORT_WITH_HOUR: 'DATE_SHORT_WITH_HOUR',
    DATE_SHORT_WITH_HOUR_WITHOUT_YEAR: 'DATE_SHORT_WITH_HOUR_WITHOUT_YEAR',
    DATETIME_SHORT: 'DATETIME_SHORT',
    DATETIME_SHORT_WITHOUT_YEAR: 'DATETIME_SHORT_WITHOUT_YEAR',
    DATETIME_SHORT_WITH_SECONDS: 'DATETIME_SHORT_WITH_SECONDS',
    DATETIME_SHORT_WITH_MILLIS: 'DATETIME_SHORT_WITH_MILLIS',
    MONTH_WITH_YEAR: 'MONTH_WITH_YEAR',
    QUARTER_WITH_YEAR: 'QUARTER_WITH_YEAR',
    QUARTER_WITH_2_DIGIT_YEAR: 'QUARTER_WITH_2_DIGIT_YEAR',
    DEFAULT_TIME_FORMAT: 'DEFAULT_TIME_FORMAT',
    TIME_24_WITH_SECONDS: 'TIME_24_WITH_SECONDS',
    DATE_SHORT_2_DIGIT_YEAR: 'DATE_SHORT_2_DIGIT_YEAR',
    DATETIME_24_SHORT_WITHOUT_YEAR: 'DATETIME_24_SHORT_WITHOUT_YEAR',
    DATETIME_24_SHORT: 'DATETIME_24_SHORT',
    DATETIME_SHORT_WITH_SECONDS_WITHOUT_YEAR:
        'DATETIME_SHORT_WITH_SECONDS_WITHOUT_YEAR',
    DATETIME_SHORT_WITH_MILLIS_WITHOUT_YEAR:
        'DATETIME_SHORT_WITH_MILLIS_WITHOUT_YEAR',
    DATETIME_24_SHORT_WITH_MILLIS_WITHOUT_YEAR:
        'DATETIME_24_SHORT_WITH_MILLIS_WITHOUT_YEAR',
    DATETIME_24_SHORT_WITH_MILLIS: 'DATETIME_24_SHORT_WITH_MILLIS',
    MONTH_WITH_DAY_AND_YEAR: 'MONTH_WITH_DAY_AND_YEAR',
    MONTH_WITH_2_DIGIT_YEAR: 'MONTH_WITH_2_DIGIT_YEAR',
    DAY_WITH_MONTH_NUM: 'DAY_WITH_MONTH_NUM',
    DATE_SHORT_WITH_HOUR_24_WITHOUT_YEAR:
        'DATE_SHORT_WITH_HOUR_24_WITHOUT_YEAR',
    DATE_SHORT_WITH_HOUR_24: 'DATE_SHORT_WITH_HOUR_24',
    QUARTER: 'QUARTER',
    MONTH_ONLY: 'MONTH_ONLY',
    DATETIME_WITH_SHORT_OFFSET: 'DATETIME_WITH_SHORT_OFFSET',
};
const yearlessFormats = {
    DATE_SHORT: 'DAY_WITH_MONTH',
    DATE_SHORT_WITH_HOUR: 'DATE_SHORT_WITH_HOUR_WITHOUT_YEAR',
    DATETIME_SHORT: 'DATETIME_SHORT_WITHOUT_YEAR',
    DATETIME_SHORT_WITH_SECONDS: 'DATETIME_SHORT_WITH_SECONDS_WITHOUT_YEAR',
    DATETIME_SHORT_WITH_MILLIS: 'DATETIME_SHORT_WITH_MILLIS_WITHOUT_YEAR',
    MONTH_WITH_YEAR: 'MONTH_ONLY',
    QUARTER_WITH_YEAR: 'QUARTER',
    QUARTER_WITH_2_DIGIT_YEAR: 'QUARTER',
    DATE_SHORT_2_DIGIT_YEAR: 'DAY_WITH_MONTH',
    DATETIME_24_SHORT: 'DATETIME_24_SHORT_WITHOUT_YEAR',
    DATETIME_24_SHORT_WITH_MILLIS: 'DATETIME_24_SHORT_WITH_MILLIS_WITHOUT_YEAR',
    MONTH_WITH_DAY_AND_YEAR: 'DAY_WITH_MONTH',
    MONTH_WITH_2_DIGIT_YEAR: 'DAY_WITH_MONTH',
    DATE_SHORT_WITH_HOUR_24: 'DATE_SHORT_WITH_HOUR_24_WITHOUT_YEAR',
};

export const dateNumTypes = {
    DATE_NUM_ABS_DAY: 'DATE_NUM_ABS_DAY',
    DATE_NUM_ABS_MONTH: 'DATE_NUM_ABS_MONTH',
    DATE_NUM_ABS_QUARTER: 'DATE_NUM_ABS_QUARTER',
    DATE_NUM_ABS_YEAR: 'DATE_NUM_ABS_YEAR',
    DATE_NUM_DAY_IN_MONTH: 'DATE_NUM_DAY_IN_MONTH',
    DATE_NUM_DAY_IN_QUARTER: 'DATE_NUM_DAY_IN_QUARTER',
    DATE_NUM_DAY_IN_YEAR: 'DATE_NUM_DAY_IN_YEAR',
    DATE_NUM_DAY_OF_WEEK: 'DATE_NUM_DAY_OF_WEEK',
    DATE_NUM_MONTH_IN_QUARTER: 'DATE_NUM_MONTH_IN_QUARTER',
    DATE_NUM_MONTH_IN_YEAR: 'DATE_NUM_MONTH_IN_YEAR',
    DATE_NUM_QUARTER_IN_YEAR: 'DATE_NUM_QUARTER_IN_YEAR',
    DATE_NUM_WEEK_IN_YEAR: 'DATE_NUM_WEEK_IN_YEAR',
    DATE_NUM_WEEK_IN_QUARTER: 'DATE_NUM_WEEK_IN_QUARTER',
    DATE_NUM_WEEK_IN_MONTH: 'DATE_NUM_WEEK_IN_MONTH',
    DATE_NUM_HOUR_IN_DAY: 'DATE_NUM_HOUR_IN_DAY',
};

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const bucketizationToDatePreset = {
    HOURLY: dateFormatPresets.DATE_SHORT_WITH_HOUR, // hourly
    DAILY: dateFormatPresets.DATE_SHORT, // daily
    WEEKLY: dateFormatPresets.DATE_SHORT, // weekly
    MONTHLY: dateFormatPresets.MONTH_WITH_YEAR,
    QUARTERLY: dateFormatPresets.QUARTER_WITH_YEAR, // quarterly
    YEARLY: 'yyyy', // yearly
};
const dateFormatPresetsToLuxonPresets = {
    [dateFormatPresets.TIME_24_WITH_SECONDS]: DateTime.TIME_24_WITH_SECONDS,
};

export const timeBuckets = {
    NO_BUCKET: 'ms',
    HOURLY: 'h',
    DAILY: 'd',
    WEEKLY: 'w',
    MONTHLY: 'M',
    QUARTERLY: 'Q',
    YEARLY: 'y',
    DAY_OF_WEEK: 'dow',
    DAY_OF_MONTH: 'dom',
    DAY_OF_QUARTER: 'doq',
    DAY_OF_YEAR: 'doy',
    WEEK_OF_MONTH: 'wom',
    WEEK_OF_QUARTER: 'woq',
    WEEK_OF_YEAR: 'woy',
    MONTH_OF_QUARTER: 'moq',
    MONTH_OF_YEAR: 'moy',
    QUARTER_OF_YEAR: 'qoy',
};

const DEFAULT_QUARTER_START_MONTH = 1;

export const isDateColumn = (col: ChartColumn) =>
    DataType[col.dataType] === 'DATE' || DataType[col.dataType] === 'DATE_TIME';

export const isAttribute = (col: ChartColumn) =>
    col.type === ColumnType.ATTRIBUTE;

export const isDateTimeColumn = (col: ChartColumn) =>
    DataType[col.dataType] === 'DATE_TIME';

export const getCustomCalendarGuidFromColumn = (col: ChartColumn) =>
    col.calenderGuid;

const isDateNumTimeBucket = (col: ChartColumn): boolean => {
    return [
        ColumnTimeBucket.HOUR_OF_DAY,
        ColumnTimeBucket.DAY_OF_WEEK,
        ColumnTimeBucket.DAY_OF_MONTH,
        ColumnTimeBucket.DAY_OF_QUARTER,
        ColumnTimeBucket.DAY_OF_YEAR,
        ColumnTimeBucket.WEEK_OF_MONTH,
        ColumnTimeBucket.WEEK_OF_QUARTER,
        ColumnTimeBucket.WEEK_OF_YEAR,
        ColumnTimeBucket.MONTH_OF_QUARTER,
        ColumnTimeBucket.MONTH_OF_YEAR,
        ColumnTimeBucket.QUARTER_OF_YEAR,
    ].includes(col.timeBucket);
};
export const isDateNumColumn = (col: ChartColumn): boolean => {
    return isAttribute(col) && isDateNumTimeBucket(col);
};

export const isDateFamilyColumn = (col: ChartColumn): boolean => {
    return isDateColumn(col) || isDateNumColumn(col);
};

export const isTimeColumn = (col: ChartColumn) => {
    return DataType[col.dataType] === 'TIME';
};

export const getEffectiveDateNumDataType = (col: ChartColumn) => {
    switch (col.timeBucket) {
        case ColumnTimeBucket.DAY_OF_WEEK:
            return dateNumTypes.DATE_NUM_DAY_OF_WEEK;
        case ColumnTimeBucket.DAY_OF_MONTH:
            return dateNumTypes.DATE_NUM_DAY_IN_MONTH;
        case ColumnTimeBucket.DAY_OF_QUARTER:
            return dateNumTypes.DATE_NUM_DAY_IN_QUARTER;
        case ColumnTimeBucket.DAY_OF_YEAR:
            return dateNumTypes.DATE_NUM_DAY_IN_YEAR;
        case ColumnTimeBucket.WEEK_OF_MONTH:
            return dateNumTypes.DATE_NUM_WEEK_IN_MONTH;
        case ColumnTimeBucket.WEEK_OF_QUARTER:
            return dateNumTypes.DATE_NUM_WEEK_IN_QUARTER;
        case ColumnTimeBucket.WEEK_OF_YEAR:
            return dateNumTypes.DATE_NUM_WEEK_IN_YEAR;
        case ColumnTimeBucket.MONTH_OF_QUARTER:
            return dateNumTypes.DATE_NUM_MONTH_IN_QUARTER;
        case ColumnTimeBucket.MONTH_OF_YEAR:
            return dateNumTypes.DATE_NUM_MONTH_IN_YEAR;
        case ColumnTimeBucket.QUARTER_OF_YEAR:
            return dateNumTypes.DATE_NUM_QUARTER_IN_YEAR;
        default:
            return undefined;
    }
};

/**
 * Determines if the given column has a custom calendar.
 *
 * @param col - The chart column to check.
 * @returns True if the column is a date family column and has a custom calendar GUID, false otherwise.
 */
export const hasCustomCalendar = (col: ChartColumn): boolean =>
    isDateFamilyColumn(col) && !!getCustomCalendarGuidFromColumn(col);

/**
 * Retrieves the start epoch from a custom calendar date.
 *
 * @param date - The custom calendar date object.
 * @returns The start epoch time if present, null otherwise.
 */
export function getStartEpoch(date: CustomCalendarDate): number | null {
    if (_.has(date, 'v') && _.has(date.v, 's')) {
        return date.v.s;
    }
    return null;
}

export const assignQuarterValueToString = (
    quarter_of_year: any,
    value: any,
) => {
    return quarter_of_year.replace(/\{.*?\}/, value);
};

export function getMonthOfYear(
    num: any,
    quarterStartMonth: any,
    monthOfYear: any,
) {
    let monthNum = num + quarterStartMonth - 1;
    monthNum = monthNum > 12 ? monthNum - 12 : monthNum;

    return monthOfYear[months[monthNum - 1]]; // -1 as monthNum is 1 indexed
}

export function getDisplayString(date: CustomCalendarDate): string | null {
    if (_.has(date, 'd')) {
        return date.d;
    }
    return null;
}

export const useQuarterStart = (luxonDate: any, quarterStartMonth: any) => {
    const newLuxonDate = luxonDate;
    newLuxonDate.quarterStartMonth = quarterStartMonth;
    return newLuxonDate;
};

export const getCustomCalendarValueFromEpoch = (
    col: ChartColumn,
    dateEpoch: number,
    displayToCustomCalendarValueMap: any,
) => {
    if (
        hasCustomCalendar(col) &&
        _.has(displayToCustomCalendarValueMap, dateEpoch)
    ) {
        return displayToCustomCalendarValueMap[dateEpoch];
    }
    return null;
};
const parseDate = (dateString: string, format: string, options: any) => {
    return DateTime.fromFormat(
        dateString,
        options.tsLocaleBasedDateFormats[format] || format,
    ).toJSDate();
};

export function getSpecialFormatData(value: string | number, options: any) {
    if (
        value ===
            options.tsLocaleBasedStringsFormats.null_value_placeholder_label ||
        value ===
            options.tsLocaleBasedStringsFormats.empty_value_placeholder_label
    ) {
        return value;
    }

    if (value === options.tsDateConstants.special_value_unavailable) {
        return options.tsLocaleBasedStringsFormats
            .unavailabe_column_sample_value;
    }

    // This (==) checks for both null and undefined
    if (value === null || value === undefined) {
        return options.tsLocaleBasedStringsFormats.null_value_placeholder_label;
    }
    // {Empty} placeholder is set for empty string or no characters
    // other than spaces.
    if (value === '') {
        return options.tsLocaleBasedStringsFormats
            .empty_value_placeholder_label;
    }
    return null;
}

export function sanitizeDate(
    inputDate: string | number,
    format: string,
    options: any,
) {
    const specialVal = getSpecialFormatData(inputDate, options);
    if (specialVal) {
        return specialVal;
    }
    if (typeof inputDate === 'string') {
        if (!_.isNaN(Number(inputDate))) {
            return parseInt(inputDate, 10);
        }
        return parseDate(inputDate, format, options);
    }
    return inputDate;
}

/**
 * Get the formatted date based on the format tokens
 * @param {number} epochMillis
 * @param {string} format: use dateFormatPresets to get localized formatted date
 * or pass the format pattern for non localized results
 * @returns {string}
 */
export const formatDateTime = (
    epochMillis: number,
    format: string,
    useSystemCalendar?: boolean,
    options?: any,
) => {
    let newFormat = format;
    let luxonDate;
    try {
        luxonDate = DateTime.fromMillis(epochMillis * 1000);
    } catch (e) {
        return 'Invalid Date';
    }
    if (options.tsLocaleBasedDateFormats[newFormat]) {
        if (_.get(options, 'omitYear')) {
            if (yearlessFormats[newFormat as keyof typeof yearlessFormats]) {
                newFormat =
                    yearlessFormats[newFormat as keyof typeof yearlessFormats];
            }
        }
        newFormat = options.tsLocaleBasedDateFormats[newFormat];
    }
    const customCalendarOverridesFiscalOffset = _.get(
        options,
        'customCalendarOverridesFiscalOffset',
    );
    // if format preset is a luxon preset
    if (!newFormat || dateFormatPresetsToLuxonPresets[newFormat]) {
        // Note: this will not add FY to the year in case of custom
        // quarterStartMonth but the year would be the correct fiscal year
        return luxonDate.toLocaleString(
            dateFormatPresetsToLuxonPresets[newFormat],
        );
    }
    // qqq is not supported in luxon
    newFormat = newFormat.replace(/qqq/, "'Q'q");
    // support YYYY and YY
    newFormat = newFormat.replace(/(YYYY|YY)/, _.lowerCase);
    const quarterStartMonth = options.quarterStartMonth;
    if (
        quarterStartMonth > 1 &&
        !useSystemCalendar &&
        !customCalendarOverridesFiscalOffset
    ) {
        newFormat = newFormat.replace(/[yyyy||yy]/, "'FY' $&");
    }
    return useQuarterStart(
        luxonDate,
        useSystemCalendar ? DEFAULT_QUARTER_START_MONTH : quarterStartMonth,
    ).toFormat(newFormat);
};

function getDayOfWeek(num: any, weekOfDay: any) {
    const new_num = num % 7;
    return weekOfDay[weekdays[new_num]];
}

export function getOrdinalSuffixedValue(i: number | string): string {
    let ni = i;
    // eslint-disable-next-line radix
    ni = parseInt(ni.toString());
    const j = ni % 10;
    const k = ni % 100;
    // eslint-disable-next-line eqeqeq
    if (j == 1 && k != 11) {
        return `${ni}st`;
    }
    // eslint-disable-next-line eqeqeq
    if (j == 2 && k != 12) {
        return `${ni}nd`;
    }
    // eslint-disable-next-line eqeqeq
    if (j == 3 && k != 13) {
        return `${ni}rd`;
    }
    return `${ni}th`;
}

export function formatDateNum(
    effectiveDataType: string | undefined,
    value: number | string,
    formatPattern: string,
    options: any,
) {
    let newValue = value;
    if (_.isString(newValue)) {
        // eslint-disable-next-line radix
        newValue = parseInt(value.toString());
    }

    if (!value && value !== 0) {
        return options.tsLocaleBasedStringsFormats.null_value_placeholder_label;
    }
    const specialVal = getSpecialFormatData(value, options);
    if (specialVal) {
        return specialVal;
    }
    switch (effectiveDataType) {
        case dateNumTypes.DATE_NUM_ABS_DAY:
        case dateNumTypes.DATE_NUM_ABS_MONTH:
        case dateNumTypes.DATE_NUM_ABS_QUARTER:
        case dateNumTypes.DATE_NUM_ABS_YEAR:
            return `${value}`;
        case dateNumTypes.DATE_NUM_DAY_IN_MONTH:
            return formatPattern === options.tsDateConstants.day_in_month_format
                ? `${value}`
                : `${getOrdinalSuffixedValue(value)} day of month`;
        case dateNumTypes.DATE_NUM_DAY_IN_QUARTER:
            return formatPattern ===
                options.tsDateConstants.day_in_quarter_format
                ? `${value}`
                : `${getOrdinalSuffixedValue(value)} day of quarter`;
        case dateNumTypes.DATE_NUM_DAY_IN_YEAR:
            return formatPattern === options.tsDateConstants.day_in_year_format
                ? `${value}`
                : `${getOrdinalSuffixedValue(value)} day of year`;
        case dateNumTypes.DATE_NUM_DAY_OF_WEEK:
            return formatPattern === options.tsDateConstants.day_of_week_format
                ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  getDayOfWeek(
                      value,
                      options.tsLocaleBasedStringsFormats.weekOfDay,
                  )
                : `${value}`;
        case dateNumTypes.DATE_NUM_MONTH_IN_QUARTER:
            return formatPattern ===
                options.tsDateConstants.month_in_quarter_format
                ? `${value}`
                : `${getOrdinalSuffixedValue(value)} month of quarter`;
        case dateNumTypes.DATE_NUM_MONTH_IN_YEAR:
            return formatPattern ===
                options.tsDateConstants.month_in_year_format
                ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  getMonthOfYear(
                      value,
                      options.quarterStartMonth,
                      options.tsLocaleBasedStringsFormats.monthOfYear,
                  )
                : `${value}`;
        case dateNumTypes.DATE_NUM_QUARTER_IN_YEAR:
            // Falcon returns quarter as 1 indexed, which is passed on by
            // callosum to blink, so we can use value instead of value + 1.
            return assignQuarterValueToString(
                options.tsLocaleBasedStringsFormats.quarter_of_year,
                value,
            );
        case dateNumTypes.DATE_NUM_WEEK_IN_YEAR:
            // +1 to value as Falcon values start with 0.
            return formatPattern === options.tsDateConstants.week_in_year_format
                ? `${value}`
                : `${getOrdinalSuffixedValue(value)} week of year`;
        case dateNumTypes.DATE_NUM_WEEK_IN_QUARTER:
        case dateNumTypes.DATE_NUM_WEEK_IN_MONTH:
            return `${value}`;
        case dateNumTypes.DATE_NUM_HOUR_IN_DAY:
            return `${value}`;
        default:
            console.log(
                'unknown effectiveDataType for date num',
                effectiveDataType,
            );
            return value;
    }
}

/**
 *
 * @param {number|string} inputDate Can be either a parseable format of date or an epoch value.
 * @param {string} format a dateFormatPresets or a format pattern string.
 * @param {boolean} useSystemCalendar If any custom calendar setting (e.g. quarterStartMonth)
 *     is to be ignored.
 * @return {string} Returns the formatted date per the format.
 */
export function formatDate(
    inputDate: number | string,
    format: string,
    useSystemCalendar: boolean,
    options: any,
): string {
    let formatPattern = format;
    let newInputDate: any = inputDate;
    if (newInputDate === undefined || newInputDate === null) {
        return options.tsLocaleBasedStringsFormats.null_value_placeholder_label;
    }
    if (!formatPattern) {
        formatPattern = dateFormatPresets.DATE_SHORT;
    }
    if (
        newInputDate ===
            options.tsLocaleBasedStringsFormats.null_value_placeholder_label ||
        newInputDate ===
            options.tsLocaleBasedStringsFormats.empty_value_placeholder_label ||
        newInputDate ===
            options.tsLocaleBasedStringsFormats.other_value_placeholder_label
    ) {
        return newInputDate;
    }
    newInputDate = sanitizeDate(newInputDate, formatPattern, options);
    if (_.isNaN(newInputDate)) {
        return options.tsLocaleBasedStringsFormats.null_value_placeholder_label;
    }
    let epochMillis = newInputDate;
    if (_.isDate(epochMillis)) {
        epochMillis = newInputDate.getTime();
    }
    if (!_.isNumber(epochMillis)) {
        console.log(
            'formatDate could not convert input date to a timestamp',
            inputDate,
        );
        return `${inputDate}`;
    }
    console.log(formatPattern);
    return formatDateTime(
        epochMillis,
        formatPattern,
        useSystemCalendar,
        options,
    );
}
