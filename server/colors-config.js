import colors from 'colors';

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: ['grey', 'bold', 'underline'],
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: ['blue', 'bold', 'underline'],
	error: ['red', 'bold'],
});

const timestamp = new Date().toLocaleTimeString();

const format = (msg, log) => {
	return console.log(`${timestamp} - ${log}: ${msg}`);
};

export const info = (msg) => {
	format(msg.debug, 'info');
};
export const prompt = (msg) => {
	format(msg.prompt, 'prompt');
};
export const success = (msg) => {
	format(msg.info, 'success');
};
export const warn = (msg) => {
	format(msg.warn, 'warn');
};
export const error = (msg) => {
	format(msg.error, 'error');
};
