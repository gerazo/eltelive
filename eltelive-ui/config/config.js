const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60
	},
	http: {
		port: 8000,
		allow_origin: '*'
	},
	auth: {
		play: false,
		publish: true,
		secret: 'ELTE_is_super_awesome'
	}
};

module.exports = config;