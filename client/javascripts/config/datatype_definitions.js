var datatype_definitions = {
    'default': 'Unable to find a definition for this data type',
    
    'INTEGER'   : "A normal-size integer. The signed range is " +
                  "-2147483648 to 2147483647. The unsigned range is " +
                  "0 to 4294967295.",
    
    'INT'       : "A normal-size integer. The signed range is " +
                  "-2147483648 to 2147483647. The unsigned range is " +
                  "0 to 4294967295.",
    
    'SMALLINT'  : "A small integer. The signed range is -32768 to " +
                  "32767. The unsigned range is 0 to 65535.",
    
    'TINYINT'   : "A very small integer. The signed range is -128 to 127. " +
                  "The unsigned range is 0 to 255.",
    
    'MEDIUMINT' : "A medium-sized integer. The signed range is -8388608 " +
                  "to 8388607. The unsigned range is 0 to 16777215.",
    
    'BIGINT'    : "A large integer. The signed range is " +
                  "-9223372036854775808 to 9223372036854775807. The " +
                  "unsigned range is 0 to 18446744073709551615.",
    
    'DECIMAL'   : "The DECIMAL data type stores exact numeric data " +
                  "values. These types are used when it is important to " +
                  "preserve exact precision, for example with monetary data.",
    
    'NUMERIC'   : "The NUMERIC data type stores exact numeric data " +
                  "values. These types are used when it is important to " +
                  "preserve exact precision, for example with monetary data.",
    
    'BOOL'      : "BOOL is a synonym for TINYINT(1). A value of zero " +
                  "is considered false. Nonzero values are considered true.",
    
    'BOOLEAN'   : "BOOLEAN is a synonym for TINYINT(1). A value of zero " +
                  "is considered false. Nonzero values are considered true.",
    
    'FLOAT'     : "A small (single-precision) floating-point number. " +
                  "Permissible values are -3.402823466E+38 to " +
                  "-1.175494351E-38, 0, and 1.175494351E-38 to " +
                  "3.402823466E+38. These are the theoretical limits, based " +
                  "on the IEEE standard. The actual range might be slightly " +
                  "smaller depending on your hardware or operating system.",
    
    'DOUBLE'    : "A normal-size (double-precision) floating-point number. " +
                  "Permissible values are -1.7976931348623157E+308 to " +
                  "-2.2250738585072014E-308, 0, and 2.2250738585072014E-308 " +
                  "to 1.7976931348623157E+308. These are the theoretical " +
                  "limits, based on the IEEE standard. The actual range " +
                  "might be slightly smaller depending on your hardware or " +
                  "operating system.",
    
    'BIT'       : "The BIT data type is used to store bit-field values. " +
                  "A type of BIT(M) enables storage of M-bit values. " +
                  "M can range from 1 to 64.",
    
    'CHAR'      : "A fixed-length string that is always right-padded with " +
                  "spaces to the specified length when stored.",
    
    'VARCHAR'   : "Values in VARCHAR columns are variable-length strings. " +
                  "The length can be specified as a value from 0 to 65,535. " +
                  "The effective maximum length of a VARCHAR is subject to " +
                  "the maximum row size (65,535 bytes, which is shared " +
                  "among all columns) and the character set used.",
    
    'TINYTEXT'  : "The four TEXT types are TINYTEXT, TEXT, MEDIUMTEXT, and " +
                  "LONGTEXT. These correspond to the four BLOB types and " +
                  "have the same maximum lengths and storage requirements.",
    
    'TEXT'      : "The four TEXT types are TINYTEXT, TEXT, MEDIUMTEXT, and " +
                  "LONGTEXT. These correspond to the four BLOB types and " +
                  "have the same maximum lengths and storage requirements.",
    
    'MEDIUMTEXT': "The four TEXT types are TINYTEXT, TEXT, MEDIUMTEXT, and " +
                  "LONGTEXT. These correspond to the four BLOB types and " +
                  "have the same maximum lengths and storage requirements.",
    
    'LONGTEXT'  : "The four TEXT types are TINYTEXT, TEXT, MEDIUMTEXT, and " +
                  "LONGTEXT. These correspond to the four BLOB types and " +
                  "have the same maximum lengths and storage requirements.",
    
    
    'TINYBLOB'  : "A BLOB is a binary large object that can hold a " +
                  "variable amount of data. The four BLOB types are " +
                  "TINYBLOB, BLOB, MEDIUMBLOB, and LONGBLOB. These differ " +
                  "only in the maximum length of the values they can hold. ",
    
    'BLOB'      : "A BLOB is a binary large object that can hold a " +
                  "variable amount of data. The four BLOB types are " +
                  "TINYBLOB, BLOB, MEDIUMBLOB, and LONGBLOB. These differ " +
                  "only in the maximum length of the values they can hold. ",
    
    'MEDIUMBLOB': "A BLOB is a binary large object that can hold a " +
                  "variable amount of data. The four BLOB types are " +
                  "TINYBLOB, BLOB, MEDIUMBLOB, and LONGBLOB. These differ " +
                  "only in the maximum length of the values they can hold. ",
    
    'LONGBLOB'  : "A BLOB is a binary large object that can hold a " +
                  "variable amount of data. The four BLOB types are " +
                  "TINYBLOB, BLOB, MEDIUMBLOB, and LONGBLOB. These differ " +
                  "only in the maximum length of the values they can hold. ",
    
    'BINARY'    : "The BINARY and VARBINARY types are similar to " +
                  "CHAR and VARCHAR, except that they contain binary strings " +
                  "rather than nonbinary strings. That is, they contain byte " +
                  "strings rather than character strings. This means that " +
                  "they have no character set, and sorting and comparison " +
                  "are based on the numeric values of the bytes in " +
                  "the values. " +
                  "<br/><br/>" +
                  "The permissible maximum length is the same for BINARY " +
                  "and VARBINARY as it is for CHAR and VARCHAR, except that " +
                  "the length for BINARY and VARBINARY is a length in bytes " +
                  "rather than in characters.",
    
    'VARBINARY' : "The BINARY and VARBINARY types are similar to " +
                  "CHAR and VARCHAR, except that they contain binary strings " +
                  "rather than nonbinary strings. That is, they contain byte " +
                  "strings rather than character strings. This means that " +
                  "they have no character set, and sorting and comparison " +
                  "are based on the numeric values of the bytes in " +
                  "the values. " +
                  "<br/><br/>" +
                  "The permissible maximum length is the same for BINARY " +
                  "and VARBINARY as it is for CHAR and VARCHAR, except that " +
                  "the length for BINARY and VARBINARY is a length in bytes " +
                  "rather than in characters.",
    
    'ENUM'      : "An ENUM is a string object with a value chosen from a " +
                  "list of permitted values that are enumerated explicitly " +
                  "in the column specification at table creation time.",
    
    'SET'       : "A SET is a string object that can have zero or more " +
                  "values, each of which must be chosen from a list of " +
                  "permitted values specified when the table is created. " +
                  "SET column values that consist of multiple set members " +
                  "are specified with members separated by commas. " +
                  "A consequence of this is that SET member values should " +
                  "not themselves contain commas.",
    
    'DATE'      : "The DATE type is used for values with a date part but " +
                  "no time part. MySQL retrieves and displays DATE values in " +
                  "'YYYY-MM-DD' format. The supported range is '1000-01-01' " +
                  "to '9999-12-31'.",
    
    'DATETIME'  : "The DATETIME type is used for values that contain both " +
                  "date and time parts. MySQL retrieves and displays " +
                  "DATETIME values in 'YYYY-MM-DD HH:MM:SS' format. " +
                  "The supported range is '1000-01-01 00:00:00' to " +
                  "'9999-12-31 23:59:59'.",
    
    'TIMESTAMP' : "The TIMESTAMP data type is used for values that " +
                  "contain both date and time parts. TIMESTAMP has a " +
                  "range of '1970-01-01 00:00:01' UTC to '2038-01-19 " +
                  "03:14:07' UTC.",
    
    'TIME'      : "MySQL retrieves and displays TIME values in 'HH:MM:SS' " +
                  "format (or 'HHH:MM:SS' format for large hours values). " +
                  "TIME values may range from '-838:59:59' to '838:59:59'. " +
                  "The hours part may be so large because the TIME type can " +
                  "be used not only to represent a time of day (which must " +
                  "be less than 24 hours), but also elapsed time or a " +
                  "time interval between two events (which may be much " +
                  "greater than 24 hours, or even negative).",
    
    'YEAR'      : "The YEAR type is a 1-byte type used to represent year " +
                  "values. It can be declared as YEAR(4) or YEAR(2) to " +
                  "specify a display width of four or two characters. " +
                  "The default is four characters if no width is given."
};
