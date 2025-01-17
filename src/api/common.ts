import { Ref } from 'vue'

function insertResult(result: Ref<string>, insertType: Ref<string>): void {
  const paragraph = result.value
    .replace(/\n+/g, '\n')
    .replace(/\r+/g, '\n')
    .split('\n')
  switch (insertType.value) {
    case 'replace':
      console.log('Replace:', paragraph.join('\n'))
      break
    case 'append':
      console.log('Append:', paragraph.join('\n'))
      break
    case 'newLine':
      console.log('New Line:', paragraph.join('\n'))
      break
    case 'NoAction':
      break
  }
}

export default {
  insertResult
}
