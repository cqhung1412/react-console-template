import devConfig from './dev.config';
import prodConfig from './prod.config';

export type ConfigType = {
	API_URL: string;
	QUERY_KEYS: {
		[key: string]: string;
	}
};

export const config: ConfigType = {
	...(process.env.NODE_ENV === 'production' ? prodConfig : devConfig),
	QUERY_KEYS: {
		'USER': 'user',
		'TODOS': 'todos',
	}
};

export default config;
