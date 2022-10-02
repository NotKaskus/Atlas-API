module.exports = {
    endOfLine: 'lf',
	printWidth: 150,
	quoteProps: 'as-needed',
	arrowParens: "avoid",
	bracketSpacing: true,
	proseWrap: "preserve",
	requirePragma: false,
    jsxSingleQuote: false,
	semi: true,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: '.all-contributorsrc',
			options: {
				parser: 'json'
			}
		},
		{
			files: '*.yml',
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
}