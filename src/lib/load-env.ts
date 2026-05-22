import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function parseEnvFile(content: string) {
	for (const line of content.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const equalsIndex = trimmed.indexOf('=');
		if (equalsIndex < 0) continue;

		const key = trimmed.slice(0, equalsIndex).trim();
		let value = trimmed.slice(equalsIndex + 1).trim();

		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}

		if (!process.env[key] && value) {
			process.env[key] = value;
		}
	}
}

const envPath = resolve(process.cwd(), '.env');

if (existsSync(envPath)) {
	parseEnvFile(readFileSync(envPath, 'utf8'));
}
