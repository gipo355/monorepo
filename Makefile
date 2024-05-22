# use this file to prepare nx scripts instead of cluttering package.json
app:
	@nx generate application

lib:
	@nx generate library

package:
	@nx g @nx-dotnet/core:application

go:
	@nx g @nx-go/nx-go:application
