const sluggify = fullPath => {
  return fullPath.replace(/^.*[\\\/]/, '').replace('\.js', '')
}

export default sluggify
