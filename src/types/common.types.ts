/**
 * @file: Common Types
 * @fileoverview All commons types for the Custom Chart implementations
 * @author Chetan Agrawal <chetan.agrawal@thoughtspot.com>
 *
 * Copyright: ThoughtSpot Inc. 2023
 */

import { ChartColumn } from './answer-column.types';
import type { ChartConfigEditorDefinition } from './configurator.types';
import type { VisualPropEditorDefinition } from './visual-prop.types';

/**
 * Defines types of features for which font can be customised with Custom style config used in TS.
 * @remarks
 * Use chartFeatureToFontGuid to get the guid for the feature and get the font face from guid
 * from customFontFaces
 */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    FileUpload: unknown;
    GUID: string;
    JSON: {
        [key: string]: unknown;
    };
    JSONObject: unknown;
    Long: unknown;
};

export enum CustomizableChartFeature {
    X_AXIS_LABEL,
    X_AXIS_TITLE,
    Y_AXIS_LABEL,
    Y_AXIS_TITLE,
    TOOLTIP,
    SCATTER_CHART,
    PIE_CHART,
    LINE_CHART,
    COLUMN_CHART,
    BAR_CHART,
    AREA_CHART,
    TAIL_FEATURE,
}

/**
 * List of Columns for a dimension in the Custom Chart Config.
 * Associated with the key defined in the chart config editor definition
 * Relates to ChartConfigSection
 *
 * @version SDK: 0.1 | ThoughtSpot:
 * @group Chart Model
 */
