import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
	if(err){
		console.warn(`An error occurred when trying to listen to on port ${PORT}: ${err.message}`);
	}
	console.log(`Server started on ${PORT}.`);
});
