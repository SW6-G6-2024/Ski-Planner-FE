/**
 * @typedef {Object} Feature
 * @property {Geometry} geometry - The geometry of the feature
 * @property {Object} properties - The properties of the feature
 * @property {string} type - The type of the feature
 */

/**
 * @typedef {Object} BestRoute
 * @property {Array<Feature>} bestRoute - The best route between the two nodes
 * @property {Array<String>} stepByStepGuide - The step by step guide for the best route
 */

/**
 * @typedef {Object} Geometry
 * @property {String} type - The type of the geometry
 * @property {Array<Number>} coordinates - The coordinates of the geometry
 */
