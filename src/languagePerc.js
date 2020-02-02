function calculateLanguagePercents(languages, uniqueLanguages) {
  let sum = 0;
  const result = uniqueLanguages.map(targetLang => {
    const languageCount = languages.reduce((sum, currentLang) => {
      if (targetLang === currentLang) {
        return sum + 1;
      }
      return sum;
    }, 0);
    if (targetLang === null) {
      targetLang = "Unknown";
    }

    let languageResultArray = [];
    let languageResult;
    languageResult = languageCount / languages.length;
    languageResultArray.push(targetLang);
    languageResultArray.push(languageResult);
    return languageResultArray;
  });
  return result;
}

export default calculateLanguagePercents;
