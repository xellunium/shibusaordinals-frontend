/**
 * 
 * conditional appending class to array of classes
 * @param {condition} value 
 * @param {class that should be added if condition is true} targetClass 
 * @param  {array of other default classes, added either way} baseClasses 
 */
const appendConditionalClass = (
    value, 
    targetClass, 
    ...baseClasses
    ) => {
    return value ? [...baseClasses, targetClass].join(' ') : [...baseClasses].join(' ')
} 


export { 
    appendConditionalClass,
};
