/** @typedef {Object} Vector2
 * @property {number} x - The x-component of the vector.
 * @property {number} y - The y-component of the vector.
 */

/** @typedef {Object} Rectangle
 * @property {number} x - The x position (left edge).
 * @property {number} y - The y position (top edge).
 * @property {number} width - The width of the rectangle.
 * @property {number} height - The height of the rectangle.
 */

const TWO_PI = Math.PI * 2;

/**
 * Calculates the signed distance field of a point from a rectangle.
 * Negative inside, positive outside.
 * @param {Vector2} point - The point to test.
 * @param {Rectangle} rect - The rectangle bounds.
 * @returns {number} The signed distance.
 */
function rectangleSDF(point, rect) {
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    
    const dx = Math.abs(point.x - centerX) - rect.width / 2;
    const dy = Math.abs(point.y - centerY) - rect.height / 2;
    
    const outsideDistance = Math.sqrt(Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2);
    const insideDistance = Math.min(Math.max(dx, dy), 0);
    
    return outsideDistance + insideDistance;
}

/**
 * Gets the gradient direction (normalized) pointing back towards the rectangle.
 * @param {Vector2} point - The point to test.
 * @param {Rectangle} rect - The rectangle bounds.
 * @returns {Vector2} Normalized direction vector towards rectangle.
 */
function rectangleGradient(point, rect) {
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    
    const clampedX = Math.max(-rect.width / 2, Math.min(rect.width / 2, dx));
    const clampedY = Math.max(-rect.height / 2, Math.min(rect.height / 2, dy));
    
    const targetX = centerX + clampedX;
    const targetY = centerY + clampedY;
    
    const dirX = targetX - point.x;
    const dirY = targetY - point.y;
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    
    if (length < 0.001) return { x: 0, y: 0 };
    
    return { x: dirX / length, y: dirY / length };
}

let lastTimestamp = 0;
let animationPaused = false;
let animationFrameId = null;

/**
 * Manages the life cycle and movement of fireflies.
 * @param {DOMHighResTimeStamp} currentTimestamp - The current time provided by requestAnimationFrame.
 * @param {Array<Object>} fireflies - An array of firefly data objects.
 * @param {Array<Rectangle>} zones - The valid zones for fireflies.
 */
