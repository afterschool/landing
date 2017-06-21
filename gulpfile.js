 /**
  *                          *** After School ***
  * ----------------------------------------------------------------------
  *       a community for passionate founders to pursue their dream
  * ----------------------------------------------------------------------
  *
  * @summary   Deployment Script
  *            This gulp file deploys the website to GCF.
  *
  * @author    Alvis HT Tang <alvis@hilbert.space>
  * @license   MIT
  * ----------------------------------------------------------------------
  */

 /* Modules */
 const gulp = require('gulp');
 const shell = require('gulp-shell');
 const path = require('path');

 /* Paths */
 const FACTORY = path.resolve(__dirname, './factory');

 /**
  * The Cleaner
  * @return The result from del
  */
 function clean() {
 	const del = require('del');

 	return del([FACTORY]);
 }

 // delete all temporary files
 gulp.task('clean:built', clean);

 // compile the source
 gulp.task('build:typescript', ['clean:built'], () => {
 	const typescript = require('gulp-typescript');
 	const project = typescript.createProject('tsconfig.json');

 	return gulp.src([`source/**/*.ts`])
 		.pipe(project())
 		.js
 		.pipe(gulp.dest(FACTORY));
 });

 // copy the supporting files to the compiled distribution folder
 gulp.task('copy:support', ['build:typescript'], () => {
 	return gulp.src([
 			`source/static/**/*`,
 			`source/views/**/*`
 		], {
 			base: 'source'
 		})
 		.pipe(gulp.dest(FACTORY));
 });

 // copy package.json to the compiled distribution folder
 gulp.task('copy:specification', ['copy:support'], () => {
 	return gulp.src([
 			`node_modules/**/*`,
 			`package.json`,
 			`database.rules.json`,
 			`firebase.json`,
 			`.firebaserc`
 		], {
 			base: '.'
 		})
 		.pipe(gulp.dest(FACTORY));
 });

 // deploy the service to google cloud functions
 gulp.task('deploy', ['copy:specification'], shell.task([
 	`firebase deploy`
 ], {
 	cwd: FACTORY
 }));

 // do everything in one go
 gulp.task('default', ['deploy'], clean);
