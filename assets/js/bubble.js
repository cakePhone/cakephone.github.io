/** @typedef {Object} PolarV2
 * @property {number} magnitude - The magnitude of the vector.
 * @property {number} angle - The angle of the vector in radians (counter-clockwise from positive x-axis).
*/

/** @typedef {Object} Vector2
 * @property {number} x - The x-component of the vector.
 * @property {number} y - The y-component of the vector.
 */

const TWO_PI = Math.PI * 2;

/**
 * Adds two 2D Cartesian vectors.
 * @param {Vector2} v1 - The first vector.
 * @param {Vector2} v2 - The second vector.
 * @returns {Vector2} The resultant vector.
 */
function addV2(v1, v2) {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
    };
}

/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param {PolarV2} p - The polar vector.
 * @returns {Vector2} The equivalent Cartesian vector.
 */
function polarToCartesian(p) {
    return { x: p.magnitude * Math.cos(p.angle), y: p.magnitude * Math.sin(p.angle) };
}

/**
 * Converts Cartesian coordinates to polar coordinates.
 * @param {Vector2} c - The Cartesian vector.
 * @returns {PolarV2} The equivalent polar vector.
 */
function cartesianToPolar(c) {
    let angle = Math.atan2(c.y, c.x);
    // Ensure angle is always positive (0 to 2*PI)
    if (angle < 0) {
        angle += TWO_PI;
    }
    return {
        magnitude: Math.sqrt(c.x * c.x + c.y * c.y),
        angle: angle,
    };
}

/**
 * Adds two polar vectors and returns the resultant vector in polar coordinates.
 * This is done by converting to Cartesian, adding, and converting back.
 *
 * @param {PolarV2} vec1 - The first polar vector.
 * @param {PolarV2} vec2 - The second polar vector.
 * @returns {PolarV2} The resultant polar vector.
 */
function addTwoPolarVectors(vec1, vec2) {
    const c1 = polarToCartesian(vec1);
    const c2 = polarToCartesian(vec2);
    return cartesianToPolar(addV2(c1, c2));
}

/**
 * Scales a polar vector by a given factor.
 * The angle remains the same, only the length changes.
 * @param {PolarV2} p - The polar vector to scale.
 * @param {number} scale - The scaling factor.
 * @returns {PolarV2} The scaled polar vector.
 */
function scalePolarVector(p, scale) {
    return {
        magnitude: p.magnitude * scale,
        angle: p.angle,
    };
}

function dotCartesian(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function dotPolar(p1, p2) {
    const c1 = polarToCartesian(p1);
    const c2 = polarToCartesian(p2);
    return dotCartesian(c1, c2);
}

let lastTimestamp = 0;

/**
 * Manages the life cycle and movement of bubbles.
 * @param {DOMHighResTimeStamp} currentTimestamp - The current time provided by requestAnimationFrame.
 * @param {Array<Object>} bubbles - An array of bubble data objects.
 */
function bubbleLifeLoop(currentTimestamp, bubbles) {
    // Calculate delta time (dt) in seconds
    if (!lastTimestamp) {
        lastTimestamp = currentTimestamp;
    }
    const dt = (currentTimestamp - lastTimestamp) / 1000; // dt in seconds
    lastTimestamp = currentTimestamp;

    bubbles.forEach((bubble) => {
        // if the bubble is way too far for whatever reason, reset it
        if (Math.abs(bubble.p.magnitude) > 1000)
            bubble.p.magnitude = 0;

        // If the bubble is too far from the center, pull it back
        if (bubble.p.magnitude > 100) {
            bubble.a.magnitude = 0.3 * (100 - bubble.p.magnitude);
        }
        else {
            bubble.a.magnitude = 0; // No acceleration if within bounds
        }

        bubble.a.angle = bubble.p.angle + Math.PI; // Point towards the center

        bubble.v = addTwoPolarVectors(bubble.v, scalePolarVector(bubble.a, bubble.a.magnitude * dt));
        // Cap velocity
        bubble.v.magnitude %= 10;


        bubble.p = addTwoPolarVectors(bubble.p, scalePolarVector(bubble.v, bubble.v.magnitude * dt));


        // Normalize all angles to be within [0, 2*PI)
        bubble.p.angle = (bubble.p.angle % TWO_PI + TWO_PI) % TWO_PI;
        bubble.v.angle = (bubble.v.angle % TWO_PI + TWO_PI) % TWO_PI;

        // Cartesian coordinates for CSS transform
        const cart = polarToCartesian(bubble.p);
        // Update element position using CSS transform
        bubble.element.style.transform = `translate(${cart.x}%, ${cart.y}%)`;
    });

    // Schedule the next frame
    requestAnimationFrame((nextTimestamp) => {
        bubbleLifeLoop(nextTimestamp, bubbles);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const bubblesElements = document.getElementsByClassName('bubble');

    if (window.matchMedia(`(prefers-reduced-motion: reduce)`)) {
        const angle_offset = Math.random() * TWO_PI;
        // assign triangle position and return
        for (let i = 0; i < bubblesElements.length; i++) {
            const bubble = bubblesElements[i];
            position = polarToCartesian({ magnitude: 50, angle: TWO_PI * i / 3 + angle_offset });
            bubble.style.transform = `translate(${position.x}%, ${position.y}%)`;
        }
        return;
    }

    const bubbleCount = bubblesElements.length;

    const data = new Array(bubbleCount).fill(null).map(() => ({
        element: null,
        // Corrected: 'length' instead of 'lenght'
        p: { magnitude: 0, angle: 0 },
        v: { magnitude: 0, angle: 0 },
        a: { magnitude: 0, angle: 0 },
    }));

    for (let i = 0; i < bubbleCount; i++) {
        data[i] = {
            element: bubblesElements[i],
            // Random initial position and velocity
            p: { magnitude: Math.random() * 20, angle: Math.random() * TWO_PI },
            v: { magnitude: 5 + Math.random() * 5, angle: Math.random() * TWO_PI }, // Ensure some min speed
            a: { magnitude: 0, angle: 0 },
        };
    };


    // Start the animation loop
    requestAnimationFrame((timestamp) => {
        bubbleLifeLoop(timestamp, data);
    });
});
