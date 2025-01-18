import { Ref } from 'vue'

function insertResult(result: Ref<string>, insertType: Ref<string>): void {
  const paragraph = result.value
    .replace(/\n+/g, '\n')
    .replace(/\r+/g, '\n')
    .split('\n')

  const text = paragraph.join('\n')

  Office.context.document.setSelectedDataAsync(
    text,
    {
      coercionType: Office.CoercionType.Text,
      asyncContext: null
    },
    asyncResult => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.error('Failed to insert text:', asyncResult.error.message)
        return
      }

      switch (insertType.value) {
        case 'replace':
          Office.context.document.getSelectedDataAsync(
            Office.CoercionType.Text,
            asyncResult => {
              if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                const newText = asyncResult.value ? text : text
                Office.context.document.setSelectedDataAsync(newText, {
                  coercionType: Office.CoercionType.Text,
                  asyncContext: null
                })
              }
            }
          )
          break
        case 'append':
          Office.context.document.getSelectedDataAsync(
            Office.CoercionType.Text,
            asyncResult => {
              if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                const newText = asyncResult.value
                  ? asyncResult.value + '\n' + text
                  : text
                Office.context.document.setSelectedDataAsync(newText, {
                  coercionType: Office.CoercionType.Text,
                  asyncContext: null
                })
              }
            }
          )
          break
        case 'newLine':
          Office.context.document.getSelectedDataAsync(
            Office.CoercionType.Text,
            asyncResult => {
              if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                const newText = asyncResult.value
                  ? asyncResult.value + '\n\n' + text
                  : text
                Office.context.document.setSelectedDataAsync(newText, {
                  coercionType: Office.CoercionType.Text,
                  asyncContext: null
                })
              }
            }
          )
          break
        case 'NoAction':
          break
      }
    }
  )
}

export default {
  insertResult
}
