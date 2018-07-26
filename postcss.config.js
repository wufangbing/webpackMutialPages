module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.01%"
            ]
        }),
        // require("postcss-px-to-viewport")({
        // 	 viewportWidth: 750,
	     //  viewportHeight: 1334,
	     //  unitPrecision: 3,
	     //  viewportUnit: 'vw',
	     //  selectorBlackList: ['.ignore'],
	     //  minPixelValue: 1,
	     //  mediaQuery: false
        // })
    ]
}