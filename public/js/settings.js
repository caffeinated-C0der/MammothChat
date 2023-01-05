// dont store global variables here, use it for global setting tweaks
// be it id/ class names or actual settings for features


// note FAQ control objects
const blacklistKeywords = [
    'to', 'the', 'like', 'do', 'that', 'is', 'can', 'i', 'am', 'a', 'how', 'my', 'me'//, 'need', 
]; // keywords that doesn't contribute to the filter like "to, the, like, do, that", etc

const punctuationArr = [ 
'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
'-', '.', '/', ':', ';', '?', '@', '[', ']', '^', '_', 
'{', '|', '}', '~' ]; // does not include backtilt and backslash as those don't like being in strings
// might need to try using other methods to include those into strings for comparison

export { blacklistKeywords, punctuationArr } // FAQ functionality