export interface ChartConfigDimension {
    /**
     * Key for the dimension in the chart config
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    key: string;
    /**
     * List of columns added for the dimension
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    columns: ChartColumn[];
}

/**
 * Custom Chart Config values stored in the metadata
 * Relates to ChartConfigEditorDefinition
 *
 * @version SDK: 0.1 | ThoughtSpot:
 * @group Chart Model
 */
export interface ChartConfig {
    /**
     * Key of the custom chart config defined in the chart config editor definition
     * This is used to differentiate between different custom chart configurations
     * within the same chart
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    key: string;
    /**
     * Details of columns for each dimension
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    dimensions: ChartConfigDimension[];
}

/**
 * Data Points Array interface to define data for each row and column.
 * Data is ordered as per the columns in the query and the rows are sorted
 * as per the search query.
 *
 * @version SDK: 0.1 | ThoughtSpot:
 * @group Chart Model
 */
export type DataPointsArray = {
    /**
     * Array of column IDs ordered as per the data query
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    columns: string[];

    /**
     * Array of rows of data ordered by the columns
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    dataValue: any[][];
};

/**
 * For each query defined by the user, a query data object is sent
 * in this format.
 *
 * @version SDK: 0.1 | ThoughtSpot:
 * @group Chart Model
 */
export type QueryData = {
    /**
     * Data Array for each column
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    data: DataPointsArray;

    /**
     * @hidden
     * @version SDK: 0.1 | ThoughtSpot:
     */
    completionRatio?: number;
    /**
     * @hidden
     * @version SDK: 0.1 | ThoughtSpot:
     */
    samplingRatio?: number;

    /**
     * Number of rows of data fetched for the query
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    totalRowCount: number;
};

/**
 *
 * @group Chart Model
 * @version SDK: 0.1 | ThoughtSpot:
 */
export interface ChartModel {
    /**
     * List of columns in the search query
     * They may or may not be part of the data query or chart config
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    columns: ChartColumn[];
    /**
     * Array of datasets for each query
     *
     * @version SDK: 0.1 | ThoughtSpot:
     */
    data?: QueryData[];
    sortInfo?: any; // TODO(chetan):
    visualProps?: VisualProps;
    config: {
        // chart config stored by chart developer
        chartConfig?: ChartConfig[];
    };
}

// Validation Response for valid config or visual props
export type SuccessValidationResponse = {
    chartConfigEditorDefinition: ChartConfigEditorDefinition[];
    visualPropEditorDefinition: VisualPropEditorDefinition;
};

// Generic Validation Response
export type ValidationResponse = {
    isValid: boolean;
    validationErrorMessage?: string[];
};

/**
 * Custom Visual props is the stored metadata for the visual props definition
 * configured by the user in the visual prop editor
 * The object is defined by the visual prop types. See VisualPropEditorDefinition.
 * If there is any local state specific to charts needs to be maintained on save answer, store it
 * in VisualProps, with visualProps.clientState variable. The clientState variable should be a
 * string, preferrably a result of JSON.stringify(<yourlocalClientState>).
 * @remark
 * only values stored in clientSate variable will be preserved on changing the
 * visualPropeditorDefinition, any other variable store would not be preserved
 * @group Chart Model
 * @version SDK: 0.1 | ThoughtSpot:
 */
export type VisualProps = unknown;

/**
 *  Font Faces type from TS.
 *  guid will be null in case of default Font types
 *  If a custom Font is added in Dev section on TS this guid can be used to Match
 *  the Font Face That needs to be applied to @link CustomizableChartFeature
 */

export type TSFontFace = {
    guid: string | null;
    family?: string;
    format?: string;
    url?: string;
    weight?: string;
    style?: string;
    size?: string;
    unicodeRange?: string;
    variant?: string;
    stretch?: string;
    color?: string;
};

/**
 * Used for Custom color pallete and Custom font for charts defined in Style customisations
 * inside thoughtspot admin or developer section
 *
 */

export type ChartSdkCustomStylingConfig = {
    appBackground?: {
        color?: string;
    };
    appPanelColor?: {
        color?: string;
    };
    chartColorPalettes?: Array<{ colors: Array<string> }>;
    numColorPalettes?: number;
    disableColorRotation?: boolean;
    chartFeatureToFontGuid?: Record<CustomizableChartFeature, string>;
    fontFaces?: Array<TSFontFace>;
};

export interface DateFormats {
    DATE_SHORT: string;
    DATE_SHORT_2_DIGIT_YEAR: string;
    DATE_SHORT_WITH_HOUR: string;
    DATE_SHORT_WITH_HOUR_WITHOUT_YEAR: string;
    DATE_SHORT_WITH_HOUR_24: string;
    DATE_SHORT_WITH_HOUR_24_WITHOUT_YEAR: string;
    DATETIME_SHORT: string;
    DATETIME_SHORT_WITHOUT_YEAR: string;
    DATETIME_24_SHORT: string;
    DATETIME_24_SHORT_WITH_MILLIS: string;
    DATETIME_24_SHORT_WITH_MILLIS_WITHOUT_YEAR: string;
    DATETIME_SHORT_WITH_SECONDS: string;
    DATETIME_SHORT_WITH_SECONDS_WITHOUT_YEAR: string;
    DATETIME_SHORT_WITH_MILLIS: string;
    DATETIME_SHORT_WITH_MILLIS_WITHOUT_YEAR: string;
    QUARTER_WITH_YEAR: string;
    QUARTER_WITH_2_DIGIT_YEAR: string;
    DEFAULT_TIME_FORMAT: string;
    MONTH_WITH_YEAR: string;
    MONTH_WITH_DAY_AND_YEAR: string;
    MONTH_WITH_2_DIGIT_YEAR: string;
    DAY_WITH_MONTH: string;
    DAY_WITH_MONTH_NUM: string;
    QUARTER: string;
    MONTH_ONLY: string;
    DATETIME_WITH_SHORT_OFFSET: string;
}

/**
 * Date Formats Config for Custom Chart SDK
 * This is used to define the date formats for the custom chart SDK
 * The date formats are used to format the date values in the chart
 * @remarks
 * The date formats are used to format the date values in the chart
 */

export type ChartSdkDateFormatsConfig = {
    tsLocaleBasedDateFormats?: Record<string, DateFormats>;
    tsLocaleBasedStringsFormats?: Record<string, string>;
    tsDateConstants?: Record<string, string>;
    tsDefinedCustomCalenders?: any;
    defaultDataSourceId?: string;
};

export interface AppConfig {
    styleConfig?: ChartSdkCustomStylingConfig;
    dateFormatsConfig?: ChartSdkDateFormatsConfig;
    appOptions?: {
        isMobile?: boolean;
        isPrintMode?: boolean; // export mode on/off
        isLiveboardContext?: boolean; // if chart renders in liveboard context
        // runtime configurations
        isDebugMode?: boolean; // enables debug mode for logging
    };

    // locale related settings
    localeOptions?: {
        locale: string;
        quarterStartMonth: string;
        sessionTimezone: string;
    };

    /**
     * App url for the custom chart application where the chart app is hosted.
     * This helps the chart developer to access app artifacts relative to this url.
     * There can be different build systems that developers may have used and different ways
     * to host the same. This helps in resolving the same.
     */
    appUrl?: string;

    // Idea: we might be able to map this to data and ask user to read data in a
    // certain way the transformations for point during context menu operations
    // need to be explored
    /**
     * @hidden
     */
    customCalendarConfig?: any; // this is to initialize custom calendar service

    /**
     * Unique identifier for the customer. This can be used as a way to maintain licensing by the
     * third party developer
     */
    chartAppAccessToken?: string;
}