function bubbleLifeLoop(currentTimestamp, fireflies, zones) {
    // Skip if paused
    if (animationPaused) {
        animationFrameId = requestAnimationFrame((nextTimestamp) => {
            bubbleLifeLoop(nextTimestamp, fireflies, zones);
        });
        return;
    }
    
    // Calculate delta time (dt) in seconds
    if (!lastTimestamp) {
        lastTimestamp = currentTimestamp;
    }
    const dt = (currentTimestamp - lastTimestamp) / 1000; // dt in seconds
    lastTimestamp = currentTimestamp;

    fireflies.forEach((firefly) => {
        // Update flicker timing
        firefly.flickerTimer += dt;
        
        // Random direction changes for more organic movement
        if (Math.random() < 0.03) {
            firefly.angle += (Math.random() - 0.5) * Math.PI / 3;
        }
        
        // Find the zone this firefly belongs to
        const zone = zones[firefly.zoneIndex];
        
        // Calculate signed distance from zone
        const sdf = rectangleSDF(firefly.position, zone);
        
        // If outside or close to edge, steer back towards zone
        if (sdf > -20) {
            const gradient = rectangleGradient(firefly.position, zone);
            
            // Only steer if gradient is non-zero
            if (gradient.x !== 0 || gradient.y !== 0) {
                // Calculate how much to steer (more aggressive when further out)
                const steerStrength = Math.max(0, sdf + 20) * 0.05;
                
                // Blend current angle with direction back to zone
                const targetAngle = Math.atan2(gradient.y, gradient.x);
                let angleDiff = targetAngle - firefly.angle;
                
                // Normalize angle difference to [-PI, PI]
                while (angleDiff > Math.PI) angleDiff -= TWO_PI;
                while (angleDiff < -Math.PI) angleDiff += TWO_PI;
                
                firefly.angle += angleDiff * Math.min(1, steerStrength);
            }
        }
        
        // Slight random drift in angle for organic movement
        firefly.angle += (Math.sin(currentTimestamp * 0.002 + firefly.offset) * 0.02) * dt;
        
        // Update velocity with slight damping and variation
        const baseSpeed = 30 + Math.sin(currentTimestamp * 0.001 + firefly.offset) * 10;
        firefly.velocity = baseSpeed;
        
        // Move in the direction of the angle
        const velocityX = Math.cos(firefly.angle) * firefly.velocity * dt;
        const velocityY = Math.sin(firefly.angle) * firefly.velocity * dt;
        
        firefly.position.x += velocityX;
        firefly.position.y += velocityY;
        
        // Flicker effect - fireflies glow and dim
        const flickerCycle = Math.sin(firefly.flickerTimer * firefly.flickerSpeed) * 0.5 + 0.5;
        const opacity = 0.3 + flickerCycle * 0.5;
        const scale = 0.8 + flickerCycle * 0.3;
        
        // Occasional bright flash
        let flash = 1;
        if (firefly.flickerTimer > firefly.nextFlash) {
            flash = 1 + Math.max(0, 1 - (firefly.flickerTimer - firefly.nextFlash) * 4);
            if (firefly.flickerTimer > firefly.nextFlash + 0.25) {
                firefly.nextFlash = firefly.flickerTimer + 2 + Math.random() * 3;
            }
        }
        
        // Update element position and appearance
        firefly.element.style.left = `${firefly.position.x}px`;
        firefly.element.style.top = `${firefly.position.y}px`;
        firefly.element.style.transform = `translate(-50%, -50%) scale(${scale * flash})`;
        firefly.element.style.opacity = opacity * Math.min(flash, 1.5);
    });

    // Schedule the next frame
    animationFrameId = requestAnimationFrame((nextTimestamp) => {
        bubbleLifeLoop(nextTimestamp, fireflies, zones);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bubble-container');
    
    if (!container) {
        return;
    }
    
    function setupFireflies() {
        // Clear existing fireflies
        container.innerHTML = '';
        lastTimestamp = 0;
        
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const isMobile = viewportWidth <= 786;
        
        let zones = [];
        let fireflyCount;
        
        if (isMobile) {
            // Top and bottom zones (15% each)
            const zoneHeight = viewportHeight * 0.15;
            zones = [
                { x: 0, y: 0, width: viewportWidth, height: zoneHeight }, // Top
                { x: 0, y: viewportHeight - zoneHeight, width: viewportWidth, height: zoneHeight } // Bottom
            ];
            fireflyCount = 10; // 5 per zone
        } else {
            // Left and right zones (15% each)
            const zoneWidth = viewportWidth * 0.15;
            zones = [
                { x: 0, y: 0, width: zoneWidth, height: viewportHeight }, // Left
                { x: viewportWidth - zoneWidth, y: 0, width: zoneWidth, height: viewportHeight } // Right
            ];
            fireflyCount = 30; // 15 per zone
        }
        
        const fireflies = [];
        const firefliesPerZone = Math.floor(fireflyCount / zones.length);
        
        // Create fireflies
        for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex++) {
            const zone = zones[zoneIndex];
            
            for (let i = 0; i < firefliesPerZone; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'bubble';
                container.appendChild(firefly);
                
                // Random position within zone
                const x = zone.x + Math.random() * zone.width;
                const y = zone.y + Math.random() * zone.height;
                
                fireflies.push({
                    element: firefly,
                    position: { x, y },
                    angle: Math.random() * TWO_PI,
                    velocity: 30 + Math.random() * 20,
                    zoneIndex: zoneIndex,
                    offset: Math.random() * TWO_PI * 10,
                    flickerSpeed: 2 + Math.random() * 3,
                    flickerTimer: Math.random() * TWO_PI,
                    nextFlash: 2 + Math.random() * 3,
                });
            }
        }
        
        if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
            // Static positions for reduced motion
            fireflies.forEach((firefly) => {
                firefly.element.style.left = `${firefly.position.x}px`;
                firefly.element.style.top = `${firefly.position.y}px`;
                firefly.element.style.opacity = '0.5';
            });
            return;
        }
        
        // Start the animation loop
        requestAnimationFrame((timestamp) => {
            bubbleLifeLoop(timestamp, fireflies, zones);
        });
    }
    
    // Pause/resume animation when tab visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            animationPaused = true;
        } else {
            animationPaused = false;
            lastTimestamp = 0; // Reset timestamp to avoid large dt jump
        }
    });
    
    // Initial setup
    setupFireflies();
    
    // Re-setup on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setupFireflies();
        }, 250);
    });
});
