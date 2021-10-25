// this function syncs a js object with filesystem periodically
// this can be used as a basic database for small objects (<10kb) 
// do not re-assign a new reference to returned 'object' variable
// only change inner fields 
function sync(path, sync_interval, def)
{
	const FS = require("fs");
	if (typeof sync_interval == "undefined")
		sync_interval = 60 * 1000;

	var object = {};
	if (typeof def == "undefined")
		object = def;

	if (FS.existsSync(path))
		object = JSON.parse(FS.readFileSync(path, "utf8"));

	setInterval(() =>
	{
		FS.writeFileSync(path, JSON.stringify(object), "utf8");
	}, sync_interval);
	return object;
}

exports.sync = sync;
