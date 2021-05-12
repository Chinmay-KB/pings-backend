
// TODO Use proper credentials
app.use(auth);

app.use('/', routes);

app.listen(3000);
