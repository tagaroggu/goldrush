/**
 * Based on https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
 * Thank you fnky for the handy reference.
 */

/**
 * One of the Unix escape sequences. This is the hex one.
 */
export const escapeSequence = `\x1B`;
/**
 * One of the Unix escape sequences with a bracket after. Commands go after
 * the bracket.
 */
export const escape = `${escapeSequence}[`;

/**
 * Moves the cursor to 0,0
 */
export const moveCursorToHome = `${escape}H`;

/**
 * Moves the cursor to an (x, y) position
 */
export const moveCursorToXY = (x: number, y: number) => `${escape}${x};${y}`;

/**
 * Moves the cursor up by x lines. Defaults to 1 line.
 */
export const moveCursorUp = (x: number = 1) => `${escape}${x}A`;

/**
 * Moves the cursor down by x lines. Defaults to 1 line.
 */
export const moveCursorDown = (x: number = 1) => `${escape}${x}B`;

/**
 * Moves the cursor right by x lines. Defaults to 1 line.
 */
export const moveCursorRight = (x: number = 1) => `${escape}${x}C`;

/**
 * Moves the cursor left by x lines. Defaults to 1 line.
 */
export const moveCursorLeft = (x: number = 1) => `${escape}${x}D`;

/**
 * Moves the cursor to the beginning of the line, x lines down. Defaults to
 * 1 line down.
 */
export const moveCursorDownToBeginning = (x: number = 1) => `${escape}${x}E`;

/**
 * Moves the cursor to the beginning of the line, x lines up. Defaults to 1
 * line up.
 */
export const moveCursorUpToBeginning = (x: number = 1) => `${escape}${x}F`;

/**
 * Moves the cursor to column x. Defaults to the first column, column 0.
 */
export const moveCursorToColumn = (x: number = 0) => `${escape}${x}G`;

/**
 * Erase from the current cursor position to the end of the screen.
 */
export const eraseToEndOfScreen = `${escape}0J`;

/**
 * Erase from the current cursor position to the beginning of the screen.
 */
export const eraseToBeginningOfScreen = `${escape}1J`;
