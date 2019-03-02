module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  // parser: "esprima",
  parser: "babel-eslint",
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    // Enable before sending to production
    "no-console": 0, // disallow the use of console
    "no-debugger": 0,
    "no-warning-comments": [
      0,
      { terms: ["todo", "fixme", "xxx"], location: "start" }
    ],

    // Possible Errors
    // These rules relate to possible syntax or logic errors in JavaScript code:
    "valid-jsdoc": 2, // enforce valid JSDoc comments

    // Best Practices
    // These rules relate to better ways of doing things to help you avoid problems:
    curly: 2, // enforce consistent brace style for all control statements
    "default-case": 1, // require default cases in switch statements
    "dot-location": [2, "property"], // enforce consistent newlines before and after dots, options: "object" - default or "property"
    "dot-notation": 2, // enforce dot notation whenever possible
    eqeqeq: 2, // require the use of === and !==
    "guard-for-in": 1, // make sure for-in loops have an if statement
    "no-alert": 2, // disallow the use of alert, confirm, and prompt
    "no-caller": 2, // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 2, // disallow division operators explicitly at beginning of regular expression
    "no-eq-null": 2, // disallow comparisons to null without a type-checking operator
    "no-eval": 2, // disallow use of eval()
    "no-extend-native": 2, // disallow adding to native types
    "no-extra-bind": 2, // disallow unnecessary function binding
    "no-fallthrough": 2, // disallow fallthrough of case statements
    "no-floating-decimal": 2, // disallow the use of leading or trailing decimal points in numeric literals
    "no-implied-eval": 2, // disallow use of eval()-like methods
    "no-invalid-this": 0, // disallow this keywords outside of classes or class-like objects
    "no-iterator": 2, // disallow usage of __iterator__ property
    "no-labels": 2, // disallow use of labeled statements
    "no-lone-blocks": 2, // disallow unnecessary nested blocks
    "no-loop-func": 2, // disallow creation of functions within loops
    "no-new": 2, // disallow use of new operator when not part of the assignment or comparison
    "no-new-func": 2, // disallow use of new operator for Function object
    "no-new-wrappers": 2, // disallows creating new instances of String,Number, and Boolean
    "no-octal": 2, // disallow use of octal literals
    "no-octal-escape": 2, // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-param-reassign": 2, // disallow reassignment of function parameters
    "no-proto": 2, // disallow usage of __proto__ property
    "no-return-assign": 2, // disallow use of assignment in return statement
    "no-return-await": 2, // disallow unnecessary return await
    "no-script-url": 2, // disallow use of javascript: urls.
    "no-self-compare": 2, // disallow comparisons where both sides are exactly the same
    "no-sequences": 2, // disallow use of comma operator
    "no-throw-literal": 2, // restrict what can be thrown as an exception
    "no-unmodified-loop-condition": 2, // disallow unmodified loop conditions
    "no-unused-expressions": 2, // disallow usage of expressions in statement position
    "no-useless-call": 2, // disallow unnecessary calls to .call() and .apply()
    "no-useless-concat": 2, // disallow unnecessary concatenation of literals or template literals
    "no-useless-return": 2, // disallow redundant return statements
    "no-with": 2, // disallow use of the with statement
    "prefer-promise-reject-errors": [1, { allowEmptyReject: false }], // require using Error objects as Promise rejection reasons, allowEmptyReject: false is default
    radix: 2, // require use of the second argument for parseInt()
    "vars-on-top": 2, // requires to declare all vars on top of their containing scope
    "wrap-iife": 2, // require immediate function invocation to be wrapped in parentheses
    yoda: 2, // require or disallow Yoda conditions

    // Strict Mode
    // These rules relate to strict mode directives:
    strict: 0, // controls location of Use Strict Directives. 0: required by `babel-eslint`

    // Variables
    // These rules relate to variable declarations:
    "no-catch-shadow": 2, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    "no-label-var": 2, // disallow labels that share a name with a variable
    "no-shadow": 0, // disallow declaration of variables already declared in the outer scope
    "no-shadow-restricted-names": 2, // disallow shadowing of names such as arguments
    "no-undef": 2, // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 2, // disallow use of undefined when initializing variables
    "no-undefined": 2, // disallow use of undefined variable
    "no-unused-vars": 1, // disallow declaration of variables that are not used in the code
    "no-use-before-define": 2, // disallow use of variables before they are defined

    // Node.js and CommonJS
    // These rules relate to code running in Node.js, or in browsers with CommonJS:
    "callback-return": 1, // require return statements after callbacks
    "handle-callback-err": 1, // require error handling in callbacks
    "no-buffer-constructor": 2, // disallow use of the Buffer() constructor
    "no-path-concat": 2, // disallow string concatenation with __dirname and __filename
    "no-process-exit": 0, // disallow the use of process.exit()
    "no-sync": 1, // disallow synchronous methods

    // Stylistic Issues
    // These rules relate to style guidelines, and are therefore quite subjective:
    "array-bracket-newline": [1, "consistent"], // enforce linebreaks after opening and before closing array brackets
    "brace-style": [1, "1tbs", { allowSingleLine: true }],
    "comma-dangle": 0, // require or disallow trailing commas
    "comma-spacing": [1, { before: false, after: true }], // enforce spacing before and after comma
    "comma-style": [1, "last"], // enforce one true comma style
    "computed-property-spacing": 1, // enforce consistent spacing inside computed property brackets
    "consistent-this": [1, "that"], // enforces consistent naming when capturing the current execution context, "that" - default
    "eol-last": 1, // require or disallow newline at the end of files
    "func-call-spacing": 1, // require or disallow spacing between function identifiers and their invocations
    "implicit-arrow-linebreak": 0, // enforce the location of arrow function bodies
    indent: [1, 2, { SwitchCase: 1 }], // this option sets a specific tab width for your code, 2 - two spaces
    "key-spacing": [1, { beforeColon: false, afterColon: true }], // enforces spacing between keys and values in object literal properties
    "keyword-spacing": [1, { before: true, after: true }], // enforce consistent spacing before and after keywords
    "lines-between-class-members": 1, // require or disallow an empty line between class members
    "max-nested-callbacks": [1, 5], // specify the maximum depth callbacks can be nested
    "new-cap": [1, { newIsCap: true, capIsNew: false }], // require a capital letter for constructors
    "new-parens": 1, // disallow the omission of parentheses when invoking a constructor with no arguments
    "no-array-constructor": 1, // disallow use of the Array constructor
    "no-lonely-if": 0, // disallow if as the only statement in an else block
    "no-mixed-spaces-and-tabs": 1, // disallow mixed spaces and tabs for indentation
    "no-multiple-empty-lines": [1, { max: 2 }], // disallow multiple empty lines (off by default)
    "no-nested-ternary": 1, // disallow nested ternary expressions (off by default)
    "no-new-object": 1, // disallow use of the Object constructor
    "no-trailing-spaces": 1, // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 0, // disallow dangling underscores in identifiers
    "no-unneeded-ternary": 1, // disallow ternary operators when simpler alternatives exist
    "no-whitespace-before-property": 1, // disallow whitespace before properties
    "nonblock-statement-body-position": 1, // enforce the location of single-line statements
    "object-curly-spacing": [1, "always"], // enforce consistent spacing inside braces
    "padded-blocks": [1, "never"], // enforce padding within blocks
    "padding-line-between-statements": [
      1,
      { blankLine: "always", prev: "*", next: "return" }
    ],
    "quote-props": [1, "as-needed"], // require quotes around object literal property names
    quotes: [0, "double"], // enforce the consistent use of either backticks, double, or single quotes
    semi: [0, "always"], // require or disallow use of semicolons instead of ASI
    "space-before-blocks": [1, "always"], // require or disallow space before blocks
    "space-before-function-paren": [
      1,
      { anonymous: "always", named: "never", asyncArrow: "always" }
    ], // require or disallow space before function opening parenthesis
    "space-in-parens": [1, "never"], // require or disallow spaces inside parentheses (off by default)
    "space-infix-ops": 1, // require spaces around operators
    "space-unary-ops": [1, { words: true, nonwords: false }], // Require or disallow spaces before/after unary operators (words on by default, nonwords
    "spaced-comment": 0, // require or disallow a space immediately following the // in a line comment
    "switch-colon-spacing": [1, { after: true, before: false }],
    "wrap-regex": 1, // require parenthesis around regex literals

    // ECMAScript 6
    // These rules relate to ES6, also known as ES2015:
    "arrow-body-style": [0, "as-needed"], // require braces around arrow function bodies
    "arrow-parens": [1, "as-needed"], // require parentheses around arrow function arguments
    "arrow-spacing": [1, { before: true, after: true }], // enforce consistent spacing before and after the arrow in arrow functions
    "generator-star-spacing": [2, "before"], // enforce the spacing around the * in generator functions
    "no-confusing-arrow": 0, // disallow arrow functions where they could be confused with comparisons
    "no-duplicate-imports": 2, // disallow duplicate module imports
    "no-var": 2, // require let or const instead of var
    "object-shorthand": [1, "consistent"], // require or disallow method and property shorthand syntax for object literals
    "prefer-arrow-callback": 1, // require using arrow functions for callbacks
    "prefer-const": 1, // require const declarations for variables that are never reassigned after declared
    "prefer-destructuring": 1, // require destructuring from arrays and/or objects
    "prefer-rest-params": 1, // require rest parameters instead of arguments
    "prefer-spread": 1, // require spread operators instead of .apply()
    "prefer-template": 1, // require template literals instead of string concatenation
    "rest-spread-spacing": 1, // enforce spacing between rest and spread operators and their expressions
    "symbol-description": 1, // require symbol descriptions
    "template-curly-spacing": 1, // require or disallow spacing around embedded expressions of template strings

    "prettier/prettier": [1, {printWidth: 100, singleQuote: true, trailingComma: "es5"}]
  }
};
