Compiled with problems:
×
ERROR in ./src/pages/AdminBackup.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminBackup.jsx: `import` can only be used in `import()` or `import.meta`. (4:0)

  2 | // ...import axios from 'axios';
  3 | +// import axios from 'axios';
> 4 | import { useNavigate } from 'react-router-dom';
    | ^
  5 | import api from '../utils/api'
  6 |
  7 | const AdminBackup = () => {
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminCategories.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminCategories.jsx: `import` can only be used in `import()` or `import.meta`. (3:1)

  1 | import React, { useEffect, useState } from 'react';
  2 | // import axios from 'axios';
> 3 | +import api from '../utils/api';
    |  ^
  4 |
  5 | const AdminCategories = () => {
  6 |   const [categories, setCategories] = useState([]);
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminProviders.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminProviders.jsx: `import` can only be used in `import()` or `import.meta`. (2:1)

  1 | import React, { useEffect, useState } from 'react';
> 2 | -import axios from 'axios';
    |  ^
  3 | +import api from '../utils/api';
  4 |
  5 | const AdminProviders = () => {
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminReviews.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminReviews.jsx: `import` can only be used in `import()` or `import.meta`. (2:1)

  1 | import React, { useEffect, useState } from 'react';
> 2 | -import axios from 'axios';
    |  ^
  3 | +// import axios from 'axios';
  4 | +import api from '../utils/api';
  5 |
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminSiteSettings.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminSiteSettings.jsx: `import` can only be used in `import()` or `import.meta`. (2:1)

  1 | import React, { useEffect, useState } from 'react';
> 2 | -import axios from 'axios';
    |  ^
  3 | +import api from '../utils/api';
  4 |
  5 | const AdminSiteSettings = () => {
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminStaticPages.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminStaticPages.jsx: `import` can only be used in `import()` or `import.meta`. (2:1)

  1 | import React, { useEffect, useState } from 'react';
> 2 | -import axios from 'axios';
    |  ^
  3 | +// import axios from 'axios';
  4 | +import api from '../utils/api';
  5 |
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/AdminUsers.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\AdminUsers.jsx: `import` can only be used in `import()` or `import.meta`. (3:1)

  1 | import React, { useEffect, useState } from 'react';
  2 | // import axios from 'axios';
> 3 | +import api from '../utils/api';
    |  ^
  4 |
  5 | const ROLES = ['user', 'mod', 'admin'];
  6 |
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/ProviderDetail.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\ProviderDetail.jsx: `import` can only be used in `import()` or `import.meta`. (5:1)

  3 | import useFetch from '../hooks/useFetch';
  4 | import useAuth from '../hooks/useAuth';
> 5 | -import axios from 'axios';
    |  ^
  6 | +// import axios from 'axios';
  7 | +import api from '../utils/api';
  8 |
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/ProviderProfile.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\ProviderProfile.jsx: `import` can only be used in `import()` or `import.meta`. (2:1)

  1 | import React, { useEffect, useState } from 'react';
> 2 | -import axios from 'axios';
    |  ^
  3 | +// import axios from 'axios';
  4 | +import api from '../utils/api';
  5 | import Select from 'react-select';
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR in ./src/pages/Register.jsx
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\imam\web-client\src\pages\Register.jsx: `import` can only be used in `import()` or `import.meta`. (3:1)

  1 | import React, { useState } from 'react';
  2 | import { Link, useNavigate } from 'react-router-dom';
> 3 | -import axios from 'axios';
    |  ^
  4 | +// import axios from 'axios';
  5 | +import api from '../utils/api';
  6 |
    at constructor (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:367:19)
    at FlowParserMixin.raise (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:6627:19)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11294:16)
    at FlowParserMixin.parseExprAtom (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:4794:20)
    at FlowParserMixin.parseExprSubscripts (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11076:23)
    at FlowParserMixin.parseUpdate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11061:21)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11041:23)
    at FlowParserMixin.parseMaybeUnary (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:11024:28)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10894:61)
    at FlowParserMixin.parseExprOps (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10899:23)
    at FlowParserMixin.parseMaybeConditional (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10876:23)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10826:21)
    at FlowParserMixin.parseMaybeAssign (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3579:18)
    at FlowParserMixin.parseExpressionBase (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10779:23)
    at F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:39
    at FlowParserMixin.allowInAnd (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12422:16)
    at FlowParserMixin.parseExpression (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:10775:17)
    at FlowParserMixin.parseStatementContent (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12895:23)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12767:17)
    at FlowParserMixin.parseStatementLike (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:2946:24)
    at FlowParserMixin.parseModuleItem (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12744:17)
    at FlowParserMixin.parseBlockOrModuleBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13316:36)
    at FlowParserMixin.parseBlockBody (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:13309:10)
    at FlowParserMixin.parseProgram (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12625:10)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:12615:25)
    at FlowParserMixin.parseTopLevel (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:3715:28)
    at FlowParserMixin.parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14492:10)
    at parse (F:\imam\web-client\node_modules\@babel\parser\lib\index.js:14526:38)
    at parser (F:\imam\web-client\node_modules\@babel\core\lib\parser\index.js:41:34)
    at parser.next (<anonymous>)
    at normalizeFile (F:\imam\web-client\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
    at normalizeFile.next (<anonymous>)
    at run (F:\imam\web-client\node_modules\@babel\core\lib\transformation\index.js:22:50)
    at run.next (<anonymous>)
    at transform (F:\imam\web-client\node_modules\@babel\core\lib\transform.js:22:33)
    at transform.next (<anonymous>)
    at step (F:\imam\web-client\node_modules\gensync\index.js:261:32)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
    at F:\imam\web-client\node_modules\gensync\index.js:189:28
    at F:\imam\web-client\node_modules\@babel\core\lib\gensync-utils\async.js:67:7
    at F:\imam\web-client\node_modules\gensync\index.js:113:33
    at step (F:\imam\web-client\node_modules\gensync\index.js:287:14)
    at F:\imam\web-client\node_modules\gensync\index.js:273:13
    at async.call.result.err.err (F:\imam\web-client\node_modules\gensync\index.js:223:11)
ERROR
[eslint] 
src\pages\AdminBackup.jsx
  Line 4:  Parsing error: `import` can only be used in `import()` or `import.meta`. (4:0)

src\pages\AdminCategories.jsx
  Line 3:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (3:1)

src\pages\AdminProviders.jsx
  Line 2:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (2:1)

src\pages\AdminReviews.jsx
  Line 2:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (2:1)

src\pages\AdminSiteSettings.jsx
  Line 2:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (2:1)

src\pages\AdminStaticPages.jsx
  Line 2:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (2:1)

src\pages\AdminUsers.jsx
  Line 3:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (3:1)

src\pages\ProviderDetail.jsx
  Line 5:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (5:1)

src\pages\ProviderProfile.jsx
  Line 2:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (2:1)

src\pages\Register.jsx
  Line 3:1:  Parsing error: `import` can only be used in `import()` or `import.meta`. (3:1)
