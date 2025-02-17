module.exports = {
	extends: [
		"stylelint-config-standard", // Main set of rules
		"stylelint-config-recommended-scss", // SCSS-specific rules
		"stylelint-config-prettier", // Disables conflicts with Prettier (if you're using Prettier)
		"stylelint-config-clean-order", // Orders properties semantically
	],
	plugins: [
		"stylelint-scss", // SCSS-specific rules
		"stylelint-order", // For property sorting
		"stylelint-declaration-strict-value", // Controls variable values
	],
	rules: {
		// --------------------- General Rules ---------------------
		"max-empty-lines": 1, // Maximum of 1 empty line
		indentation: "tab", // Use tabs for indentation
		"string-quotes": "double", // Double quotes for strings
		"no-duplicate-selectors": true, // No duplicate selectors
		"color-hex-case": "lower", // Hexadecimal colors in lowercase
		"color-hex-length": "short", // Short hexadecimal colors (#fff instead of #ffffff)
		"unit-case": "lower", // Units in lowercase
		"max-nesting-depth": 3, // Maximum nesting depth of 3 levels
		"no-descending-specificity": [
			true,
			{
				severity: "warning", // or "error" if you want it to be an error
			},
		],
		"selector-class-pattern": ".*", // Class names in kebab-case

		// --------------------- Property Sorting ---------------------

		"order/properties-alphabetical-order": null, // Disable alphabetical order
		"order/properties-order": [
			{
				groupName: "Box Model",
				properties: [
					"display",
					"position",
					"top",
					"right",
					"bottom",
					"left",
					"z-index",
					"float",
					"clear",
					"box-sizing",
					"width",
					"height",
					"margin",
					"padding",
					"border",
					"outline",
					"overflow",
					"visibility",
					"clip",
				],
			},
			{
				groupName: "Typography",
				properties: [
					"font",
					"font-family",
					"font-size",
					"font-weight",
					"line-height",
					"letter-spacing",
					"color",
					"text-align",
					"text-transform",
					"text-decoration",
					"white-space",
				],
			},
			{
				groupName: "Visual",
				properties: [
					"background",
					"background-color",
					"background-image",
					"background-position",
					"background-size",
					"box-shadow",
					"opacity",
					"filter",
					"transform",
					"animation",
				],
			},
		],

		// --------------------- SCSS-Specific Rules ---------------------

		//"scss/at-rule-no-unknown": true, // Disallow unknown SCSS directives
		"scss/dollar-variable-pattern": "^([a-z0-9-_]+)$", // Variable naming (kebab-case)
		"scss/percent-placeholder-pattern": "^([a-z0-9-_]+)$", // Placeholder naming (kebab-case)
		"scss/double-slash-comment-empty-line-before": "always", // Empty line before // comments
		"scss/selector-no-redundant-nesting-selector": true, // Remove redundant & selectors

		// --------------------- Variable Value Control ---------------------

		"scale-unlimited/declaration-strict-value": [
			["color", "font-size"], // Strict value checking for color and font-size variables
			{
				ignoreValues: ["inherit", "transparent", "currentColor", "initial", "unset"], // Ignore these values
			},
		],

		// --------------------- Other Useful Rules ---------------------

		"declaration-block-trailing-semicolon": "always", // Trailing semicolon in blocks
		"block-no-empty": true, // No empty blocks
		"comment-no-empty": true, // No empty comments
		"selector-max-id": 0, // No IDs in selectors
		"selector-max-combinators": 3, // Maximum of 3 combinators in a selector
		"selector-max-attribute": 3, // Maximum of 3 attributes in a selector
		"selector-max-compound-selectors": 3, // Maximum of 3 compound selectors
		"media-feature-name-no-vendor-prefix": true, // No vendor prefixes for media features
		"property-no-vendor-prefix": true, // No vendor prefixes for properties
		"value-no-vendor-prefix": true, // No vendor prefixes for values
		"color-named": "never", // Do not use named colors (e.g., "red")
		"selector-attribute-quotes": "always", // Always use quotes around attribute values
		"declaration-no-important": true, // Disallow !important
		"declaration-colon-space-before": "never", // No space before colon in declarations
		"declaration-colon-space-after": [
			"always", // Space after colon in declarations
			{
				ignore: ["multi-line"], // Ignore multi-line declarations
				severity: "warning", // or "error" if you want it to be an error
			},
		],
		"declaration-block-no-duplicate-properties": true, // No duplicate properties in blocks
		"number-leading-zero": "never", // No leading zero in numbers
		"function-url-quotes": "always", // Always use quotes around URLs
		"font-weight-notation": "numeric", // Use numeric font-weight values
		"font-family-name-quotes": "always-where-recommended", // Quotes around font family names where recommended
		"comment-no-empty": true, // No empty comments
		"comment-whitespace-inside": "always", // Space inside comments
		"comment-empty-line-before": [
			"always",
			{
				except: ["first-nested"], // Exception: no empty line before first nested comment
			},
		], // Empty line before comments
		"at-rule-no-vendor-prefix": true, // No vendor prefixes for at-rules
		"rule-empty-line-before": [
			"always-multi-line", // Требуется пустая строка перед правилами в многострочном стиле
			{
				ignore: ["after-comment", "inside-block"],
				except: ["first-nested"], // Исключение: не требует пустой строки перед первым вложенным правилом
			},
		],
		"selector-pseudo-element-colon-notation": "single", // Use single colon for pseudo-elements
		"selector-no-vendor-prefix": true, // No vendor prefixes in selectors
		"media-feature-range-operator-space-before": "always", // Space before range operator in media queries
		"media-feature-range-operator-space-after": "always", // Space after range operator in media queries
		"media-feature-parentheses-space-inside": "never", // No space inside parentheses in media queries
		"media-feature-colon-space-before": "never", // No space before colon in media queries
		"media-feature-colon-space-after": "always", // Space after colon in media queries
		// Ignoring @tailwind and @import directives
		// SCSS-specific rules
		"scss/at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"tailwind", // Ignore @tailwind directives
					"import", // Ignore @import directives
				],
			},
		],
	},
	ignoreFiles: [
		"**/_normalize&reset.scss",
		"**/_mixins.scss",
		"**/_functions.scss",
		"**/_fonts.scss",
	],
};
