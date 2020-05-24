/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/


// self-closing tag
const findSelfClosingTag = tag => {
  const tSelfCloseRe = /\<[a-zA-z]\/\>/
  return tSelfCloseRe.exec(tag.replace(" ", ""))
}

// find all tag
const findTag = tag => {
  const tNormRe = /\>*\</
  const fArr = tag.split(tNormRe)
  
  return fArr.filter(e => !/\//.exec(e) && e.length !== 0)
}

exports.isValidXML = xmlString => {
  const len = xmlString.length;
  const numsLeftBracket = xmlString.match(/\</g) && xmlString.match(/\</g).length
  const numsRightBracket =
    xmlString.match(/\>/g) && xmlString.match(/\>/g).length;
  const numsSlash =
    (xmlString.match(/\//g) && xmlString.match(/\//g).length)
  const isSelfClose = findSelfClosingTag(xmlString);
  const isDiffBracket = numsLeftBracket === numsRightBracket;
  const isDiffSlash = numsSlash * 2 === numsLeftBracket;
  const findTagResult = findTag(xmlString);
  const findTagResultAll = findTagResult.filter((e) => !/\//.exec(e));
  const findTagResultAllSet = Array.from(new Set(findTagResultAll));
  let result;

  if (len === 0) {
    console.log("empty string");
    return false;
  }

  if (!isDiffBracket) {
    console.log("braket nums");
    return false;
  }

  if (isSelfClose) {
    console.log("self close");
    return true;
  }

  if (!isDiffSlash) {
    console.log("slash nums");
    return false;
  }

  if (findTagResultAll.length > 2) {
    console.log("too deep");
    return false;
  }

  if (findTagResultAll.length === 2 && findTagResultAllSet.length === 1) {
    console.log("same tag");
    return false;
  }

  for (let i in findTagResultAll) {
    result =
      `/${findTagResult[i]}` === findTagResult[findTagResult.length - i - 1]; // 양쪽에서 뽑아서 비교

  }

  return true;
};
