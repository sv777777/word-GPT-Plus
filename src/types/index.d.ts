interface IStringKeyMap {
  [propName: string]: any
}

type supportedPlatforms = 'official' | 'azure' | 'gemini' | 'ollama' | 'groq' | 'deepseek'

type insertTypes = 'replace' |  'append' |  'newLine' | 'NoAction'