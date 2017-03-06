// * ———————————————————————————————————————————————————————— * //
// * 	developer start
// * ———————————————————————————————————————————————————————— * //

var action = function () {}

var Promise = require('bluebird')

var global_data = require(enduro.enduro_path + '/libs/global_data')
var log_clusters = require(enduro.enduro_path + '/libs/log_clusters/log_clusters')
var enduro_server = require(enduro.enduro_path + '/server')
var gulp = require(enduro.enduro_path + '/gulpfile')
var logger = require(enduro.enduro_path + '/libs/logger')

action.prototype.action = function (config) {
	return new Promise(function (resolve, reject) {
		// clears the global data
		global_data.clear()

		log_clusters.log('developer_start')

		logger.timestamp('developer start', 'enduro_events')

		var prevent_double_callback = false

		enduro.actions.render(() => {
			logger.timestamp('Render finished', 'enduro_events')

			gulp.start(config.norefresh || enduro.flags.norefresh ? 'default_norefresh' : 'default', () => {
				if (!enduro.flags.noadmin && !prevent_double_callback) {
					prevent_double_callback = true
					logger.timestamp('production server starting', 'enduro_events')

					// start production server in development mode
					enduro_server.run({ development_mode: true })

					resolve()
				}
				// After everything is done
			})
		})
	})
}


module.exports = new action()