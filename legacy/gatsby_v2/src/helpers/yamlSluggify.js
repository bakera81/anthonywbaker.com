const yamlSluggify = fullPath => {
  return fullPath.replace(/^.*[\\\/]/, '').replace('\.yml', '')
}

export default yamlSluggify
