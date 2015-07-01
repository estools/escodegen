/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var esprima = require('./3rdparty/esprima-1.0.0-dev'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    data;

data = [{
    options: {
        base: 2,
        indent: '    '
    },
    items: {
        'test': '        test;'
    }
}, {
    options: {
        base: 4,
        indent: '\t'
    },
    items: {
        'test': '\t\t\t\ttest;'
    }
}, {
    options: {
        base: '  ',
        format: {
            indent: {
                base: 4,
                style: '\t'
            }
        }
    },
    items: {
        'test': '  test;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '42e-010;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: false,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '4.2e-9;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '42e-010;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e+400;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: false,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: true,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '42e-4;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: true,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '42e-4;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e400;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '.42;',
        '0.042': '.042;',
        '0.0042': '.0042;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e400;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '0xe8d4a51001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '.42;',
        '0.042': '.042;',
        '0.0042': '.0042;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e+400;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'single',
            escapeless: false
        },
        parse: null
    },
    items: {
        '+\'\'': '+\'\';',
        '+""': '+\'\';',
        '+\'\\\'\'': '+\'\\\'\';',
        '+\'"\'': '+\'"\';',
        '+\'\\\'"\'': '+\'\\\'"\';',
        '+\'/\'': '+\'/\';',
        '+\'\\\\\'': '+\'\\\\\';',
        '+\'\\n\'': '+\'\\n\';',
        '+\'\\r\'': '+\'\\r\';',
        '+\'\\u2028\'': '+\'\\u2028\';',
        '+\'\\u2029\'': '+\'\\u2029\';',
        '+\'\\0\'': '+\'\\0\';',
        '+\'\\x000\'': '+\'\\x000\';',
        '+\'\\b\'': '+\'\\b\';',
        '+\'\\f\'': '+\'\\f\';',
        '+\'\\t\'': '+\'\\t\';',
        '+\'\\x0B\'': '+\'\\x0B\';',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\';',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\';',
        '+\'\\x7F\'': '+\'\\x7F\';',
        '+\'\\x80\'': '+\'\\x80\';',
        '+\'\\u0100\'': '+\'\u0100\';',
        '+\'hello, world\\n\'': '+\'hello, world\\n\';',
        '+"hello, world\\n"': '+\'hello, world\\n\';'
    }
}, {
    options: {
        format: {
            json: true,
            quotes: 'single',
            escapeless: false
        },
        parse: null
    },
    items: {
        '+\'\'': '+"";',
        '+""': '+"";',
        '+\'\\\'\'': '+"\'";',
        '+\'"\'': '+"\\"";',
        '+\'\\\'"\'': '+"\'\\"";',
        '+\'/\'': '+"\\/";',
        '+\'\\\\\'': '+"\\\\";',
        '+\'\\n\'': '+"\\n";',
        '+\'\\r\'': '+"\\r";',
        '+\'\\u2028\'': '+"\\u2028";',
        '+\'\\u2029\'': '+"\\u2029";',
        '+\'\\0\'': '+"\\u0000";',
        '+\'\\x000\'': '+"\\u00000";',
        '+\'\\b\'': '+"\\b";',
        '+\'\\f\'': '+"\\f";',
        '+\'\\t\'': '+"\\t";',
        '+\'\\x0B\'': '+"\\u000B";',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+"\\u0001\\u0002\\u0003\\u0004\\u0005\\u0006\\u0007\\u000E\\u000F\\u0010\\u0011\\u0012\\u0013\\u0014\\u0015\\u0016\\u0017\\u0018\\u0019\\u001A\\u001B\\u001C\\u001D\\u001E\\u001F";',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+" !\\"#$%&\'()*+,-.\\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";',
        '+\'\\x7F\'': '+"\x7F";',
        '+\'\\x80\'': '+"\x80";',
        '+\'\\u0101\'': '+"\u0101";',
        '+\'hello, world\\n\'': '+"hello, world\\n";',
        '+"hello, world\\n"': '+"hello, world\\n";'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'double',
            escapeless: false
        },
        parse: null
    },
    items: {
        '+\'\'': '+"";',
        '+""': '+"";',
        '+\'\\\'\'': '+"\'";',
        '+\'"\'': '+"\\"";',
        '+\'\\\'"\'': '+"\'\\"";',
        '+\'/\'': '+"/";',
        '+\'\\\\\'': '+"\\\\";',
        '+\'\\n\'': '+"\\n";',
        '+\'\\r\'': '+"\\r";',
        '+\'\\u2028\'': '+"\\u2028";',
        '+\'\\u2029\'': '+"\\u2029";',
        '+\'\\0\'': '+"\\0";',
        '+\'\\x000\'': '+"\\x000";',
        '+\'\\b\'': '+"\\b";',
        '+\'\\f\'': '+"\\f";',
        '+\'\\t\'': '+"\\t";',
        '+\'\\x0B\'': '+"\\x0B";',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+"\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F";',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+" !\\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";',
        '+\'\\x7F\'': '+"\\x7F";',
        '+\'\\x80\'': '+"\\x80";',
        '+\'\\u0102\'': '+"\u0102";',
        '+\'hello, world\\n\'': '+"hello, world\\n";',
        '+"hello, world\\n"': '+"hello, world\\n";'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'auto',
            escapeless: false
        },
        parse: null
    },
    items: {
        '+\'\'': '+\'\';',
        '+""': '+\'\';',
        '+\'\\\'\'': '+"\'";',
        '+\'"\'': '+\'"\';',
        '+\'\\\'"\'': '+\'\\\'"\';',
        '+\'/\'': '+\'/\';',
        '+\'\\\\\'': '+\'\\\\\';',
        '+\'\\n\'': '+\'\\n\';',
        '+\'\\r\'': '+\'\\r\';',
        '+\'\\u2028\'': '+\'\\u2028\';',
        '+\'\\u2029\'': '+\'\\u2029\';',
        '+\'\\0\'': '+\'\\0\';',
        '+\'\\x000\'': '+\'\\x000\';',
        '+\'\\b\'': '+\'\\b\';',
        '+\'\\f\'': '+\'\\f\';',
        '+\'\\t\'': '+\'\\t\';',
        '+\'\\x0B\'': '+\'\\x0B\';',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\';',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\';',
        '+\'\\x7F\'': '+\'\\x7F\';',
        '+\'\\x80\'': '+\'\\x80\';',
        '+\'\\u0103\'': '+\'\u0103\';',
        '+\'hello, world\\n\'': '+\'hello, world\\n\';',
        '+"hello, world\\n"': '+\'hello, world\\n\';'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'single',
            escapeless: true
        },
        parse: null
    },
    items: {
        '+\'\'': '+\'\';',
        '+""': '+\'\';',
        '+\'\\\'\'': '+\'\\\'\';',
        '+\'"\'': '+\'"\';',
        '+\'\\\'"\'': '+\'\\\'"\';',
        '+\'/\'': '+\'/\';',
        '+\'\\\\\'': '+\'\\\\\';',
        '+\'\\n\'': '+\'\\n\';',
        '+\'\\r\'': '+\'\\r\';',
        '+\'\\u2028\'': '+\'\\u2028\';',
        '+\'\\u2029\'': '+\'\\u2029\';',
        '+\'\\0\'': '+\'\0\';',
        '+\'\\x000\'': '+\'\x000\';',
        '+\'\\b\'': '+\'\b\';',
        '+\'\\f\'': '+\'\f\';',
        '+\'\\t\'': '+\'\t\';',
        '+\'\\x0B\'': '+\'\x0B\';',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+\'\x01\x02\x03\x04\x05\x06\x07\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\';',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\';',
        '+\'\\x7F\'': '+\'\x7F\';',
        '+\'\\x80\'': '+\'\x80\';',
        '+\'\\u0104\'': '+\'\u0104\';',
        '+\'hello, world\\n\'': '+\'hello, world\\n\';',
        '+"hello, world\\n"': '+\'hello, world\\n\';'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'single',
            escapeless: false
        },
        parse: true
    },
    items: {
        '+\'\'': '+\'\';',
        '+""': '+"";',
        '+\'\\\'\'': '+\'\\\'\';',
        '+\'"\'': '+\'"\';',
        '+\'\\\'"\'': '+\'\\\'"\';',
        '+\'/\'': '+\'/\';',
        '+\'\\\\\'': '+\'\\\\\';',
        '+\'\\n\'': '+\'\\n\';',
        '+\'\\r\'': '+\'\\r\';',
        '+\'\\u2028\'': '+\'\\u2028\';',
        '+\'\\u2029\'': '+\'\\u2029\';',
        '+\'\\0\'': '+\'\\0\';',
        '+\'\\x000\'': '+\'\\x000\';',
        '+\'\\b\'': '+\'\\b\';',
        '+\'\\f\'': '+\'\\f\';',
        '+\'\\t\'': '+\'\\t\';',
        '+\'\\x0B\'': '+\'\\x0B\';',
        '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\'':
            '+\'\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x0E\\x0F\\x10\\x11\\x12\\x13\\x14\\x15\\x16\\x17\\x18\\x19\\x1A\\x1B\\x1C\\x1D\\x1E\\x1F\';',
        '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\'':
            '+\' !"#$%&\\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\';',
        '+\'\\x7F\'': '+\'\\x7F\';',
        '+\'\\x80\'': '+\'\\x80\';',
        '+\'\\u0105\'': '+\'\\u0105\';',
        '+\'hello, world\\n\'': '+\'hello, world\\n\';',
        '+"hello, world\\n"': '+"hello, world\\n";'
    }
}, {
    options: {
        format: {
            json: true,
            quotes: 'single',
            escapeless: true
        },
        parse: true
    },
    items: {
        '+\'\\0\'': '+"\\u0000";'
    }
}, {
    options: {
        format: {
            json: false,
            quotes: 'single',
            escapeless: true
        },
        parse: true
    },
    items: {
        '+""': '+"";',
        '+\'\\0\'': '+\'\\0\';'
    }
}, {
    options: {
        base: 1,
        indent: '  ',
        format: {
            compact: false,
            parentheses: true
        }
    },
    items: {
        '{}': '  {\n  }',
        '{42}': '  {\n    42;\n  }',
        '[]': '  [];',
        '[,42]': '  [\n    ,\n    42\n  ];',
        '!{}': '  !{};',
        '!{42:42,foo:42}': '  !{\n    42: 42,\n    foo: 42\n  };',
        'switch(42){}': '  switch (42) {\n  }',
        'switch(42){default:42}': '  switch (42) {\n  default:\n    42;\n  }',
        '42;42': '  42;\n  42;',

        '!function(foo,bar){}': '  !function (foo, bar) {\n  };',
        '42,42': '  42, 42;',
        'foo=42': '  foo = 42;',
        '42?42:42': '  42 ? 42 : 42;',
        'foo(42,42)': '  foo(42, 42);',
        'new Foo(42,42)': '  new Foo(42, 42);',
        '!{42:42}': '  !{ 42: 42 };',
        'do{}while(42);': '  do {\n  } while (42);',
        'try{}catch(foo){}': '  try {\n  } catch (foo) {\n  }',
        'var foo=42': '  var foo = 42;',
        'var foo,bar': '  var foo, bar;',
        'try{}finally{}': '  try {\n  } finally {\n  }',
        'switch(foo){}': '  switch (foo) {\n  }',
        'if(42){}': '  if (42) {\n  }',
        'if(42){}else if(42){}': '  if (42) {\n  } else if (42) {\n  }',
        'if(42){}else{}': '  if (42) {\n  } else {\n  }',
        'for(;42;42);': '  for (; 42; 42);',
        'for(foo in 42);': '  for (foo in 42);',
        'while(42);': '  while (42);',
        'with({});': '  with ({});',

        'foo in bar,[]in[]': '  foo in bar, [] in [];',
        'new Foo(),new[]()': '  new Foo(), new []();',
        'typeof 42,typeof[]': '  typeof 42, typeof [];',
        'throw 42;throw[]': '  throw 42;\n  throw [];',
        'switch(42){case 42:case[]:}': '  switch (42) {\n  case 42:\n  case []:\n  }',
        'if(42){}else 42;if(42){}else[];': '  if (42) {\n  } else\n    42;\n  if (42) {\n  } else\n    [];',
        'for(foo in 42);for(foo in[]);': '  for (foo in 42);\n  for (foo in []);',
        '!function(){return 42},function(){return[]}': '  !function () {\n    return 42;\n  }, function () {\n    return [];\n  };',

        '!function foo(){}': '  !function foo() {\n  };',
        '!{get 42(){},set 42(bar){}}': '  !{\n    get 42() {\n    },\n    set 42(bar) {\n    }\n  };',
        'foo:while(42)break foo;': '  foo:\n    while (42)\n      break foo;',
        'foo:while(42)continue foo;': '  foo:\n    while (42)\n      continue foo;',
        'var foo': '  var foo;',
        'for(var foo in 42);': '  for (var foo in 42);',
        'function foo(){}': '  function foo() {\n  }',

        '({})': '  ({});',
        '(function(){})': '  (function () {\n  });',
        '/ / / / /': '  / / / / /;',
        '/ / /10': '  / / / 10;'
    }
}, {
    options: {
        base: 1,
        indent: '  ',
        format: {
            compact: true,
            parentheses: true
        }
    },
    items: {
        '{}': '{}',
        '{42}': '{42;}',
        '[]': '[];',
        '[,42]': '[,42];',
        '!{}': '!{};',
        '!{42:42,foo:42}': '!{42:42,foo:42};',
        'switch(42){}': 'switch(42){}',
        'switch(42){default:42}': 'switch(42){default:42;}',
        '42;42': '42;42;',

        '!function(foo,bar){}': '!function(foo,bar){};',
        '42,42': '42,42;',
        'foo=42': 'foo=42;',
        '42?42:42': '42?42:42;',
        'foo(42,42)': 'foo(42,42);',
        'new Foo(42,42)': 'new Foo(42,42);',
        '!{42:42}': '!{42:42};',
        'do{}while(42);': 'do{}while(42);',
        'try{}catch(foo){}': 'try{}catch(foo){}',
        'var foo=42': 'var foo=42;',
        'var foo,bar': 'var foo,bar;',
        'try{}finally{}': 'try{}finally{}',
        'switch(foo){}': 'switch(foo){}',
        'if(42){}': 'if(42){}',
        'if(42){}else if(42){}': 'if(42){}else if(42){}',
        'if(42){}else{}': 'if(42){}else{}',
        'for(;42;42);': 'for(;42;42);',
        'for(foo in 42);': 'for(foo in 42);',
        'while(42);': 'while(42);',
        'with({});': 'with({});',

        'foo in bar,[]in[]': 'foo in bar,[]in[];',
        'new Foo(),new[]()': 'new Foo(),new[]();',
        'typeof 42,typeof[]': 'typeof 42,typeof[];',
        'throw 42;throw[]': 'throw 42;throw[];',
        'switch(42){case 42:case[]:}': 'switch(42){case 42:case[]:}',
        'if(42){}else 42;if(42){}else[];': 'if(42){}else 42;if(42){}else[];',
        'for(foo in 42);for(foo in[]);': 'for(foo in 42);for(foo in[]);',
        '!function(){return 42},function(){return[]}': '!function(){return 42;},function(){return[];};',

        '!function foo(){}': '!function foo(){};',
        '!{get 42(){},set 42(bar){}}': '!{get 42(){},set 42(bar){}};',
        'foo:while(42)break foo;': 'foo:while(42)break foo;',
        'foo:while(42)continue foo;': 'foo:while(42)continue foo;',
        'var foo': 'var foo;',
        'for(var foo in 42);': 'for(var foo in 42);',
        'function foo(){}': 'function foo(){}',

        '({})': '({});',
        '(function(){})': '(function(){});',
        '/ / / / /': '/ // / /;',
        '/ / /1': '/ //1;'
    }
}, {
    options: {
        format: {
            parentheses: true
        }
    },
    items: {
        'new Foo()': 'new Foo();',
        'new Foo(42)': 'new Foo(42);',
        'new Foo() in bar': 'new Foo() in bar;',
        'new Date.constructor()': 'new Date.constructor();',
        'new Date().constructor': 'new Date().constructor;',
        'new Date.setUTCMilliseconds(0)': 'new Date.setUTCMilliseconds(0);',
        'new Date().setUTCMilliseconds(0)': 'new Date().setUTCMilliseconds(0);',
        'new new Foo()()': 'new new Foo()();',
        'new new (Foo()())()()': 'new new (Foo()())()();'
    }
}, {
    options: {
        format: {
            parentheses: false
        }
    },
    items: {
        'new Foo()': 'new Foo;',
        'new Foo(42)': 'new Foo(42);',
        'new Foo() in bar': 'new Foo in bar;',
        'new Date.constructor()': 'new Date.constructor;',
        'new Date().constructor': 'new Date().constructor;',
        'new Date.setUTCMilliseconds(0)': 'new Date.setUTCMilliseconds(0);',
        'new Date().setUTCMilliseconds(0)': 'new Date().setUTCMilliseconds(0);',
        'new new Foo()()': 'new new Foo;',
        'new new (Foo()())()()': 'new new (Foo()());'
    }
}, {
    options: {
        format: {
            indent: {
                base: 1,
                style: '  '
            },
            semicolons: true
        }
    },
    items: {
        '{}': '  {\n  }',
        '{;}': '  {\n    ;\n  }',
        '{42}': '  {\n    42;\n  }',
        'if(42);': '  if (42);',
        'if(42)42': '  if (42)\n    42;',
        'if(42);else;': '  if (42);\n  else ;',
        'if(42)42;else 42': '  if (42)\n    42;\n  else\n    42;',
        'do;while(42)': '  do ;\n  while (42);',
        'do 42;while(42)': '  do\n    42;\n  while (42);',
        'while(42);': '  while (42);',
        'while(42)42': '  while (42)\n    42;',
        'for(;;);': '  for (;;);',
        'for(;;)42': '  for (;;)\n    42;',
        'for(foo in 42);': '  for (foo in 42);',
        'for(foo in 42)42': '  for (foo in 42)\n    42;',
        'with({});': '  with ({});',
        'with({})42': '  with ({})\n    42;',
        'switch(42){default:}': '  switch (42) {\n  default:\n  }',
        'switch(42){default:;}': '  switch (42) {\n  default:\n    ;\n  }',
        'switch(42){default:42}': '  switch (42) {\n  default:\n    42;\n  }',
        'foo:;': '  foo:;',
        'foo:42': '  foo:\n    42;',
        'try{}catch(foo){}finally{}': '  try {\n  } catch (foo) {\n  } finally {\n  }',
        'try{;}catch(foo){;}finally{;}': '  try {\n    ;\n  } catch (foo) {\n    ;\n  } finally {\n    ;\n  }',
        'try{42}catch(foo){42}finally{42}': '  try {\n    42;\n  } catch (foo) {\n    42;\n  } finally {\n    42;\n  }',
        '!function(){}': '  !function () {\n  };',
        '!function(){;}': '  !function () {\n    ;\n  };',
        '!function(){42}': '  !function () {\n    42;\n  };',
        '': '',
        ';': '  ;',
        '42': '  42;',
        '42;foo': '  42;\n  foo;'
    }
}, {
    options: {
        format: {
            indent: {
                base: 1,
                style: '  '
            },
            semicolons: false
        }
    },
    items: {
        '{}': '  {\n  }',
        '{;}': '  {\n    ;\n  }',
        '{42}': '  {\n    42\n  }',
        'if(42);': '  if (42);',
        'if(42)42': '  if (42)\n    42',
        'if(42);else;': '  if (42);\n  else ;',
        'if(42)42;else 42': '  if (42)\n    42;\n  else\n    42',
        'do;while(42)': '  do ;\n  while (42)',
        'do 42;while(42)': '  do\n    42;\n  while (42)',
        'while(42);': '  while (42);',
        'while(42)42': '  while (42)\n    42',
        'for(;;);': '  for (;;);',
        'for(;;)42': '  for (;;)\n    42',
        'for(foo in 42);': '  for (foo in 42);',
        'for(foo in 42)42': '  for (foo in 42)\n    42',
        'with({});': '  with ({});',
        'with({})42': '  with ({})\n    42',
        'switch(42){default:}': '  switch (42) {\n  default:\n  }',
        'switch(42){default:;}': '  switch (42) {\n  default:\n    ;\n  }',
        'switch(42){default:42}': '  switch (42) {\n  default:\n    42\n  }',
        'foo:;': '  foo:;',
        'foo:42': '  foo:\n    42',
        'try{}catch(foo){}finally{}': '  try {\n  } catch (foo) {\n  } finally {\n  }',
        'try{;}catch(foo){;}finally{;}': '  try {\n    ;\n  } catch (foo) {\n    ;\n  } finally {\n    ;\n  }',
        'try{42}catch(foo){42}finally{42}': '  try {\n    42\n  } catch (foo) {\n    42\n  } finally {\n    42\n  }',
        '!function(){}': '  !function () {\n  }',
        '!function(){;}': '  !function () {\n    ;\n  }',
        '!function(){42}': '  !function () {\n    42\n  }',
        '': '',
        ';': '  ;',
        '42': '  42',
        '42;foo': '  42;\n  foo'
    }
}, {
    options: {
        format: {
            compact: true,
            semicolons: false
        }
    },
    items: {
        'switch(42){case 42:42;default:}': 'switch(42){case 42:42;default:}',
        'if(cond)stmt;else stmt;': 'if(cond)stmt;else stmt',
        'if(cond){stmt;}else stmt;': 'if(cond){stmt}else stmt',
        'if(cond){stmt;}else{stmt;}': 'if(cond){stmt}else{stmt}',
        'if(cond){stmt;}else if(cond)for(;;)stmt;': 'if(cond){stmt}else if(cond)for(;;)stmt',
        'if(cond){stmt;}else if(cond);': 'if(cond){stmt}else if(cond);',
        'do ; while(cond);': 'do;while(cond)',
        'while(cond);': 'while(cond);',
        '/a/\nwhile(cond); ': '/a/;while(cond);',
        '/a/ instanceof b': '/a/ instanceof b',
        '/a/ in b': '/a/ in b',
        '[] in b': '[]in b',
        'for(var a = /a/ in []);': 'for(var a=/a/ in[]);',
        'a < !--b': 'a< !--b',
        'a << !--b': 'a<< !--b'
    }
}, {
    options: {
        comment: true,
        format: {
            compact: true,
            semicolons: false,
            safeConcatenation: false
        }
    },
    items: {
        '': '',
        '//A': '//A',
        '{}': '{}',
        '!{}': '!{}',
        '{}//A': '{}//A'
    }
}, {
    options: {
        comment: true,
        format: {
            compact: true,
            semicolons: false,
            safeConcatenation: true
        }
    },
    items: {
        '': '',
        '//A': '\n//A\n',
        '{}': '\n{}',
        '!{}': '\n!{};',
        '{}//A': '\n{}//A\n'
    }
}, {
    options: {
        format: {
            newline: '\r\n',
            semicolons: false
        }
    },
    items: {
        '{}': '{\r\n}',
        '{;}': '{\r\n    ;\r\n}',
        '{42}': '{\r\n    42\r\n}',
        'if(42);': 'if (42);',
        'if(42)42': 'if (42)\r\n    42',
        'if(42);else;': 'if (42);\r\nelse ;',
        'if(42)42;else 42': 'if (42)\r\n    42;\r\nelse\r\n    42',
        'do;while(42)': 'do ;\r\nwhile (42)',
        'do 42;while(42)': 'do\r\n    42;\r\nwhile (42)',
        'while(42);': 'while (42);',
        'while(42)42': 'while (42)\r\n    42',
        'for(;;);': 'for (;;);',
        'for(;;)42': 'for (;;)\r\n    42',
        'for(foo in 42);': 'for (foo in 42);',
        'for(foo in 42)42': 'for (foo in 42)\r\n    42',
        'with({});': 'with ({});',
        'with({})42': 'with ({})\r\n    42',
        'switch(42){default:}': 'switch (42) {\r\ndefault:\r\n}',
        'switch(42){default:;}': 'switch (42) {\r\ndefault:\r\n    ;\r\n}',
        'switch(42){default:42}': 'switch (42) {\r\ndefault:\r\n    42\r\n}',
        'foo:;': 'foo:;',
        'foo:42': 'foo:\r\n    42',
        'try{}catch(foo){}finally{}': 'try {\r\n} catch (foo) {\r\n} finally {\r\n}',
        'try{;}catch(foo){;}finally{;}': 'try {\r\n    ;\r\n} catch (foo) {\r\n    ;\r\n} finally {\r\n    ;\r\n}',
        'try{42}catch(foo){42}finally{42}': 'try {\r\n    42\r\n} catch (foo) {\r\n    42\r\n} finally {\r\n    42\r\n}',
        '!function(){}': '!function () {\r\n}',
        '!function(){;}': '!function () {\r\n    ;\r\n}',
        '!function(){42}': '!function () {\r\n    42\r\n}',
        '42;foo': '42;\r\nfoo'
    }
}, {
    options: {
        format: {
            newline: '\r\n',
            space: ' ',
            semicolons: false
        }
    },
    items: {
        '{}': '{\r\n}',
        '{;}': '{\r\n    ;\r\n}',
        '{42}': '{\r\n    42\r\n}',
        'if(42);': 'if (42);',
        'if(42)42': 'if (42)\r\n    42',
        'if(42);else;': 'if (42);\r\nelse ;',
        'if(42)42;else 42': 'if (42)\r\n    42;\r\nelse\r\n    42',
        'do;while(42)': 'do ;\r\nwhile (42)',
        'do 42;while(42)': 'do\r\n    42;\r\nwhile (42)',
        'while(42);': 'while (42);',
        'while(42)42': 'while (42)\r\n    42',
        'for(;;);': 'for (;;);',
        'for(;;)42': 'for (;;)\r\n    42',
        'for(foo in 42);': 'for (foo in 42);',
        'for(foo in 42)42': 'for (foo in 42)\r\n    42',
        'with({});': 'with ({});',
        'with({})42': 'with ({})\r\n    42',
        'switch(42){default:}': 'switch (42) {\r\ndefault:\r\n}',
        'switch(42){default:;}': 'switch (42) {\r\ndefault:\r\n    ;\r\n}',
        'switch(42){default:42}': 'switch (42) {\r\ndefault:\r\n    42\r\n}',
        'foo:;': 'foo:;',
        'foo:42': 'foo:\r\n    42',
        'try{}catch(foo){}finally{}': 'try {\r\n} catch (foo) {\r\n} finally {\r\n}',
        'try{;}catch(foo){;}finally{;}': 'try {\r\n    ;\r\n} catch (foo) {\r\n    ;\r\n} finally {\r\n    ;\r\n}',
        'try{42}catch(foo){42}finally{42}': 'try {\r\n    42\r\n} catch (foo) {\r\n    42\r\n} finally {\r\n    42\r\n}',
        '!function(){}': '!function () {\r\n}',
        '!function(){;}': '!function () {\r\n    ;\r\n}',
        '!function(){42}': '!function () {\r\n    42\r\n}',
        '42;foo': '42;\r\nfoo'
    }
}, {
    options: {
        format: {
            space: '\t',
            semicolons: false
        }
    },
    items: {
        '{}': '{\n}',
        '{;}': '{\n    ;\n}',
        '{42}': '{\n    42\n}',
        'if(42);': 'if\t(42);',
        'if(42)42': 'if\t(42)\n    42',
        'if(42);else;': 'if\t(42);\nelse\t;',
        'if(42)42;else 42': 'if\t(42)\n    42;\nelse\n    42',
        'do;while(42)': 'do\t;\nwhile\t(42)',
        'do 42;while(42)': 'do\n    42;\nwhile\t(42)',
        'while(42);': 'while\t(42);',
        'while(42)42': 'while\t(42)\n    42',
        'for(;;);': 'for\t(;;);',
        'for(;;)42': 'for\t(;;)\n    42',
        'for(foo in 42);': 'for\t(foo\tin\t42);',
        'for(foo in 42)42': 'for\t(foo\tin\t42)\n    42',
        'with({});': 'with\t({});',
        'with({})42': 'with\t({})\n    42',
        'switch(42){default:}': 'switch\t(42)\t{\ndefault:\n}',
        'switch(42){default:;}': 'switch\t(42)\t{\ndefault:\n    ;\n}',
        'switch(42){default:42}': 'switch\t(42)\t{\ndefault:\n    42\n}',
        'foo:;': 'foo:;',
        'foo:42': 'foo:\n    42',
        'try{}catch(foo){}finally{}': 'try\t{\n}\tcatch\t(foo)\t{\n}\tfinally\t{\n}',
        'try{;}catch(foo){;}finally{;}': 'try\t{\n    ;\n}\tcatch\t(foo)\t{\n    ;\n}\tfinally\t{\n    ;\n}',
        'try{42}catch(foo){42}finally{42}': 'try\t{\n    42\n}\tcatch\t(foo)\t{\n    42\n}\tfinally\t{\n    42\n}',
        '!function(){}': '!function\t()\t{\n}',
        '!function(){;}': '!function\t()\t{\n    ;\n}',
        '!function(){42}': '!function\t()\t{\n    42\n}',
        '42;foo': '42;\nfoo'
    }
}];

function adjustRegexLiteral(key, value) {
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

function runTest(options, source, expectedCode) {
    var tree, actualTree, expectedTree, actualCode, optionsParser = {
        raw: true
    };
    if (options.comment) {
        optionsParser.comment = true;
        optionsParser.range = true;
        optionsParser.loc = true;
        optionsParser.tokens = true;
    }
    tree = esprima.parse(source);
    expectedTree = JSON.stringify(tree, adjustRegexLiteral, 4);
    tree = esprima.parse(source, optionsParser);
    if (options.comment) {
        tree = escodegen.attachComments(tree, tree.comments, tree.tokens);
    }
    actualCode = escodegen.generate(tree, options);
    tree = esprima.parse(actualCode);
    actualTree = JSON.stringify(tree, adjustRegexLiteral, 4);
    expect(actualTree).to.be.equal(expectedTree);
    expect(actualCode).to.be.equal(expectedCode);
}

describe('options test', function () {
    data.forEach(function (category, index) {
        it('data[' + index + ']', function () {
            var options = category.options;
            Object.keys(category.items).forEach(function (source) {
                var expectedCode = category.items[source];
                if (options.parse) {
                    options.parse = esprima.parse;
                }
                runTest(options, source, expectedCode);
            });
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
