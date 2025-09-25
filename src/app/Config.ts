import { Tools } from 'utils/Tools';

const Config = {
	assets: Tools.massiveRequire(require.context('../assets', true, /\.(png|jpe?g)$/)),
	jsonData: Tools.massiveRequire(require.context('../assets', true, /\.json$/)),
};

export default Object.freeze(Config);
