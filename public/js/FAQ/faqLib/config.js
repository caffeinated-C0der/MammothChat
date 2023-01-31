// review the concept of this file

const blacklistKeywords = [
    'to', 'the', 'like', 'do', 'that', 'is', 'can', 'i', 'am', 'a', 'how', 'my', 'me',
     'you', 'what', 'need',  'your', 'who', 'are', 'could', 'for', 'out', 'of'
]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

const punctuationArr = [ 
'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
'-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
'{', '|', '}', '~' ]; // does not include backtilt and backslash as those don't like being in strings
// might need to try using other methods to include those into strings for comparison

export { blacklistKeywords, punctuationArr } // FAQ functionality