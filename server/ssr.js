import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
const rawHtml = fs.readFileSync(htmlPath).toString();

const appString = '<div id="app">';
const splitter = '###SPLIT###';

const [startingRawHtmlFragment, endingRawHtmlFragment] = rawHtml
	.replace(appString, `${appString}${splitter}`)
	.split(splitter);

export const getHtmlFragments = ({ drainHydrateMarks }) => {
	const startingHtmlFragment = `${startingRawHtmlFragment}${drainHydrateMarks}`;
	return [startingHtmlFragment, endingRawHtmlFragment];
}

