/*function FetchTranslation(translationPath) {
return JSON.parse(translationPath); //Temporary
}*/

function Translation(language, languageObject) {
    var language = language;
    var languageObject = languageObject;

    return function(phrase, interpolation, branch) {
        if(languageObject == undefined) //Undefined or null
            throw "Language object not defined.";

        if(languageObject[language] == undefined)
            throw "Language object doesn't have " + language + " Language, did you mispell it?";

        if(languageObject[language][phrase] == undefined)
            throw "Language object doesn't have this phrase ( " + phrase + " ) in this language ( " + language + " )."

        var fetchedPhrase = languageObject[language][phrase];

        if(typeof fetchedPhrase === 'object') {
            //All is not required to exist.
            var all = fetchedPhrase['all'];
            //The request branch is however.
            var phraseBranch = fetchedPhrase[branch];

            if(phraseBranch == undefined)
            throw "Invalid branch ( " + branch + ' ) for phrase ( ' + phrase + ' ) in language ( ' + language + ' )';

            if(all)
                var fetchedPhrase = all + phraseBranch;
            else
                var fetchedPhrase = phraseBranch;
        }

        var regexString = /(?:\#)([\w]+)/g //Matches every alpha-numeric character after a #.

        var interops = fetchedPhrase.match(regexString);

        var resultPhrase = fetchedPhrase;

        console.log(interops)

        if(Array.isArray(interops))
            for(var value of interops) {
                console.log(value);

                if(value == null) //Null can be value.
                    break;

                var interValue = interpolation[value.replace('#', '')];

                if(typeof interValue === 'object' && !Array.isArray(interValue))
                    throw "Objects are not allowed as interpolation values."

                if(typeof interValue === 'object')
                    interValue = interValue.join('\n'); //If this is an array of objects, then the user gets what they deserve.

                //Accumulate all replacements
                resultPhrase = resultPhrase.replace(value, interValue);
            }

        return resultPhrase;
    }
}

//Pass in a language string ("English"), and a translationObject (A JSON file, parsed to an object, containing all translations.)